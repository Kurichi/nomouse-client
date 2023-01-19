<script setup lang="ts">
const props = defineProps({
  width: { type: Number, default: 350 },
  shadowSize: { type: String, default: 'base' },
  slideData: { type: Number, required: true },
})

const shadowSizeHandler = (): string => {
  switch (props.shadowSize) {
    case 'base':
      return 'shadow'
    case 'md':
      return 'shadow-md'
    case 'lg':
      return 'shadow-lg'
    case 'xl':
      return 'shadow-xl'
    case '2xl':
      return 'shadow-2xl'
    default:
      return 'shadow'
  }
}
</script>

<template>
  <div
    class="shadow-gray-300 bg-white w-[var(--slide-w)] h-[var(--slide-h)] overflow-hidden rounded"
    :class="shadowSizeHandler()"
    :style="`--slide-w: ${props.width}px; --slide-h: ${props.width * 0.6}px;`"
  >
    <!-- <canvas class="w-[var(--slide-w)] h-[var(--slide-h)]" /> -->
    <span>{{ slideData }}</span>
  </div>
</template>
