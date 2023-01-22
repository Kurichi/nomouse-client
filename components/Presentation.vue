<script setup lang="ts">
const currentPage = ref(0);

const props = defineProps({
  slides: { type: Object, required: true }, // v-model用
  screenWidth: { type: Number, required: true },
});

onMounted(() => {
  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (currentPage.value + 1 < props.slides.length) {
        currentPage.value++;
      } else {
        exitFullscreen();
      }
    } else if (e.key === 'ArrowLeft' && currentPage.value > 0)
      currentPage.value--;
  });
});

const exitFullscreen = () => {
  currentPage.value = 0;
  document.exitFullscreen();
};

const nextPage = () => {
  if (currentPage.value + 1 < props.slides.length) {
    currentPage.value++;
  } else {
    exitFullscreen();
  }
};
</script>

<template>
  <div
    class="w-screen h-screen absolute -top-[var(--header-h)] left-0 z-40 bg-black"
    @click="nextPage()"
  >
    <BaseSlide
      :slide-data="props.slides[currentPage]?.elements"
      :width="screenWidth"
      :slide-index="currentPage"
      slide-id="presentation"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    />
  </div>
</template>
