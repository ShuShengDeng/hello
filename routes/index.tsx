import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";

export default define.page(function Home() {
  return (
    <div class="min-h-screen relative overflow-hidden noise-bg">
      <Head>
        <title>DenoSkill - 高品质全栈应用</title>
      </Head>
      
      <div class="absolute inset-0 bg-linear-to-br from-primary-50 via-white to-primary-100" />
      
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-300/30 rounded-full blur-3xl animate-float" style="animation-delay: -3s;" />
      
      <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <div class="opacity-0 animate-fade-in-up">
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-primary-100 text-primary-700 border border-primary-200 mb-8">
              Powered by Deno + Fresh
            </span>
          </div>
          
          <h1 class="opacity-0 animate-fade-in-up delay-100 font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6">
            <span class="gradient-text">DenoSkill</span>
          </h1>
          
          <p class="opacity-0 animate-fade-in-up delay-200 text-xl md:text-2xl text-stone-600 font-light max-w-2xl mx-auto mb-4 text-balance">
            高品质全栈应用
          </p>
          
          <p class="opacity-0 animate-fade-in-up delay-300 text-base text-stone-500 max-w-xl mx-auto mb-16">
            探索现代 Web 开发的艺术，体验极致的用户界面与流畅的交互设计
          </p>
          
          <div class="opacity-0 animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/users" 
              class="group relative px-8 py-4 rounded-xl font-medium text-white bg-linear-to-r from-primary-500 via-primary-600 to-primary-700 hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 transition-all duration-300 hover-lift overflow-hidden shadow-lg shadow-primary-600/20"
            >
              <span class="relative z-10 flex items-center justify-center gap-2">
                用户管理
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div class="absolute inset-0 animate-shimmer" />
            </a>
            
            <a 
              href="/posts" 
              class="group relative px-8 py-4 rounded-xl font-medium text-surface-800 bg-white hover:bg-primary-50 transition-all duration-300 hover-lift shadow-lg border border-primary-200"
            >
              <span class="flex items-center justify-center gap-2">
                文章列表
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
