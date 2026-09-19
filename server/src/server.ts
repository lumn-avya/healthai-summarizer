import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { router } from './routes/index.js';

export const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT ?? 4000);
const uploadDir = process.env.UPLOAD_DIR ?? './uploads';
mkdirSync(join(process.cwd(), uploadDir), { recursive: true });

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.use('/api', router);
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(port, () => console.log(`HealthAI API listening on :${port}`));
const shutdown = async () => { server.close(); await prisma.$disconnect(); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
