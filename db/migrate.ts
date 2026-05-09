import { client } from "./index.ts";

async function migrate() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at INTEGER
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      created_at INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log("✅ Database migrated successfully!");
}

if (import.meta.main) {
  await migrate();
}

export { migrate };
