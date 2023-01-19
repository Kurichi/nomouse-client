<script setup lang="ts">
const code = ref(`# はじめに\n\n- これは箇条書き\n- 2つ目の箇条書き\n`)
</script>

<template>
  <div
    class="flex h-[var(--slide-editor-h)] max-w-[1980px] overflow-y-hidden overflow-x-auto"
    id="slide-edit"
    style="--slide-editor-h: calc(100vh - var(--header-h))"
  >
    <Editor v-model="code" language="markdown" />
    <Viewer />
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
