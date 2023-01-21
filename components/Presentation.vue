<script setup lang="ts">
const currentPage = ref(0)

const props = defineProps({
  slides: { type: Object, required: true }, // v-model用
  screenWidth: { type: Number, required: true },
})

onMounted(() => {
  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage.value + 1 < props.slides.length) {
      currentPage.value++
    } else if (e.key === 'ArrowLeft' && currentPage.value > 0)
      currentPage.value--
  })
})
</script>

<template>
  <div
    class="w-screen h-screen absolute -top-[var(--header-h)] left-0 z-40 bg-black"
  >
    <BaseSlide
      :slide-data="props.slides[currentPage]"
      :width="screenWidth"
      slide-id="presentation"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    />
  </div>
</template>
