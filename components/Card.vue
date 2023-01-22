<script setup lang="ts">
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <router-link
    :to="`/slide/edit/${props.id}`"
    class="card block rounded-xl overflow-hidden max-w-fit cursor-pointer hover:shadow bg-white"
  >
    <div
      class="relative w-[var(--card-w)] h-[var(--card-h)] m-0 rounded-xl box-border overflow-hidden"
    >
      <img
        :src="props.imageUrl"
        :alt="`${props.title}の表紙画像`"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div class="px-5 py-3 m-0">
      <div class="card__title text-gray-600">{{ props.title }}</div>
      <div class="card__updated w-full text-end text-gray-500">
        {{ props.createdAt }}
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.card {
  &__title {
    font-size: clamp(16px, 2vw, 22px);
  }
  &__updated {
    font-size: clamp(12px, 1.4vw, 14px);
  }
}
</style>
