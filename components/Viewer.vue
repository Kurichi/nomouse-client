<script setup lang="ts">
const mainViewer = ref<HTMLDivElement>();
const mainViewerWidth = ref(0);

const sideViewer = ref<HTMLDivElement>();
const sideViewerWidth = ref(0);

const mainSlide = ref(0);

// const slides = ref<SlideElement[][]>([]);

const props = defineProps({
  slides: { type: Object, required: true }, // v-model用
});

onMounted(() => {
  window.addEventListener('resize', mainViewerWidthResize);
  window.addEventListener('resize', sideViewerWidthResize);
  mainViewerWidthResize();
  sideViewerWidthResize();
});

const mainViewerWidthResize = () => {
  mainViewerWidth.value = mainViewer.value?.clientWidth!;
};
const sideViewerWidthResize = () => {
  sideViewerWidth.value = sideViewer.value?.clientWidth!;
};

onUnmounted(() => {
  window.removeEventListener('resize', mainViewerWidthResize);
  window.removeEventListener('resize', sideViewerWidthResize);
});
</script>

<template>
  <div class="w-1/2 h-full bg-slate-100 min-w-[500px] text-gray-700 flex">
    <div
      class="w-[15%] h-full relative py-3 overflow-y-scroll box-shadow"
      id="side-viewer"
      ref="sideViewer"
    >
      <div
        v-for="(slide, index) in (props.slides as SlideElement[][])"
        :key="index"
        class="mb-1"
      >
        <BaseSlide
          :width="sideViewerWidth - 15"
          :slide-data="slide"
          class="mx-auto cursor-pointer"
          @click="mainSlide = index"
        />
        <div class="text-center text-xs text-gray-400 mt-1">{{ index }}</div>
      </div>
    </div>
    <div class="w-[85%] h-full relative" ref="mainViewer">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <BaseSlide
          :width="mainViewerWidth - 40"
          :slide-data="props.slides[mainSlide]"
          shadow-size="lg"
        />
        <BaseSlideComment
          :comment="(props.slides as SlideElement[][])[mainSlide][0].text"
          class="mx-auto mt-10"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#side-viewer {
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cecece8a;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: inherit;
  }
}

.box-shadow {
  box-shadow: 3px 0px 8px 0px rgba(0, 0, 0, 0.2);
}
</style>
