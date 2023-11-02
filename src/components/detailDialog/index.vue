<!-- detailDialog -->
<template>
  <n-modal
    v-model:show="props.showDialog"
    preset="dialog"
    :style="{
      width: props.showAbout ? '50%' : '100%',
      height: '96vh',
      margin: '0px auto',
      '--img': 'url(' + props.img + ')'
    }"
    :show-icon="false"
    :on-close="handleClose"
    class="dialog"
    :onEsc="handleClose"
    :onMaskClick="handleClose"
  >
    <!-- <div class="overflow-auto rounded-xl" style="height: 92vh;"> -->
    <div class="rounded-xl">
      <p class="text-2xl text-center mb-5 t-2">{{ detailInfo.title }}</p>
      <p class="text-center mb-4">
        <span class="mr-2">作者：{{ detailInfo.author }}</span>
        <span>更新时间：{{ detailInfo.updateTime }}</span>
      </p>
      <MarkdownEditor :editorText="detailInfo.content"></MarkdownEditor>
    </div>
  </n-modal>
</template>

<script lang="ts" setup name="detailDialog">
import MarkdownEditor from "../MarkdownEditor/index.vue"

const props = defineProps<{ showDialog: boolean; img: string; detailInfo: any; showAbout: boolean }>()

const emits = defineEmits(["CLOSE"])

// 关闭
const handleClose = () => {
  emits("CLOSE")
}
</script>

<style lang="scss" scoped></style>
