import { drizzle } from 'drizzle-orm/node-postgres';
import { dbUrl } from '../env';

export const db = drizzle(
  dbUrl
);
