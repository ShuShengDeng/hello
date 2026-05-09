import { db } from "./index.ts";
import { users, posts, type User, type NewUser, type Post, type NewPost } from "./schema.ts";
import { eq, desc } from "drizzle-orm";

export type { User, NewUser, Post, NewPost };

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function createUser(data: NewUser): Promise<User> {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function getUserById(id: number): Promise<User | undefined> {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
}

export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(users);
}

export async function getUsersPaginated(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResult<User>> {
  const offset = (page - 1) * limit;
  
  const [allUsers, countResult] = await Promise.all([
    db.select().from(users).limit(limit).offset(offset),
    db.select({ count: users.id }).from(users),
  ]);
  
  const total = countResult.length;
  
  return {
    data: allUsers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function updateUser(id: number, data: Partial<NewUser>): Promise<User | undefined> {
  const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return result[0];
}

export async function deleteUser(id: number): Promise<boolean> {
  const result = await db.delete(users).where(eq(users.id, id)).returning();
  return result.length > 0;
}

export async function createPost(data: NewPost): Promise<Post> {
  const result = await db.insert(posts).values(data).returning();
  return result[0];
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const result = await db.select().from(posts).where(eq(posts.id, id));
  return result[0];
}

export async function getPostsByUserId(userId: number): Promise<Post[]> {
  return await db.select().from(posts).where(eq(posts.userId, userId));
}

export async function getAllPosts(): Promise<Post[]> {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPostsPaginated(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResult<Post>> {
  const offset = (page - 1) * limit;
  
  const [allPosts, countResult] = await Promise.all([
    db.select().from(posts).orderBy(desc(posts.createdAt)).limit(limit).offset(offset),
    db.select({ count: posts.id }).from(posts),
  ]);
  
  const total = countResult.length;
  
  return {
    data: allPosts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function deletePost(id: number): Promise<boolean> {
  const result = await db.delete(posts).where(eq(posts.id, id)).returning();
  return result.length > 0;
}
