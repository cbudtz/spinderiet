import 'dotenv/config';
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
	console.error('DATABASE_URL missing');
	process.exit(1);
}

const sql = postgres(url, { max: 1 });
const rows = await sql`
	SELECT table_schema AS s, COUNT(*)::int AS c
	FROM information_schema.tables
	WHERE table_type = 'BASE TABLE'
		AND table_schema NOT IN ('pg_catalog', 'information_schema')
	GROUP BY table_schema
	ORDER BY table_schema
`;
console.log('Base tables per schema:', rows.length ? rows : '(none)');
await sql.end();
