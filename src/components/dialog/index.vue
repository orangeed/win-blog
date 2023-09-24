<!-- dialog -->
<template>
  <n-modal
    v-model:show="props.showDialog"
    preset="dialog"
    :style="{ width: '70%', height: '80vh', margin: '40px auto', '--img': 'url(' + props.img + ')' }"
    :show-icon="false"
    :on-close="handleClose"
    :title="props.title"
    class="dialog"
  >
    <div class="flex text-black box">
      <div class="left">
        <div
          v-for="(item, index) in leftList"
          :key="index"
          :class="['item', currentIndex === index ? 'check' : '', 'flex', 'items-center']"
          @click.stop="handleClick(index)"
        >
          <n-icon size="30" :component="item.icon" :color="item.color" />
          <span class="ml-3">{{ item.label }}</span>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <!-- <slot></slot> -->
  </n-modal>
</template>

<script lang="ts" setup name="dialog">
import { Ref, ref, watch } from "vue"
import { stateList, bookList, movieList, codeList, toolList } from "../../utils/enum"
import { StateList } from "../../types"

const props = defineProps<{ showDialog: boolean; title: string; img: string }>()

const emits = defineEmits(["CLOSE", "LEFTINDEX"])

const leftList: Ref<StateList[]> = ref([])

// 关闭
const handleClose = () => {
  emits("CLOSE")
}

// 左边的点击
const currentIndex: Ref<number> = ref(0)
const handleClick = (item: any) => {
  console.log("item", item)
  currentIndex.value = item
  emits("LEFTINDEX", item)
}

watch(
  () => props.title,
  (val) => {
    if (val) {
      currentIndex.value = 0
      switch (val) {
        case "文章":
          leftList.value = stateList
          break
        case "图书馆":
          leftList.value = bookList
          break
        case "放映室":
          leftList.value = movieList
          break
        case "代码文件":
          leftList.value = codeList
          break
        case "工具箱":
          leftList.value = toolList
          break
        case "更新日志":
          leftList.value = codeList
          break

        default:
          break
      }
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.box {
  height: calc(80vh - 80px);
  .left {
    @apply w-1/4 h-full rounded-xl p-3 relative;
    background-color: rgba(160, 160, 160, 0.5);
    overflow: hidden;
    z-index: 10;
    color: #fff;
    &::before {
      content: "";
      position: absolute;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      filter: blur(4px);
      z-index: -1;
    }
    .item {
      @apply p-2  m-2 rounded-lg text-white cursor-pointer;
      transition: all 0.5s;
    }
    :hover {
      @apply bg-white;
      background-color: #5c5c5c66;
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        filter: blur(4px);
        z-index: -1;
      }
    }
    .check {
      @apply bg-white;
      background-color: #38383866;
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        filter: blur(4px);
        z-index: -1;
      }
    }
  }
  .right {
    @apply w-3/4 h-full rounded-xl p-3 relative ml-5;
    background-color: rgba(160, 160, 160, 0.5);
    overflow: hidden;
    z-index: 10;
    color: #fff;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      filter: blur(4px);
      z-index: -1;
    }
  }
}
</style>

<style lang="scss">
.dialog {
  position: relative;
  background-color: rgba(160, 160, 160, 0.5);
  overflow: hidden;
  z-index: 10;
  color: #fff;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--img);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(4px);
    z-index: -1;
  }
}
.n-dialog .n-dialog__close {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.n-dialog__close:hover {
  background-color: red;
  color: #fff;
}
.n-base-icon {
  color: #fff;
}
.n-dialog__title {
  color: #fff !important;
  font-weight: bold !important;
}
</style>
