import { editor } from 'monaco-editor'
import { ElementType, SlideElement } from '@/@types/slide'

interface promise {
  id?: NodeJS.Timeout
  change: string
}
const beforePromise = ref<promise>()

interface codeStyleType {
  type: ElementType
  style: RegExp
}

const codeStyle: codeStyleType[] = [
  { type: 'title', style: /^#[^#]+$/gm }, // タイトル
  { type: 'bullet', style: /^-[^-]+$/gm }, // 箇条書き
  { type: 'number', style: /^[1-9]+[0-9]*\..+$/gm }, // 順序書き
  { type: 'code-block', style: /\n```\n[^`]+```\n/g },
  { type: 'note', style: /\n#{3,}\n.*$/g },
  { type: 'media', style: /^\!.+$/gm },
  { type: 'triangle', style: /^\\triangle .*$/gm },
  { type: 'box', style: /^\\box .*$/gm },
  { type: 'text', style: /^\\text .*$/gm },
]

export const compile = (
  code: string,
  event: string,
  onEndCompile: (slides: SlideElement[][]) => void
) => {
  // 前回のコンパイルをキャンセル
  if (
    beforePromise.value &&
    beforePromise.value.change !== ' ' &&
    beforePromise.value.change !== '\n'
  )
    clearTimeout(beforePromise.value.id)

  beforePromise.value = {
    change: event,
  }

  // ここから解析開始
  const TIMEOUT_VALUE = 1000
  beforePromise.value.id = setTimeout(() => {
    let result: SlideElement[][] = []
    // スライド単位に分割
    const codeOfSlides = code.split('---')

    codeOfSlides.forEach((slide) => {
      if (slide.startsWith('disable')) return

      // slide の要素集合
      let elements: SlideElement[] = []

      // 途中に改行を許すものは最初に処理する
      // ノート
      const [slide_without_note, note] = slide.split(/^#{3,}$/gm)
      if (note) {
        elements.push({
          type: 'note',
          text: note,
        })
      }

      // コードブロック mermaid用
      const codeBlock = slide_without_note.match(/```.*\n[^`]*```\n{0,1}/g)
      if (codeBlock) {
        elements.push({
          type: 'code-block',
          text: codeBlock[0].replaceAll(/```\n{0,1}/g, ''),
        })
      }

      const v = slide_without_note
        .replaceAll(/```.*\n[^`]*```/g, '')
        .split('\n')
      v.forEach((elem) => {
        elem.replaceAll('\\\\', '\n')
        let e: SlideElement = {
          type: null,
          text: '',
        }
        // コメント
        if (elem.startsWith('//')) {
        }
        // タイトル
        else if (elem.startsWith('#')) {
          e.type = 'title'
          e.text = elem.replace('#', '')
        }
        // 箇条書き
        else if (elem.startsWith('-')) {
          e.type = 'bullet'
          e.text = elem.replace('-', '')
        }
        // 順序書き
        else if (elem.match('^[1-9][0-9]*.')) {
          e.type = 'number'
          e.text = elem
        }
        // メディア
        else if (elem.startsWith('!')) {
          e.type = 'media'
          e.text = elem.replace('!', '')
        }

        // アイテム
        else if (elem.startsWith('\\')) {
          const options = elem.split(' ')
          e.type = options[0].replace('\\', '') as ElementType
          options.forEach((order) => {
            const [_for, _val] = order.split(/[:=]/g)
            // const _val = order.split('=')[1];
            console.log(_for, _val)

            if (_for === 'color') {
              e.color = _val
            } else if (_for === 'size') {
              if (typeof _val !== 'undefined') {
                const [width, height] = _val
                  .replaceAll(/[\(\)]/g, '')
                  .split(',')
                e.size = {
                  width: width,
                  height: height,
                }
              }
            } else if (_for === 'width') {
              e.size = {
                width: _val,
              }
            } else if (_for === 'height') {
              e.size = {
                height: _val,
              }
            } else if (_for === 'position') {
              if (typeof _val !== 'undefined') {
                const [x, y] = _val.replaceAll(/[\(\)]/g, '').split(',')
                e.position = {
                  x: x,
                  y: y,
                }
              }
            } else if (_for === 'x') {
              e.position = {
                x: _val,
              }
            } else if (_for === 'y') {
              e.position = {
                y: _val,
              }
            }
          })
        } else {
          if (elem !== '') {
            e.type = 'plane'
            e.text = elem
          }
        }

        // typeがnull出ないときにpush
        if (e.type !== null) elements.push(e)
      })

      result.push(elements)
    })

    onEndCompile(result)
  }, TIMEOUT_VALUE)
}
