<script setup lang="ts">
import Viewer from '@/components/Viewer.vue'
import { Buffer } from 'buffer'

definePageMeta({
  middleware: ['auth'],
})

const copyed = ref(false)
const code = ref(`# はじめに\n\n- これは箇条書き\n- 2つ目の箇条書き\n`)
const slides = ref<Page[]>([])
const thumbnail = ref('')
const isPresentation = ref(false)
const currentSlide = ref(0)
const changeFlag = ref(false)
const screenWidth = ref(0)

const route = useRoute()
const { token } = useAuth()
const { data } = await useFetch(`/api/v1/slides/${route.params.id}/`, {
  baseURL: 'http://markup-slide.ddns.net',
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

const slideData = data.value as Slide

code.value = slideData.code
slides.value = JSON.parse(slideData.compiled_data)
thumbnail.value = slideData.thumbnail

const analysis = (value: string, change: string) => {
  code.value = value
  compile(value, change, (slide) => {
    slides.value = slide
    if (changeFlag.value) {
      changeFlag.value = false
    } else {
      changeFlag.value = true
    }
    save()
  })
}

const cursorPosition = (lineNumber: number) => {
  slides.value.forEach((value, index) => {
    if (value.beginPageLine <= lineNumber && lineNumber <= value.endPageLine)
      currentSlide.value = index
  })
}

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
  analysis(code.value, '')
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

const save = () => {
  // const canvas: HTMLCanvasElement = document.querySelector(`#slide-sub-0`)!
  // if (canvas) {
  //   const imageUrl = canvas.toDataURL('image/png', 1.0)
  //   console.log(imageUrl)
  //   ;(async () => {
  //     const { token } = await useAuth()
  //     useFetch('/api/v1/assets/', {
  //       method: 'POST',
  //       baseURL: 'http://markup-slide.ddns.net',
  //       headers: {
  //         Authorization: `Bearer ${token.value}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: {
  //         file: createBlob(imageUrl),
  //       },
  //     })
  //   })()
  // }
  ;(async () => {
    const { token } = await useAuth()
    const route = useRoute()
    if (route.params.id) {
      const { data } = await useFetch('/api/v1/slides/', {
        method: 'PUT',
        baseURL: 'http://markup-slide.ddns.net',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          slide_id: route.params.id,
          code: code.value,
          compiled_data: JSON.stringify(slides.value),
          thumbnail: thumbnail.value,
        },
      })
    }
  })()
}

onUnmounted(() => {
  save()
})
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
      <Editor
        v-model="code"
        language="markdown"
        @change="(value, event) => analysis(value, event.changes[0].text)"
        @move="(lineNumber) => cursorPosition(lineNumber)"
      />
      <Viewer
        ref="viewer"
        :current-slide="currentSlide"
        name="viewer"
        :slides="slides"
        :change-flag="changeFlag"
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
