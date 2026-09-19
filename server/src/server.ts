import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from './lib/prisma.js';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const uploadDir = process.env.UPLOAD_DIR ?? './uploads';
mkdirSync(join(process.cwd(), uploadDir), { recursive: true });

app.disable('x-powered-by');
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.get('/api/health', async (_req, res) => {
  try { await prisma.$queryRaw`SELECT 1`; res.json({ status: 'ok', database: 'ok', service: 'healthai-api' }); }
  catch { res.status(503).json({ status: 'degraded', database: 'unavailable', service: 'healthai-api' }); }
});
app.use('/api', router);
app.use(errorHandler);

const server = app.listen(port, () => console.log(`HealthAI API listening on :${port}`));
const shutdown = async () => { server.close(); await prisma.$disconnect(); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
