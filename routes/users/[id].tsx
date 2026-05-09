import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";
import { getUserById, getPostsByUserId } from "@/db/services.ts";

export const handler = define.handlers(async (ctx) => {
  const id = parseInt(ctx.params.id);
  
  if (isNaN(id)) {
    return ctx.redirect("/users");
  }

  const user = await getUserById(id);
  
  if (!user) {
    return ctx.redirect("/users");
  }

  const posts = await getPostsByUserId(id);
  return { data: { user, posts } };
});

export default define.page<typeof handler>(({ data }) => {
  const { user, posts } = data;

  return (
    <div class="min-h-screen bg-primary-50 relative noise-bg">
      <Head>
        <title>{user.name} - 用户详情</title>
      </Head>
      
      <div class="absolute inset-0 bg-linear-to-b from-primary-50 via-white to-primary-50" />
      
      <div class="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <nav class="flex items-center justify-between mb-8 opacity-0 animate-fade-in">
          <a href="/users" class="flex items-center gap-2 text-stone-500 hover:text-primary-600 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-sm font-medium">返回用户列表</span>
          </a>
          <div class="flex items-center gap-6">
            <a href="/users" class="text-sm font-medium text-primary-600">用户</a>
            <a href="/posts" class="text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors">文章</a>
          </div>
        </nav>

        <div class="glass-card rounded-3xl p-8 mb-8 opacity-0 animate-fade-in-up delay-100">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div class="w-24 h-24 rounded-2xl bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-3xl shrink-0 shadow-lg shadow-primary-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div class="flex-1 text-center md:text-left">
              <h1 class="font-display text-3xl md:text-4xl font-bold text-surface-950 mb-2">{user.name}</h1>
              <p class="text-stone-500 mb-4">{user.email}</p>
              
              <div class="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div class="flex items-center gap-2 text-stone-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span>ID: {user.id}</span>
                </div>
                <div class="flex items-center gap-2 text-stone-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{user.createdAt?.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="opacity-0 animate-fade-in-up delay-200">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-2xl font-bold text-surface-950">
              用户文章
            </h2>
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 border border-primary-200">
              {posts.length} 篇
            </span>
          </div>

          {posts.length > 0 ? (
            <div class="space-y-4">
              {posts.map((post, index) => (
                <a
                  href={`/posts/${post.id}`}
                  class="group block glass-card rounded-2xl p-6 hover-lift"
                  style={`animation-delay: ${(index + 3) * 0.1}s`}
                >
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg text-surface-950 group-hover:text-primary-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p class="text-stone-400 text-sm line-clamp-2">{post.content}</p>
                    </div>
                    <svg class="w-5 h-5 text-stone-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  <div class="mt-4 pt-4 border-t border-primary-100 flex items-center gap-4 text-xs text-stone-400">
                    <span>{post.createdAt?.toLocaleDateString("zh-CN")}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div class="text-center py-16 glass-card rounded-2xl">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                <svg class="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-stone-500 mb-1">暂无文章</h3>
              <p class="text-stone-400 text-sm">该用户还没有发布任何文章</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
