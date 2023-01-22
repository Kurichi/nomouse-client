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
  maxW: { type: Number, default: 2000 },
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
type Img = { src: string; x: string; y: string; w: string; h: string }
const img = ref<Img[]>()

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
    let position = { x: 0, y: 0 }
    img.value = new Array<Img>()
    const ctx = slideCanvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, slideCanvas.value.width, slideCanvas.value.height)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, slideCanvas.value.width, slideCanvas.value.height)
      props.slideData.forEach((element: SlideElement) => {
        if (element.color) {
          ctx.fillStyle = element.color
        } else {
          ctx.fillStyle = theme.baseColor
        }
        if (element.type) {
          switch (element.type) {
            case 'title':
              if (!['title'].includes(preventElementType.value)) {
                currentPositionY.value += 50
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
              console.log(element)
              if (['bullet'].includes(preventElementType.value)) {
                currentPositionY.value -= 10
              } else {
                currentPositionY.value += 10
              }
              console.log('bullet')
              ctx.font = `100 ${theme.textSize}pt ${theme.fontStyle}`
              let op = '・ '
              switch (element.options) {
                case '1':
                  op = '› '
                  break
                case '2':
                  op = '- '
                  break
                default:
                  break
              }
              ctx.fillText(
                op + element.text,
                currentPositionX.value + 50 + 50 * parseInt(element.options),
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
                currentPositionX.value + 50 + 50 * parseInt(element.options),
                currentPositionY.value
              )
              currentPositionY.value += theme.textSize + 40
              break
            case 'image':
              console.log('image')
              console.log(element)
              console.log(element.text)
              const { imgx, imgy } = imgPosition(element)
              if (element.size.width !== '') {
                img.value!.push({
                  src: element.text,
                  x: imgx,
                  y: imgy,
                  w: element.size.width,
                  h: element.size.height,
                })
              } else {
                img.value!.push({
                  src: element.text,
                  x: imgx,
                  y: imgy,
                  w: '200',
                  h: 'auto',
                })
              }
              break
            case 'text':
              console.log('text')
              console.log(element)
              console.log(element.text)
              position = ctxPositionSetting(element, ctx)
              console.log(position)
              ctx.font = `100 ${theme.textSize}pt ${theme.fontStyle}`
              ctx.fillText(element.text, position.x, position.y)
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

const imgPosition = (element: SlideElement) => {
  let x = 'left: 50%;'
  let y = 'top: 50%;'
  if (element.position) {
    console.log('have position')
    switch (element.position!.x!) {
      case 'left':
        x = 'left: 5%;'
        break
      case 'right':
        x = 'right: 5%;'
        break
      case 'center':
        x = 'left: 50%; transform: translateX(-50%);'
        break
      default:
        break
    }
    switch (element.position!.y!) {
      case 'top':
        y = 'top: 5%;'
        break
      case 'bottom':
        y = 'bottom: 5%;'
        break
      case 'center':
        y = 'top: 50%; transform: translateY(-50%);'
        break
      default:
        break
    }
  }
  return { imgx: x, imgy: y }
}

const ctxPositionSetting = (
  element: SlideElement,
  ctx: CanvasRenderingContext2D
): { x: number; y: number } => {
  let x = 0
  let y = 0
  if (element.position) {
    console.log('have position')
    switch (element.position!.x!) {
      case 'left':
        x = 0
        break
      case 'right':
        x = slideCanvas.value?.width! - ctx.measureText(element.text).width
        break
      case 'center':
        x =
          (slideCanvas.value?.width! - ctx.measureText(element.text).width) / 2
        console.log(x)
        break
      default:
        x = parseInt(element.position!.x!)
        break
    }
    switch (element.position!.y!) {
      case 'top':
        y = theme.textSize
        break
      case 'bottom':
        y = slideCanvas.value?.height!
        break
      case 'center':
        y = (slideCanvas.value?.height! + theme.textSize) / 2
        break
      default:
        y = parseInt(element.position!.y!)
        break
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
    class="relative shadow-gray-300 bg-white overflow-hidden rounded w-[var(--slide-w)] h-[var(--slide-h)] max-w-[var(--max-w)] max-h-[var(--max-h)]"
    :class="[shadowSizeHandler()]"
    :style="`--slide-w: ${props.width}px; --slide-h: ${
      props.width * 0.6
    }px; --max-w: ${props.maxW}px; --max-h: ${props.maxW * 0.6}px;`"
  >
    <canvas
      :id="`slide-${props.slideId}`"
      ref="slideCanvas"
      class="w-full h-full"
      width="1500"
      height="900"
    />
    <img
      v-for="(item, index) in img"
      :key="index"
      :src="item.src"
      alt=""
      class="absolute"
      :style="`${item.y} ${item.x} width: ${item.w}px; height: auto;`"
    />
  </div>
</template>
