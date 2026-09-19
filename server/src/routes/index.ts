import { Router, Request } from 'express';
import multer from 'multer';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from '../server.js';
import { z } from 'zod';

export const router = Router();
const userId = (req: Request) => req.header('x-user-id') || 'demo-user';
const uploads = process.env.UPLOAD_DIR ?? './uploads';
mkdirSync(join(process.cwd(), uploads), { recursive: true });
const upload = multer({
  dest: join(process.cwd(), uploads),
  limits: { fileSize: Number(process.env.MAX_UPLOAD_MB ?? 50) * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, ['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype)),
});
const profileSchema = z.object({
  name: z.string().min(1), age: z.number().int().min(0).max(130), gender: z.enum(['male', 'female', 'other']),
  dob: z.string(), bloodGroup: z.string(), location: z.string(), aboutNote: z.string(),
  chronicConditions: z.array(z.string()), allergies: z.array(z.string()), ongoingMedications: z.array(z.unknown()), emergencyContact: z.record(z.unknown()),
});
const vitalSchema = z.object({ timestamp: z.coerce.date().optional(), systolicBp: z.number().int().min(40).max(300).optional(), diastolicBp: z.number().int().min(20).max(200).optional(), glucose: z.number().min(0).optional(), glucoseContext: z.enum(['fasting','post-prandial','random']).optional(), weightKg: z.number().min(0).optional(), heartRate: z.number().int().min(20).max(250).optional(), spO2: z.number().min(0).max(100).optional(), temperatureC: z.number().optional(), source: z.enum(['manual','photo-device-ocr','ble-sync']).default('manual'), notes: z.string().max(2000).optional() });
const journalSchema = z.object({ timestamp: z.coerce.date().optional(), symptomSeverity: z.number().int().min(0).max(10), primarySymptom: z.string().min(1).max(200), relatedOrganId: z.string().optional(), contextTags: z.array(z.string()).default([]), medicationAdherence: z.enum(['all-taken','partially-taken','skipped']), patientNote: z.string().max(5000).default('') });

router.get('/health', (_req, res) => res.json({ status: 'ok', service: 'healthai-api' }));
router.get('/profile', async (req, res, next) => { try { res.json(await prisma.patientProfile.findUnique({ where: { userId: userId(req) } })); } catch (e) { next(e); } });
router.put('/profile', async (req, res, next) => { try { const data = profileSchema.parse(req.body); const uid = userId(req); await prisma.user.upsert({ where: { id: uid }, update: {}, create: { id: uid } }); res.json(await prisma.patientProfile.upsert({ where: { userId: uid }, update: data, create: { userId: uid, ...data } })); } catch (e) { next(e); } });
router.get('/vitals', async (req, res, next) => { try { res.json(await prisma.vitalEntry.findMany({ where: { userId: userId(req) }, orderBy: { timestamp: 'desc' }, take: 500 })); } catch (e) { next(e); } });
router.post('/vitals', async (req, res, next) => { try { const data = vitalSchema.parse(req.body); const uid = userId(req); await prisma.user.upsert({ where: { id: uid }, update: {}, create: { id: uid } }); res.status(201).json(await prisma.vitalEntry.create({ data: { ...data, userId: uid, timestamp: data.timestamp ?? new Date() } })); } catch (e) { next(e); } });
router.get('/journal', async (req, res, next) => { try { res.json(await prisma.journalEntry.findMany({ where: { userId: userId(req) }, orderBy: { timestamp: 'desc' }, take: 500 })); } catch (e) { next(e); } });
router.post('/journal', async (req, res, next) => { try { const data = journalSchema.parse(req.body); const uid = userId(req); await prisma.user.upsert({ where: { id: uid }, update: {}, create: { id: uid } }); res.status(201).json(await prisma.journalEntry.create({ data: { ...data, userId: uid, timestamp: data.timestamp ?? new Date() } })); } catch (e) { next(e); } });
router.get('/alerts', async (req, res, next) => { try { res.json(await prisma.notificationAlert.findMany({ where: { userId: userId(req) }, orderBy: { timestamp: 'desc' } })); } catch (e) { next(e); } });
router.patch('/alerts/:id/read', async (req, res, next) => { try { res.json(await prisma.notificationAlert.updateMany({ where: { id: req.params.id, userId: userId(req) }, data: { read: true } })); } catch (e) { next(e); } });
router.get('/reports', async (req, res, next) => { try { res.json(await prisma.medicalReport.findMany({ where: { userId: userId(req) }, orderBy: { createdAt: 'desc' } })); } catch (e) { next(e); } });
router.post('/reports', upload.single('file'), async (req, res, next) => { try { if (!req.file) return res.status(400).json({ error: 'A PDF, JPG, or PNG file is required' }); const uid = userId(req); await prisma.user.upsert({ where: { id: uid }, update: {}, create: { id: uid } }); const report = await prisma.medicalReport.create({ data: { userId: uid, title: req.body.title || req.file.originalname, category: req.body.category || 'Other Report', uploadDate: new Date().toISOString().slice(0,10), documentDate: req.body.documentDate || new Date().toISOString().slice(0,10), facility: req.body.facility || 'Unknown', doctorName: req.body.doctorName, fileType: req.file.mimetype === 'application/pdf' ? 'pdf' : 'photo', fileName: req.file.originalname, filePath: req.file.path } }); res.status(201).json(report); } catch (e) { next(e); } });
router.get('/timeline', async (req, res, next) => { try { const uid = userId(req); const [reports, vitals, journal] = await Promise.all([prisma.medicalReport.findMany({ where: { userId: uid } }), prisma.vitalEntry.findMany({ where: { userId: uid } }), prisma.journalEntry.findMany({ where: { userId: uid } })]); const events = [...reports.map(r => ({ id: `tl-rep-${r.id}`, timestamp: `${r.documentDate}T10:00:00Z`, source: 'report', title: r.title, badge: r.category, details: r })), ...vitals.map(v => ({ id: `tl-vit-${v.id}`, timestamp: v.timestamp, source: 'vital', title: 'Home Vitals Logged', badge: 'Home Vitals', details: v })), ...journal.map(j => ({ id: `tl-jnl-${j.id}`, timestamp: j.timestamp, source: 'journal', title: j.primarySymptom, badge: 'Symptom Journal', details: j }))].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); res.json(events); } catch (e) { next(e); } });
router.get('/specialists', (_req, res) => res.json([]));
