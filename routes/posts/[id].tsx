import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";
import { getPostById, getUserById } from "@/db/services.ts";

export const handler = define.handlers(async (ctx) => {
  const id = parseInt(ctx.params.id);
  
  if (isNaN(id)) {
    return ctx.redirect("/posts");
  }

  const post = await getPostById(id);
  
  if (!post) {
    return ctx.redirect("/posts");
  }

  const author = await getUserById(post.userId);
  return { data: { post, author } };
});

export default define.page<typeof handler>(({ data }) => {
  const { post, author } = data;

  return (
    <div class="min-h-screen bg-primary-50 relative noise-bg">
      <Head>
        <title>{post.title} - 文章详情</title>
      </Head>
      
      <div class="absolute inset-0 bg-linear-to-b from-primary-50 via-white to-primary-50" />
      
      <div class="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <nav class="flex items-center justify-between mb-8 opacity-0 animate-fade-in">
          <a href="/posts" class="flex items-center gap-2 text-stone-500 hover:text-primary-600 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-sm font-medium">返回文章列表</span>
          </a>
          <div class="flex items-center gap-6">
            <a href="/users" class="text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors">用户</a>
            <a href="/posts" class="text-sm font-medium text-primary-600">文章</a>
          </div>
        </nav>

        <article class="opacity-0 animate-fade-in-up delay-100">
          <header class="mb-10">
            <div class="flex items-center gap-3 mb-6">
              <span class="px-3 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700 border border-primary-200">
                文章
              </span>
              <span class="text-sm text-stone-400">
                {post.createdAt?.toLocaleDateString("zh-CN", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>
            
            <h1 class="font-display text-3xl md:text-5xl font-bold text-surface-950 leading-tight mb-6">
              {post.title}
            </h1>
            
            {author && (
              <a 
                href={`/users/${author.id}`}
                class="inline-flex items-center gap-3 glass-card rounded-xl px-4 py-3 hover:shadow-md transition-all"
              >
                <div class="w-10 h-10 rounded-lg bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary-500/20">
                  {author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p class="font-medium text-surface-950">{author.name}</p>
                  <p class="text-xs text-stone-400">{author.email}</p>
                </div>
              </a>
            )}
          </header>

          <div class="glass-card rounded-3xl p-8 md:p-12">
            <div class="prose prose-lg max-w-none">
              <p class="text-stone-600 leading-relaxed whitespace-pre-wrap text-lg">
                {post.content}
              </p>
            </div>
          </div>

          <footer class="mt-10 pt-8 border-t border-primary-100">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-4 text-sm text-stone-400">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span>ID: {post.id}</span>
                </div>
              </div>
              
              <a 
                href="/posts" 
                class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-500 transition-colors font-medium"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回文章列表
              </a>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
});
