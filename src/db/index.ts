import { drizzle } from 'drizzle-orm/libsql/web';

export const db = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL || "libsql://GARBAGE.aws-us-east-1.turso.io",
    authToken: process.env.TURSO_TOKEN || "GARBAGE",
  },
});
