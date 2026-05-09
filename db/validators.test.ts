import { assertEquals } from "@std/assert";
import { createUserSchema, updateUserSchema, createPostSchema, paginationSchema } from "./validators.ts";

Deno.test("createUserSchema - valid input", () => {
  const result = createUserSchema.safeParse({
    name: "John Doe",
    email: "john@example.com",
  });
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.name, "John Doe");
    assertEquals(result.data.email, "john@example.com");
  }
});

Deno.test("createUserSchema - invalid email", () => {
  const result = createUserSchema.safeParse({
    name: "John Doe",
    email: "invalid-email",
  });
  assertEquals(result.success, false);
});

Deno.test("createUserSchema - empty name", () => {
  const result = createUserSchema.safeParse({
    name: "",
    email: "john@example.com",
  });
  assertEquals(result.success, false);
});

Deno.test("createUserSchema - name too long", () => {
  const result = createUserSchema.safeParse({
    name: "a".repeat(101),
    email: "john@example.com",
  });
  assertEquals(result.success, false);
});

Deno.test("updateUserSchema - valid partial update", () => {
  const result = updateUserSchema.safeParse({
    name: "Jane Doe",
  });
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.name, "Jane Doe");
    assertEquals(result.data.email, undefined);
  }
});

Deno.test("updateUserSchema - empty object is valid", () => {
  const result = updateUserSchema.safeParse({});
  assertEquals(result.success, true);
});

Deno.test("createPostSchema - valid input", () => {
  const result = createPostSchema.safeParse({
    title: "Test Post",
    content: "This is test content",
    userId: 1,
  });
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.title, "Test Post");
    assertEquals(result.data.userId, 1);
  }
});

Deno.test("createPostSchema - missing userId", () => {
  const result = createPostSchema.safeParse({
    title: "Test Post",
    content: "This is test content",
  });
  assertEquals(result.success, false);
});

Deno.test("createPostSchema - negative userId", () => {
  const result = createPostSchema.safeParse({
    title: "Test Post",
    content: "This is test content",
    userId: -1,
  });
  assertEquals(result.success, false);
});

Deno.test("createPostSchema - title too long", () => {
  const result = createPostSchema.safeParse({
    title: "a".repeat(201),
    content: "This is test content",
    userId: 1,
  });
  assertEquals(result.success, false);
});

Deno.test("paginationSchema - default values", () => {
  const result = paginationSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.page, 1);
    assertEquals(result.data.limit, 10);
  }
});

Deno.test("paginationSchema - custom values", () => {
  const result = paginationSchema.safeParse({
    page: 2,
    limit: 20,
  });
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.page, 2);
    assertEquals(result.data.limit, 20);
  }
});

Deno.test("paginationSchema - limit exceeds max", () => {
  const result = paginationSchema.safeParse({
    page: 1,
    limit: 200,
  });
  assertEquals(result.success, false);
});

Deno.test("paginationSchema - string to number coercion", () => {
  const result = paginationSchema.safeParse({
    page: "3",
    limit: "25",
  });
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.page, 3);
    assertEquals(result.data.limit, 25);
  }
});
