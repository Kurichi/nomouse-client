<script setup lang="ts">
import { SlideElement } from '@/@types/slide';
import BaseSlide from '@/components/BaseSlide.vue';

const mainViewer = ref<HTMLDivElement>();
const mainViewerWidth = ref(0);

const sideViewer = ref<HTMLDivElement>();
const sideViewerWidth = ref(0);

const mainSlide = ref(0);

// const slides = ref<SlideElement[][]>([]);

const props = defineProps({
  slides: { type: Object, required: true }, // v-model用
  changeFlag: { type: Boolean, required: true },
  currentSlide: { type: Number, default: 0 },
});

const { changeFlag } = toRefs(props);

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

const getNote = (slide: SlideElement[]): string => {
  let note = '';
  slide.map((element: SlideElement) => {
    if (element.type === 'note') {
      note = element.text;
    }
  });

  return note;
};

const getMainSlide = (): SlideElement[] => {
  return props.slides[props.currentSlide];
};

const changeMainSlide = (index: number) => {
  mainSlide.value = index;
};

onUnmounted(() => {
  window.removeEventListener('resize', mainViewerWidthResize);
  window.removeEventListener('resize', sideViewerWidthResize);
});
</script>

<template>
  <div class="w-1/2 h-full bg-slate-200 min-w-[500px] text-gray-700 flex">
    <div
      class="w-[15%] h-full relative py-3 overflow-y-scroll box-shadow"
      id="side-viewer"
      ref="sideViewer"
    >
      <div
        v-for="(slide, index) in (props.slides as Page[])"
        :key="index"
        class="mb-1"
      >
        <BaseSlide
          :width="sideViewerWidth - 15"
          :change-flag="changeFlag"
          :slide-id="`sub-${index}`"
          :slide-data="slide.elements"
          class="mx-auto cursor-pointer"
          @click="changeMainSlide(index)"
        />
        <div class="text-center text-xs text-gray-400 mt-1 select-none">
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <div class="w-[85%] h-full relative" ref="mainViewer">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <BaseSlide
          ref="baseSlide"
          :width="mainViewerWidth - 40"
          :slide-data="getMainSlide()"
          :change-flag="changeFlag"
          :slide-index="mainSlide"
          slide-id="main"
          shadow-size="lg"
        />
        <BaseSlideComment
          :comment="getNote((props.slides as Page[])[props.currentSlide].elements)"
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
