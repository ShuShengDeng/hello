import { client } from "./index.ts";

interface UserRow {
  id: number;
  name: string;
  email: string;
  created_at: number | null;
}

interface PostRow {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: number | null;
}

async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    const result = await client.execute(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
    );
    return result.rows.length > 0;
  } catch {
    return false;
  }
}

async function getUserCount(): Promise<number> {
  try {
    const result = await client.execute("SELECT COUNT(*) as count FROM users");
    const row = result.rows[0] as unknown as { count: number };
    return row?.count ?? 0;
  } catch {
    return 0;
  }
}

async function createTables() {
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

  console.log("✅ Database tables created");
}

async function seedData() {
  const userCount = await getUserCount();
  
  if (userCount > 0) {
    console.log(`📊 Database already has ${userCount} user(s), skipping seed`);
    return;
  }

  console.log("🌱 Seeding initial data...");

  const now = Date.now();

  await client.execute(
    "INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)",
    ["张三", "zhangsan@example.com", now]
  );
  await client.execute(
    "INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)",
    ["李四", "lisi@example.com", now]
  );
  await client.execute(
    "INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)",
    ["王五", "wangwu@example.com", now]
  );

  await client.execute(
    "INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, ?)",
    ["欢迎来到 DenoSkill", "这是一个使用 Deno + Fresh + SQLite 构建的高品质全栈应用。让我们一起探索现代 Web 开发的魅力！", 1, now]
  );

  await client.execute(
    "INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, ?)",
    ["Deno vs Node.js", "Deno 是 Node.js 的创造者 Ryan Dahl 的新项目。它使用了 V8 引擎并内置了 TypeScript 支持，提供了更安全、更现代的开发体验。", 2, now]
  );

  await client.execute(
    "INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, ?)",
    ["Fresh 框架介绍", "Fresh 是 Deno 官方推荐的 Web 框架，采用岛屿架构 (Islands Architecture)，只在前端发送必要的 JavaScript，实现零 JS 开销的静态页面。", 3, now]
  );

  console.log("✅ Seed data inserted successfully!");
}

async function initializeDatabase() {
  const usersTableExists = await checkTableExists("users");
  
  if (!usersTableExists) {
    await createTables();
    await seedData();
  } else {
    console.log("📊 Database tables already exist");
    await seedData();
  }
}

if (import.meta.main) {
  await initializeDatabase();
}

export { initializeDatabase };
