<script setup lang="ts">
import { SlideElement } from '@/@types/slide'

const slideCanvas = ref<HTMLCanvasElement>()

const props = defineProps({
  width: { type: Number, default: 350 },
  shadowSize: { type: String, default: 'base' },
  slideData: { type: Object, required: true },
  changeFlag: { type: Boolean, default: true },
  slideId: { type: String, required: true },
  slideIndex: { type: Number, default: 0 },
})
const { changeFlag, slideIndex } = toRefs(props)

const canvasMargin = 70
const basePosition = {
  x: canvasMargin.valueOf(),
  y: canvasMargin.valueOf() * 2,
}
const currentPositionX = ref(canvasMargin.valueOf())
const currentPositionY = ref(canvasMargin.valueOf() * 2)

const preventElementType = ref('')

const theme = {
  baseColor: '#777777',
  fontStyle: 'Arial',
  titleSize: 55,
  titleColor: '#999999',
  textSize: 30,
  textColor: '#777777',
}

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

const draw = () => {
  // init
  currentPositionX.value = basePosition.x
  currentPositionY.value = basePosition.y
  preventElementType.value = ''

  if (slideCanvas.value) {
    const ctx = slideCanvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, slideCanvas.value.width, slideCanvas.value.height)

      props.slideData.forEach((element: SlideElement) => {
        if (element.color) {
          ctx.fillStyle = element.color
        } else {
          ctx.fillStyle = theme.baseColor
        }
        if (element.type) {
          switch (element.type) {
            case 'title':
              if (['plane', 'bullet'].includes(preventElementType.value)) {
                currentPositionY.value += 30
              }
              console.log('title')
              ctx.font = `bold ${theme.titleSize}pt ${theme.fontStyle}`
              ctx.fillText(
                element.text,
                currentPositionX.value,
                currentPositionY.value
              )
              currentPositionY.value += theme.titleSize + 60
              break
            case 'plane':
              if (['plane'].includes(preventElementType.value)) {
                currentPositionY.value -= 20
              } else {
                currentPositionY.value += 10
              }
              console.log('plane')
              ctx.font = `100 ${theme.textSize}pt ${theme.fontStyle}`
              ctx.fillText(
                element.text,
                currentPositionX.value + 40,
                currentPositionY.value
              )
              currentPositionX.value = basePosition.x
              currentPositionY.value += theme.textSize + 40
              break
            case 'bullet':
              if (['bullet'].includes(preventElementType.value)) {
                currentPositionY.value -= 10
              } else {
                currentPositionY.value += 10
              }
              console.log('bullet')
              ctx.font = `100 ${theme.textSize}pt ${theme.fontStyle}`
              ctx.fillText(
                '・ ' + element.text,
                currentPositionX.value + 50,
                currentPositionY.value
              )
              currentPositionY.value += theme.textSize + 40
              break
            case 'number':
              if (['number'].includes(preventElementType.value)) {
                currentPositionY.value -= 10
              } else {
                currentPositionY.value += 10
              }
              console.log('number')
              ctx.font = `100 ${theme.textSize}pt ${theme.fontStyle}`
              ctx.fillText(
                element.text,
                currentPositionX.value + 50,
                currentPositionY.value
              )
              currentPositionY.value += theme.textSize + 40
              break
            case 'media':
              console.log('media')
              console.log(element.text)
              const { x, y } = ctxPositionSetting(element, ctx)
              ctx.font = `100 ${theme.textSize}pt ${theme.fontStyle}`
              const chara = new Image()
              chara.src = element.text
              chara.onload = () => {
                ctx.drawImage(chara, x, y)
              }
              break
            default:
              break
          }
          preventElementType.value = element.type
        }
      })
    }
  }
}

const ctxPositionSetting = (
  element: SlideElement,
  ctx: CanvasRenderingContext2D
): { x: number; y: number } => {
  let x = 0
  let y = 0
  if (element.position) {
    if (typeof element.position!.x! === 'string') {
      x = parseInt(element.position!.x!)
    } else {
      switch (element.position!.x!) {
        case 'left':
          x = 0
          break
        case 'right':
          x = slideCanvas.value?.width! - ctx.measureText(element.text).width
          break
        case 'center':
          x =
            (slideCanvas.value?.width! - ctx.measureText(element.text).width) /
            2
          break
        default:
          break
      }
    }
    if (typeof element.position!.y! === 'string') {
      y = parseInt(element.position!.y!)
    } else {
      switch (element.position!.y!) {
        case 'top':
          y = parseInt(element.size as string)
          break
        case 'bottom':
          y = slideCanvas.value?.height!
          break
        case 'center':
          y =
            (slideCanvas.value?.height! + parseInt(element.size as string)) / 2
          break
        default:
          break
      }
    }
  }
  return { x: x, y: y }
}

onMounted(() => {
  setTimeout(() => {
    draw()
  }, 500)
})

watch([changeFlag, slideIndex], (cr, prev) => {
  draw()
})
</script>

<template>
  <div
    :id="`slide-${props.slideId}-wrapper`"
    class="shadow-gray-300 bg-white overflow-hidden rounded w-[var(--slide-w)] h-[var(--slide-h)]"
    :class="[shadowSizeHandler()]"
    :style="`--slide-w: ${props.width}px; --slide-h: ${props.width * 0.6}px;`"
  >
    <canvas
      :id="`slide-${props.slideId}`"
      ref="slideCanvas"
      class="w-full h-full"
      width="1500"
      height="900"
    />
  </div>
</template>
