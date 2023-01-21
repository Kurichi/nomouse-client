<script setup lang="ts">
import { numberLiteralTypeAnnotation } from '@babel/types';
import { editor } from 'monaco-editor';

definePageMeta({
  middleware: ['auth'],
});

const code = ref(`# はじめに\n\n- これは箇条書き\n- 2つ目の箇条書き\n`);
const slides = ref<SlideElement[][]>([[{ type: 'note', text: '' }]]);

const analysis = (value: string, event: editor.IModelContentChangedEvent) => {
  compile(value, event, (slide) => {
    slides.value = slide;
  });
};
</script>

<template>
  <div
    class="flex h-[var(--slide-editor-h)] max-w-[1980px] overflow-y-hidden overflow-x-auto relative"
    id="slide-edit"
    style="--slide-editor-h: calc(100vh - var(--header-h))"
  >
    <div class="!absolute top-[5%] right-5 z-20 flex">
      <BaseIconButton name="present_to_all" size="2xl" class="mr-3" />
      <BaseIconButton name="output" size="2xl" />
    </div>
    <Editor
      v-model="code"
      language="markdown"
      @change="(value, event) => analysis(value, event)"
    />
    <Viewer :slides="slides" />
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
