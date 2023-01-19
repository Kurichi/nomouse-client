<script setup lang="ts">
const code = ref(`# はじめに\n\n- これは箇条書き\n- 2つ目の箇条書き\n`)
</script>

<template>
  <div
    class="flex h-[var(--slide-editor-h)] overflow-hidden"
    style="--slide-editor-h: calc(100vh - var(--header-h))"
  >
    <Editor v-model="code" language="markdown" />
    <Viewer />
  </div>
</template>

<style scoped lang="scss"></style>
<style>
body {
  height: 100vh;
  overflow: hidden;
}
</style>
