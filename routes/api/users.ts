import { define } from "@/utils.ts";
import { getUsersPaginated, createUser, getUserByEmail } from "@/db/services.ts";
import { createUserSchema, paginationSchema } from "@/db/validators.ts";
import { ZodError } from "zod";

function formatZodError(error: ZodError): string {
  return error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

export const handler = define.handlers({
  async GET(ctx) {
    const url = new URL(ctx.req.url);
    const parsed = paginationSchema.safeParse({
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
    });
    
    if (!parsed.success) {
      return Response.json(
        { error: formatZodError(parsed.error) },
        { status: 400 }
      );
    }
    
    const result = await getUsersPaginated(parsed.data.page, parsed.data.limit);
    return Response.json(result);
  },

  async POST(ctx) {
    let body: unknown;
    try {
      body = await ctx.req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: formatZodError(parsed.error) },
        { status: 400 }
      );
    }

    try {
      const existingUser = await getUserByEmail(parsed.data.email);
      if (existingUser) {
        return Response.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }

      const user = await createUser(parsed.data);
      return Response.json({ data: user }, { status: 201 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return Response.json({ error: message }, { status: 500 });
    }
  },
});
