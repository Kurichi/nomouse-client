<script setup lang="ts">
const { token } = useAuth()
const route = useRoute()
const { data } = await useFetch('/api/v1/share', {
  method: 'GET',
  baseURL: 'http://markup-slide.ddns.net',
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
  query: {
    shared_id: route.params.id,
  },
})
const slides = ref<Page[]>([])
const slidesData = data.value as Slide
slides.value = JSON.parse(slidesData.compiled_data)
const isPresentation = ref(false)
const currentSlide = ref(0)
const changeFlag = ref(false)
const screenWidth = ref(0)
const copyed = ref(false)

onMounted(() => {
  document.addEventListener('fullscreenchange', (ev) => {
    if (document.fullscreenElement === null) isPresentation.value = false
  })
  addEventListener('keydown', (ev) => {
    // console.log(ev)
    if (ev.ctrlKey && ev.shiftKey && ev.key === 'H') {
      presentation()
    } else if (ev.ctrlKey && ev.shiftKey && ev.key === 'K') {
      share()
    }
  })
  const screenHeight = screen.height
  screenWidth.value = screen.width
  if (screenHeight < screenWidth.value * 0.6) {
    screenWidth.value = screenHeight * 1.4
  }
})
const presentation = () => {
  isPresentation.value = true
  document.body.requestFullscreen()
}
const share = () => {
  ;(async () => {
    const { token } = await useAuth()
    const route = useRoute()
    const { data } = await useFetch('/api/v1/share', {
      method: 'POST',
      baseURL: 'http://markup-slide.ddns.net',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      query: {
        slide_id: route.params.id,
      },
    })

    const share_id = data.value.share_id
    navigator.clipboard.writeText(
      `https://kurichi.github.io/nomouse-client/slide/share/${share_id}`
    )
    copyed.value = true
    setTimeout(() => {
      copyed.value = false
    }, 4000)
  })()
}
</script>

<template>
  <div class="relative">
    <div
      class="flex h-[var(--slide-editor-h)] max-w-[1980px] overflow-y-hidden overflow-x-auto relative mx-auto"
      id="slide-edit"
      style="--slide-editor-h: calc(100vh - var(--header-h))"
    >
      <div class="!absolute top-[5%] right-5 z-20 flex">
        <BaseIconButton
          name="present_to_all"
          size="2xl"
          class="mr-3"
          @click="presentation()"
        />
        <BaseIconButton name="output" size="2xl" @click="share()" />
        <span
          v-if="copyed"
          class="text-xs absolute top-16 right-0 text-gray-500 text-center"
          >共有リンクを<br />コピーしました！</span
        >
      </div>
      <Viewer
        ref="viewer"
        :current-slide="currentSlide"
        name="viewer"
        :slides="slides"
        :change-flag="changeFlag"
        :is-share="true"
      />
    </div>
    <Presentation
      :slides="slides"
      :screen-width="screenWidth"
      v-show="isPresentation"
    />
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
