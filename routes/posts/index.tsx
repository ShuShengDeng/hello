import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";
import { getAllPosts } from "@/db/services.ts";

export const handler = define.handlers(async () => {
  const posts = await getAllPosts();
  return { data: { posts } };
});

export default define.page<typeof handler>(({ data }) => {
  const { posts } = data;

  return (
    <div class="min-h-screen bg-primary-50 relative noise-bg">
      <Head>
        <title>文章列表 - DenoSkill</title>
      </Head>
      
      <div class="absolute inset-0 bg-linear-to-b from-primary-50 via-white to-primary-50" />
      
      <div class="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <header class="mb-12">
          <nav class="flex items-center justify-between mb-8 opacity-0 animate-fade-in">
            <a href="/" class="flex items-center gap-2 text-stone-500 hover:text-primary-600 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span class="text-sm font-medium">返回首页</span>
            </a>
            <div class="flex items-center gap-6">
              <a href="/users" class="text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors">用户</a>
              <a href="/posts" class="text-sm font-medium text-primary-600">文章</a>
            </div>
          </nav>
          
          <div class="opacity-0 animate-fade-in-up delay-100">
            <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
              <span class="gradient-text">文章列表</span>
            </h1>
            <p class="text-stone-500 text-lg">探索精彩内容，发现优质文章</p>
          </div>
        </header>

        {posts.length > 0 ? (
          <div class="grid gap-6">
            {posts.map((post, index) => (
              <a
                href={`/posts/${post.id}`}
                class="group glass-card rounded-2xl overflow-hidden hover-lift opacity-0 animate-fade-in-up"
                style={`animation-delay: ${(index + 2) * 0.1}s`}
              >
                <div class="p-6 md:p-8">
                  <div class="flex flex-col md:flex-row md:items-start gap-6">
                    <div class="hidden md:flex w-24 h-24 rounded-xl bg-linear-to-br from-primary-100 to-primary-200 items-center justify-center shrink-0">
                      <svg class="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-3">
                        <span class="px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-100 text-primary-700">
                          文章
                        </span>
                        <span class="text-xs text-stone-400">
                          {post.createdAt?.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                      </div>
                      
                      <h2 class="font-display text-xl md:text-2xl font-bold text-surface-950 group-hover:text-primary-600 transition-colors mb-3">
                        {post.title}
                      </h2>
                      
                      <p class="text-stone-500 line-clamp-2 mb-4">
                        {post.content}
                      </p>
                      
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-stone-400 text-sm">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>作者 ID: {post.userId}</span>
                        </div>
                        
                        <span class="flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                          阅读更多
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div class="text-center py-20 opacity-0 animate-fade-in">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <svg class="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-stone-500 mb-2">暂无文章</h3>
            <p class="text-stone-400">数据库中还没有文章数据</p>
          </div>
        )}
      </div>
    </div>
  );
});
