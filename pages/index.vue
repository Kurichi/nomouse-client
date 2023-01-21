<script setup lang="ts"></script>

<template>
  <div
    class="w-full h-[var(--top-h)] bg-slate-100 relative"
    style="--top-h: calc(100vh - var(--header-h))"
  >
    <img
      src="@/assets/image/top1.png"
      alt="top1"
      class="absolute top-[15%] left-[10%] rounded-2xl shadow-xl shadow-gray-400 min-w-[300px] w-[40%] h-auto"
    />
    <img
      src="@/assets/image/top1.png"
      alt="top1"
      class="absolute top-[25%] left-[20%] rounded-2xl shadow-xl shadow-gray-600 min-w-[300px] w-[40%] h-auto"
    />
    <router-link
      to="/login"
      class="rounded-lg shadow-lg bg-slate-800 text-white cursor-pointer px-5 py-3 absolute left-1/2 -translate-x-1/2 top-[70%]"
    >
      はじめる
    </router-link>
  </div>
</template>
