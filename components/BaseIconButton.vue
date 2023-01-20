<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'base',
  },
})

const buttonSize = ref<{ wh: string; 'font-size': string }>({
  wh: 'w-8 h-8',
  'font-size': 'text-base',
})

const sizeHandler = () => {
  switch (props.size) {
    case 'lg':
      buttonSize.value = { wh: 'w-9 h-9', 'font-size': 'text-lg' }
      break
    case 'xl':
      buttonSize.value = { wh: 'w-10 h-10', 'font-size': 'text-xl' }
      break
    case '2xl':
      buttonSize.value = { wh: 'w-12 h-12', 'font-size': 'text-2xl' }
      break
    case '3xl':
      buttonSize.value = { wh: 'w-14 h-14', 'font-size': 'text-3xl' }
      break
    case '4xl':
      buttonSize.value = { wh: 'w-16 h-16', 'font-size': 'text-4xl' }
      break
    case '5xl':
      buttonSize.value = {
        wh: 'w-20 h-20',
        'font-size': 'text-5xl',
      }
      break
    default:
      break
  }
}

onMounted(() => {
  sizeHandler()
})
</script>

<template>
  <div
    class="relative bg-white shadow-md rounded-full cursor-pointer hover:shadow-lg"
    :class="buttonSize['wh']"
  >
    <span
      class="material-symbols-outlined text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      :class="buttonSize['font-size']"
    >
      {{ props.name }}
    </span>
  </div>
</template>
