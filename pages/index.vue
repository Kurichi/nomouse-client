<script setup lang="ts"></script>

<template>
  <div
    class="w-full h-[var(--top-h)] bg-slate-100 relative"
    style="--top-h: calc(100vh - var(--header-h))"
  >
    <img
      src="https://cdn.discordapp.com/attachments/703125436053454932/1066566330309951609/IMB_BUduLD.GIF"
      alt="top1"
      class="absolute top-[15%] left-[15%] rounded-2xl shadow-xl shadow-gray-600 min-w-[500px] w-[40%] h-auto"
    />
    <div
      class="absolute top-[40%] left-[50%] rounded-2xl bg-white bg-opacity-60 w-[500px] h-[200px]"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] text-[30px] text-gray-800"
      >
        Markupでスライドを作ろう！
      </div>
    </div>
    <router-link
      to="/me"
      class="rounded-lg shadow-lg bg-slate-800 text-white cursor-pointer px-5 py-3 absolute left-1/2 -translate-x-1/2 top-[70%]"
    >
      はじめる
    </router-link>
  </div>
</template>
