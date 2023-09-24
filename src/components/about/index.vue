<!--  -->
<template>
  <div class="index text-white">
    <div class="nomal-box">
      <div class="index-box">
        <div class="flex-1 about-me text-center m-4">
          <n-image :src="getAssetsImage('header.jpg')" :width="100" class="round-xl" />
          <p class="text-xl">橘子</p>
          <p class="text-left p-4">菜鸡小前端（努力全栈中）一个，本科毕业。这里的文章主要是记录工作、学习以及生活。还有个公众号：【橘子的分享】</p>
          <div class="flex justify-center text-gray-500">
            <n-icon
              :component="Zhihu"
              size="40"
              class="bg-gray-100 rounded-xl flex justify-center items-center cursor-pointer w-14 h-14 mr-4"
              @click.stop="handleGoto('zhihu')"
            />
            <n-tooltip trigger="hover" placement="bottom">
              <template #trigger>
                <n-icon
                  :component="Weixin"
                  size="40"
                  class="bg-gray-100 rounded-xl flex justify-center items-center cursor-pointer w-14 h-14 mr-4"
                  @click.stop="handleGoto('weixin')"
                />
              </template>
              <img :src="getAssetsImage('weixin.jpg')" />
            </n-tooltip>
            <n-icon
              :component="Github"
              size="40"
              class="bg-gray-100 rounded-xl flex justify-center items-center cursor-pointer w-14 h-14"
              @click.stop="handleGoto('git')"
            />
          </div>
          <div class="text-center">
            <p class="mt-4">
              <span id="busuanzi_container_site_pv" class="block"
                >本站访问量：<span id="busuanzi_value_site_pv" class="font-bold text-lg text-orange-400"></span> 次</span
              >
            </p>
            <p class="mt-4 mb-4">
              <span id="busuanzi_container_site_uv" class="block"
                >本站访客数：<span id="busuanzi_value_site_uv" class="font-bold text-lg text-orange-400"></span> 人</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Zhihu, Weixin, Github } from "@vicons/fa"
import { getAssetsImage } from "../../utils"
// import { emitter } from "../utils/mitt"
// import Three from "~~/components/three.vue"
// import Article from "~~/components/article.vue"

// 跳转至网站
const handleGoto = (val: string) => {
  switch (val) {
    case "zhihu":
      window.open("https://www.zhihu.com/people/bu-qi-64-11")
      break
    case "weixin":
      break

    case "git":
      window.open("https://github.com/orangeed")
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.index {
  .about-me {
    .n-image > img {
      width: 132px;
      height: 132px;
      border-radius: 9999px;
    }
  }
  .nomal-box {
    position: relative;
    overflow: hidden;
    transition: all 1s;
  }
}
#busuanzi_container_site_pv {
  display: block !important;
}
#busuanzi_container_site_uv {
  display: block !important;
}
:deep(.n-image img) {
  border-radius: 9999px !important;
}
</style>
