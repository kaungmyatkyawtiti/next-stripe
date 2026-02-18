import { defineConfig } from 'drizzle-kit';
import { dbUrl } from './lib/env';

export default defineConfig({
  out: './drizzle',
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
