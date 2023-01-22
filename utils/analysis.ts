import { editor } from 'monaco-editor';

const beforePromise = ref<NodeJS.Timeout>();

interface codeStyleType {
  type: ElementType;
  style: RegExp;
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
];

export const compile = (
  code: string,
  change: string,
  onEndCompile: (slides: Page[]) => void
) => {
  // 前回のコンパイルをキャンセル
  clearTimeout(beforePromise.value);

  // 解析屋さん
  const Analysis = () => {
    let result: Page[] = [];
    // スライド単位に分割
    const codeOfSlides = code.split('---');

    let endPageLine = 1;

    codeOfSlides.forEach((slide) => {
      const beginPageLine = endPageLine;
      endPageLine = beginPageLine + slide.split('\n').length - 1;
      if (slide.startsWith('disable')) return;

      // slide の要素集合
      let elements: SlideElement[] = [];

      // 途中に改行を許すものは最初に処理する
      // ノート
      const [slide_without_note, note] = slide.split(/^#{3,}$/gm);
      if (note) {
        elements.push({
          type: 'note',
          text: note,
        });
      }

      // コードブロック mermaid用
      const codeBlock = slide_without_note.match(/```.*\n[^`]*```\n{0,1}/g);
      if (codeBlock) {
        elements.push({
          type: 'code-block',
          text: codeBlock[0].replaceAll(/```\n{0,1}/g, ''),
        });
      }

      const v = slide_without_note
        .replaceAll(/```.*\n[^`]*```/g, '')
        .split('\n');
      v.forEach((elem) => {
        elem.replaceAll('\\\\', '\n');
        let e: SlideElement = {
          type: null,
          text: '',
        };
        // コメント
        if (elem.startsWith('//')) {
        }
        // タイトル
        else if (elem.startsWith('# ')) {
          e.type = 'title';
          e.text = elem.replace('# ', '');
        }
        // 箇条書き
        else if (elem.match(/[\ \t]*- /gm)) {
          e.type = 'bullet';
          const nest = elem.split('-')[0].replaceAll('\t', '    ');
          e.options = (nest.length / 4).toString();
          e.text = elem.replace(/^ *- /g, '');
        }
        // 順序書き
        else if (elem.match('^[1-9][0-9]*.')) {
          e.type = 'number';
          e.text = elem;
        }
        // // メディア
        // else if (elem.startsWith('!')) {
        //   e.type = 'media';
        //   e.text = elem.replace('!', '');
        // }

        // アイテム
        else if (elem.startsWith('\\')) {
          e.type = elem.split(' ')[0].replace('\\', '') as ElementType;
          const options = elem.replace(/^\\^[ ]+ /g, '').split(' ');
          e.size = {};
          e.position = {};
          options.forEach((order) => {
            const [_for, _val] = order.split(/[:=]/g);
            // const _val = order.split('=')[1];
            if (typeof _val === 'undefined') e.text = _for;
            else if (_for === 'color') {
              e.color = _val;
            } else if (_for === 'size') {
              if (typeof _val !== 'undefined') {
                const [width, height] = _val
                  .replaceAll(/[\(\)]/g, '')
                  .split(',');
                e.size = {
                  width: width,
                  height: height,
                };
              }
            } else if (_for === 'width') {
              e.size.width = _val;
            } else if (_for === 'height') {
              e.size.height = _val;
            } else if (_for === 'position') {
              if (typeof _val !== 'undefined') {
                const [x, y] = _val.replaceAll(/[\(\)]/g, '').split(',');
                e.position = {
                  x: x,
                  y: y,
                };
              }
            } else if (_for === 'x') {
              e.position.x = _val;
            } else if (_for === 'y') {
              e.position.y = _val;
            }
          });
        } else {
          if (elem !== '') {
            e.type = 'plane';
            e.text = elem;
          }
        }

        // typeがnull出ないときにpush
        if (e.type !== null) elements.push(e);
      });

      result.push({
        elements: elements,
        beginPageLine: beginPageLine,
        endPageLine: endPageLine,
      });
    });

    onEndCompile(result);
  };

  // ここから解析開始
  if (change === ' ' || change === '\n' || change === '\t' || change === '')
    Analysis();
  else beforePromise.value = setTimeout(Analysis, 1000);
};
