<script setup lang="ts">
import { numberLiteralTypeAnnotation } from '@babel/types';
import { editor } from 'monaco-editor';

definePageMeta({
  middleware: ['auth'],
});

const code = ref(`# はじめに\n\n- これは箇条書き\n- 2つ目の箇条書き\n`);
const slides = ref<SlideElement[][]>([[{ type: 'note', text: '' }]]);
const isPresentation = ref(false);

const analysis = (value: string, event: editor.IModelContentChangedEvent) => {
  compile(value, event, (slide) => {
    slides.value = slide;
  });
};

onMounted(() => {
  document.addEventListener('fullscreenchange', (ev) => {
    if (document.fullscreenElement === null) isPresentation.value = false;
  });
  addEventListener('keydown', (ev) => {
    console.log(ev);
    if (ev.ctrlKey && ev.shiftKey && ev.key === 'H') {
      isPresentation.value = true;
      document.body.requestFullscreen();
    } else if (ev.ctrlKey && ev.shiftKey && ev.key === 'K') {
      console.log('share');
    }
  });
});

const presentation = () => {
  isPresentation.value = true;
  document.body.requestFullscreen();
};

const share = () => {};
</script>

<template>
  <div class="relative">
    <div
      class="flex h-[var(--slide-editor-h)] max-w-[1980px] overflow-y-hidden overflow-x-auto relative"
      id="slide-edit"
      style="--slide-editor-h: calc(100vh - var(--header-h))"
      v-if="!isPresentation"
    >
      <div class="!absolute top-[5%] right-5 z-20 flex">
        <BaseIconButton
          name="present_to_all"
          size="2xl"
          class="mr-3"
          @click="presentation()"
        />
        <BaseIconButton name="output" size="2xl" @click="share()" />
      </div>
      <Editor
        v-model="code"
        language="markdown"
        @change="(value, event) => analysis(value, event)"
      />
      <Viewer name="viewer" :slides="slides" />
    </div>
    <Presentation :slides="slides" v-else />
  </div>
</template>

<style scoped lang="scss">
#slide-edit {
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a1a1a1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #e7e7e7;
  }
}
</style>

<style>
body {
  height: 100vh;
  overflow: hidden;
}
</style>
