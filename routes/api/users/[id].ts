import { define } from "@/utils.ts";
import { getUserById, updateUser, deleteUser } from "@/db/services.ts";
import { updateUserSchema } from "@/db/validators.ts";
import { ZodError } from "zod";

function formatZodError(error: ZodError): string {
  return error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

export const handler = define.handlers({
  async GET(ctx) {
    const id = parseInt(ctx.params.id);
    
    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await getUserById(id);
    
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ data: user });
  },

  async PUT(ctx) {
    const id = parseInt(ctx.params.id);
    
    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid user ID" }, { status: 400 });
    }

    let body: unknown;
    try {
      body = await ctx.req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: formatZodError(parsed.error) },
        { status: 400 }
      );
    }

    if (Object.keys(parsed.data).length === 0) {
      return Response.json(
        { error: "No fields provided for update" },
        { status: 400 }
      );
    }

    try {
      const user = await updateUser(id, parsed.data);
      
      if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
      }

      return Response.json({ data: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      if (message.includes("UNIQUE constraint")) {
        return Response.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
      return Response.json({ error: message }, { status: 500 });
    }
  },

  async DELETE(ctx) {
    const id = parseInt(ctx.params.id);
    
    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const deleted = await deleteUser(id);
    
    if (!deleted) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ data: { deleted: true } });
  },
});
