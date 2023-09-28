<!-- dialog -->
<template>
  <n-modal
    v-model:show="props.showDialog"
    preset="dialog"
    :style="{
      width: width,
      height: props.showAbout ? '80vh' : '90vh',
      margin: '40px auto',
      '--img': 'url(' + props.img + ')'
    }"
    :show-icon="false"
    :on-close="handleClose"
    :title="props.title"
    class="dialog"
    :onEsc="handleClose"
    :onMaskClick="handleClose"
  >
    <div :class="['flex text-black box', props.showAbout ? 'flex-row' : 'flex-col']" v-if="isMenu">
      <div v-if="props.showAbout" class="left">
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
      <div v-else class="mobile-left">
        <div
          v-for="(item, index) in leftList"
          :key="index"
          :class="['item', currentIndex === index ? 'check' : '', 'flex', 'items-center']"
          @click.stop="handleClick(index)"
          class="mobile-left-item"
        >
          <n-icon size="30" :component="item.icon" :color="item.color" />
        </div>
      </div>
      <div
        :class="['right', props.showAbout ? 'w-3/4  ml-5 pr-3' : 'w-full']"
        :style="{ backgroundColor: props.showAbout ? 'rgba(255, 255, 255, 0.2)' : '' }"
      >
        <p class="text-center font-bold text-xl mb-4 mt-2">{{ currentTitle }}</p>
        <div class="card" v-if="rightList.length > 0">
          <n-card
            v-for="(item, index) in rightList"
            :key="index"
            :class="['card-item', props.showAbout ? 'w-72' : 'w-64']"
            @click="handleGetDeatil(item)"
          >
            <template #cover>
              <img :src="item.img" />
            </template>
            <template #header>
              <p class="text-base truncate w-full">{{ item.title || item.name }}</p>
            </template>
          </n-card>
        </div>
        <div class="h-full w-full flex items-center justify-center" v-else>
          <n-empty description="空空如也" size="huge">
            <template #icon>
              <n-icon>
                <AirplanemodeActiveOutlined />
              </n-icon>
            </template>
          </n-empty>
        </div>
      </div>
    </div>
    <div v-else>
      <Update v-if="isUpdate" />
    </div>
    <slot></slot>
  </n-modal>
  <DetailDialog :showDialog="showDialogDetail" :img="props.img" :detailInfo="detailInfo" @CLOSE="handleCloseDetail" />
</template>

<script lang="ts" setup name="dialog">
import { Ref, reactive, ref, watch } from "vue"
import { stateList, bookList, movieList, codeList, toolList, softList, gameList } from "../../utils/enum"
import { StateList } from "../../types"
import Update from "../update/index.vue"
import { getHomeArticleList, getReadList, getMovieList, getHomeFindDetails } from "../../serve/index"
import { AirplanemodeActiveOutlined } from "@vicons/material"
import { useDialog } from "naive-ui"
import DetailDialog from "../detailDialog/index.vue"

const props = defineProps<{ showDialog: boolean; title: string; img: string; showAbout: boolean }>()

const emits = defineEmits(["CLOSE"])

const leftList: Ref<StateList[]> = ref([])

const rightList: Ref<any[]> = ref([])

const currentTitle: Ref<string> = ref("")

// 宽度
const width: Ref<string> = ref("70%")

// 详情
const detailInfo: any = reactive({})

// 是否有菜单
const isMenu: Ref<boolean> = ref(false)

// 是否是更新
const isUpdate: Ref<boolean> = ref(false)

// 是否显示详情
const showDialogDetail: Ref<boolean> = ref(false)

// 关闭
const handleClose = () => {
  emits("CLOSE")
}

// 关闭详情
const handleCloseDetail = () => {
  showDialogDetail.value = false
}

// 左边的点击
const currentIndex: Ref<number> = ref(0)
const handleClick = (item: any) => {
  currentIndex.value = item
  currentTitle.value = leftList.value[item].label
  const index = item.value ? item.value : item
  rightList.value = []
  switch (props.title) {
    case "文章":
      handleGetArticleList(index)
      break
    case "放映室":
      handleGetMovieList(index + 1)
      break
    case "工具箱":
      if (item === 1) {
        rightList.value = softList
      } else {
        rightList.value = gameList
      }
      break

    default:
      break
  }
}

// 获取文章列表
const handleGetArticleList = (tag: string) => {
  getHomeArticleList({ pageNum: 1, pageSize: 999, tag }).then((res: any) => {
    rightList.value = res.data.list
  })
}

// 获取图书列表
const handleGetBookList = () => {
  getReadList({ pageNum: 1, pageSize: 999 }).then((res: any) => {
    rightList.value = res.data.list
  })
}

// 获取影视列表
const handleGetMovieList = (type: number) => {
  getMovieList({ pageNum: 1, pageSize: 999, type }).then((res: any) => {
    rightList.value = res.data.list
  })
}

// 获取文章详情
const dialog = useDialog()
const handleGetDeatil = (item: any) => {
  switch (props.title) {
    case "文章":
      getHomeFindDetails({ id: item.id }).then((res: any) => {
        Object.assign(detailInfo, res.data)
        showDialogDetail.value = true
      })
      break
    case "放映室":
      // handleGetMovieList(index + 1)
      break
    case "工具箱":
      if (item.describe) {
        dialog.info({ title: item.name, content: item.describe, positiveText: "收到" })
      } else {
        window.open(`${item.url}`, `${item.name}`, "_black")
      }
      break

    default:
      break
  }
}

watch(
  () => props.title,
  (val) => {
    if (val) {
      currentIndex.value = 0
      isMenu.value = true
      isUpdate.value = false
      leftList.value = []
      rightList.value = []
      width.value = props.showAbout ? "70%" : "100%"
      switch (val) {
        case "文章":
          leftList.value = stateList
          handleGetArticleList("0")
          break
        case "图书馆":
          leftList.value = bookList
          handleGetBookList()
          break
        case "放映室":
          leftList.value = movieList
          handleGetMovieList(1)
          break
        case "代码文件":
          leftList.value = codeList
          break
        case "工具箱":
          leftList.value = toolList
          rightList.value = gameList
          break
        case "更新日志":
          leftList.value = []
          isMenu.value = false
          isUpdate.value = true
          width.value = props.showAbout ? "50%" : "100%"
          break

        default:
          break
      }
      if (leftList.value.length > 0) {
        currentTitle.value = leftList.value[0].label
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
    background-color: rgba(255, 255, 255, 0.2);
    overflow: hidden;
    z-index: 10;
    color: #fff;
    .item {
      @apply p-2  m-2 rounded-lg text-white cursor-pointer;
      transition: all 0.5s;
    }
    :hover {
      @apply bg-white;
      background-color: #5c5c5c66;
      overflow: hidden;
    }
    .check {
      @apply bg-white;
      background-color: #38383866;
      overflow: hidden;
    }
  }
  .right {
    @apply rounded-xl pt-5 pb-5 relative h-full;
    z-index: 10;
    color: #fff;
    .card {
      @apply w-full pl-3 flex flex-wrap overflow-auto;
      height: 89%;
      &-item {
        @apply m-2 rounded cursor-pointer h-44;
      }
      .card-item:hover {
        transition: all 0.4s;
        box-shadow: 0 0 20px 5px rgba(255, 166, 0, 0.719);
      }
    }
  }
  .mobile-left {
    @apply flex flex-wrap justify-center;
    &-item {
      @apply flex flex-col h-10 w-10 pl-1 pr-1 m-1  justify-center rounded cursor-pointer;
      background-color: rgba(255, 255, 255, 0.5);
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
.n-card.n-card--bordered {
  border: none;
}
.n-empty .n-empty__icon {
  color: #ec7c30;
}
.n-empty .n-empty__description {
  color: #ec7c30;
  font-size: 20px;
  font-weight: bold;
}
.n-button {
  background-color: #2080f0 !important;
}
</style>
