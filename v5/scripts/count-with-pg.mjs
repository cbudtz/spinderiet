import 'dotenv/config';
import pg from 'pg';

const url = process.env.DATABASE_URL?.trim();
if (!url) process.exit(1);

const client = new pg.Client({ connectionString: url });
await client.connect();
const r = await client.query(`
	SELECT COUNT(*)::int AS c
	FROM information_schema.tables
	WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
`);
console.log('pg driver public base tables:', r.rows[0].c);
await client.end();
