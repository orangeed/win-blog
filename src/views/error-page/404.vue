<template>
  <div class="error-404">
    <img src="../../assets/img/noKnow.jpeg" class="w-full h-full"/>
    <div>
      <p>你这是来到了知识的荒漠哇！！！</p>
      <n-button type="primary" class="mt-3" @click="handleGoHome">我要回家</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { routerMap } from "../../router/routerMap"

const router = useRouter()
const handleGoHome = () => {
  router.replace(routerMap.HOME)
}
</script>

<style lang="scss" scoped>
.error-404 {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    position: absolute;
    text-align: center;
  }
  p {
    font-size: 20px;
    color: #fff;
  }
}
</style>
