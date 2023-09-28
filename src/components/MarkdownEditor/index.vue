<!-- MarkdownEditor -->
<template>
  <!-- <MdEditor v-model="editorText" :previewOnly="true" theme="dark" /> -->
  <MdPreview v-model="editorText"  theme="dark" />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue"
import { MdPreview,MdEditor } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
// import { StateList } from "../../types"

export default defineComponent({
  name: "MarkdownEditor",
  components: { MdPreview ,MdEditor},
  props: {
    editorText: {
      type: String,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    // 背景
    const img: Ref<string> = ref("")

    // 是否显示关于
    const showAbout: Ref<boolean> = ref(true)

    // 是否显示弹窗
    const showDialog: Ref<boolean> = ref(false)

    // 弹窗标题
    const title: Ref<string> = ref("")

    // 关闭菜单
    const handleClose = () => {
      showDialog.value = false
    }

    return {
      img,
      // handleOpenMenu,
      showAbout,
      showDialog,
      handleClose,
      title
    }
  }
})
</script>
<style lang="scss" scoped>
#editor {
  height: 100%;
}
.md-editor {
  height: 83vh !important;
  border-radius: 10px;
  // background: transparent;
}

:deep(blockquote) {
  border-left-color: rgb(239, 112, 96) !important;
  background: #646869 !important;
  display: block;
  font-size: 0.9em;
  overflow: auto;
  border-left: 3px solid rgba(0, 0, 0, 0.4);
  //   color: #6a737d;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}
:deep(h2) {
  margin-top: 30px;
  margin-bottom: 15px;
  padding: 0px;
  font-weight: bold;
  color: #dbdbdb;
  display: block;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-bottom: 2px solid rgb(239, 112, 96);
  a {
    display: inline-block;
    font-weight: bold;
    background: rgb(239, 112, 96);
    color: #ffffff;
    padding: 3px 10px 1px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    margin-right: 3px;
  }
}
:deep(h2::after) {
  display: inline-block;
  content: " ";
  vertical-align: bottom;
  border-bottom: 36px solid #efebe9;
  border-right: 20px solid transparent;
}
:deep(code) {
  color: rgb(239, 112, 96);
  font-size: 14px;
  word-wrap: break-word;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: rgba(27, 31, 35, 0.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  word-break: break-all;
}
:deep(.figure) {
  display: flex;
}
:deep(.cjp) {
  background-color: #fcddb4;
  padding: 6px 6px;
  border-radius: 4px;
}
.md-editor-dark {
  --md-color: #dbdbdb;
  --md-bk-color: #2b2a2ac2;
}
</style>
