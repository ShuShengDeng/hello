import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const dbPath = Deno.env.get("DATABASE_PATH") || "file:./data.db";

const client = createClient({
  url: dbPath,
});

export const db = drizzle({ client });

export { client };
