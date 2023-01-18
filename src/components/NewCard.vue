<script setup lang="ts"></script>

<template>
  <router-link
    :to="`/slide/id`"
    class="card block rounded-xl max-w-fit cursor-pointer"
  >
    <div
      class="relative w-[var(--card-w)] h-[var(--card-h)] m-0 rounded-xl border-2 border-gray-200 box-border overflow-hidden hover:shadow-md"
    >
      <span
        class="material-symbols-outlined text-8xl text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        add
      </span>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.card {
  &__title {
    font-size: clamp(20px, 2vw, 26px);
  }

  &__updated {
    font-size: clamp(14px, 1.4vw, 18px);
  }
}
</style>
