import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL?.trim()) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL.trim());

export const db = drizzle(client, { schema });
