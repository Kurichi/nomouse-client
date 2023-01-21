<script setup lang="ts">
const currentPage = ref(0);

const props = defineProps({
  slides: { type: Object, required: true }, // v-model用
});

onMounted(() => {
  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage.value + 1 < props.slides.length) {
      currentPage.value++;
    } else if (e.key === 'ArrowLeft' && currentPage.value > 0)
      currentPage.value--;
  });
});
</script>

<template>
  <BaseSlide :slide-data="props.slides[currentPage]" :slide-show="true" />
</template>
