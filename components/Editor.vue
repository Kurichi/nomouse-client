<script lang="ts" setup>
import * as monaco from 'monaco-editor'

/** コンポーネントのプロパティ */
const props = defineProps({
  modelValue: String, // v-model用
  language: { type: String, default: `javascript` },
})

/** 親コンポーネントに発行するイベント定義 */
const emits = defineEmits([`change`, `update:modelValue`])

/** テンプレート参照: MonacoEditor用のDOM要素 */
const appMonacoEditorEl = ref<HTMLElement>()

/** 生成したMonacoEditorのインスタンス */
let monacoEditor: monaco.editor.IStandaloneCodeEditor | undefined = undefined

// modelValue(v-model)の監視設定
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    // エディタの初期化済みチェック
    if (!monacoEditor) {
      return
    }

    // MonacoEditor側に反映する
    if (monacoEditor.getValue() !== newVal) {
      monacoEditor.setValue(newVal ?? ``)
    }
  }
)

onMounted(() => {
  // MonacoEditorを生成する
  monacoEditor = monaco.editor.create(appMonacoEditorEl.value!, {
    language: props.language,
    value: props.modelValue,
    automaticLayout: true, // 親要素のレイアウト変更に追従させる
    theme: 'vs-dark',
    scrollBeyondLastLine: false,
  })

  // MonacoEditorのテキスト変更イベントを登録
  monacoEditor.onDidChangeModelContent((event) => {
    // エディタ上のテキストを取得
    const value = monacoEditor!.getValue()

    // 変更イベントを発行
    if (props.modelValue !== value) {
      emits(`change`, value, event)
      emits(`update:modelValue`, value, event)
    }
  })
})
</script>

<template>
  <div class="w-1/2 h-full bg-[#1e1e1e] py-5">
    <div
      ref="appMonacoEditorEl"
      class=""
      style="width: 100%; height: 100%"
    ></div>
  </div>
</template>
