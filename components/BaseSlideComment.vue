<script setup lang="ts">
const props = defineProps({
  comment: { type: String, default: `これはコメントです` },
})
</script>

<template>
  <div class="bg-white rounded-xl min-h-[100px] text-sm px-4 py-3">
    {{ props.comment }}
  </div>
</template>

<style lang="scss" scoped></style>
