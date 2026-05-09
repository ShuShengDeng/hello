import { define } from "@/utils.ts";
import { getPostById, deletePost } from "@/db/services.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const id = parseInt(ctx.params.id);
    
    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const post = await getPostById(id);
    
    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json({ data: post });
  },

  async DELETE(ctx) {
    const id = parseInt(ctx.params.id);
    
    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const deleted = await deletePost(id);
    
    if (!deleted) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json({ data: { deleted: true } });
  },
});
