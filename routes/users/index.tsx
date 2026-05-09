import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";
import { getAllUsers } from "@/db/services.ts";

export const handler = define.handlers(async () => {
  const users = await getAllUsers();
  return { data: { users } };
});

export default define.page<typeof handler>(({ data }) => {
  const { users } = data;

  return (
    <div class="min-h-screen bg-primary-50 relative noise-bg">
      <Head>
        <title>用户列表 - DenoSkill</title>
      </Head>
      
      <div class="absolute inset-0 bg-linear-to-b from-primary-50 via-white to-primary-50" />
      
      <div class="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <header class="mb-12">
          <nav class="flex items-center justify-between mb-8 opacity-0 animate-fade-in">
            <a href="/" class="flex items-center gap-2 text-stone-500 hover:text-primary-600 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span class="text-sm font-medium">返回首页</span>
            </a>
            <div class="flex items-center gap-6">
              <a href="/users" class="text-sm font-medium text-primary-600">用户</a>
              <a href="/posts" class="text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors">文章</a>
            </div>
          </nav>
          
          <div class="opacity-0 animate-fade-in-up delay-100">
            <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
              <span class="gradient-text">用户列表</span>
            </h1>
            <p class="text-stone-500 text-lg">探索平台上的所有用户</p>
          </div>
        </header>

        {users.length > 0 ? (
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user, index) => (
              <a
                href={`/users/${user.id}`}
                class="group glass-card rounded-2xl p-6 hover-lift opacity-0 animate-fade-in-up"
                style={`animation-delay: ${(index + 2) * 0.1}s`}
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md shadow-primary-500/20">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg text-surface-950 group-hover:text-primary-600 transition-colors truncate">
                      {user.name}
                    </h3>
                    <p class="text-stone-400 text-sm truncate">{user.email}</p>
                  </div>
                </div>
                
                <div class="mt-4 pt-4 border-t border-primary-100 flex items-center justify-between">
                  <span class="text-xs text-stone-400">ID: {user.id}</span>
                  <svg class="w-4 h-4 text-stone-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div class="text-center py-20 opacity-0 animate-fade-in">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <svg class="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-stone-500 mb-2">暂无用户</h3>
            <p class="text-stone-400">数据库中还没有用户数据</p>
          </div>
        )}
      </div>
    </div>
  );
});
