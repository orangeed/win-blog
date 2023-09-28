<template>
  <footer class="mt-16 h-24 flex flex-col justify-center items-center text-white font-bold">
    <slot />
    <p class="cursor-pointer text-hover" @click.stop="handleToGov">蜀ICP备2022021714号-1</p>
    <p>Copyright © 2022-2023 by orange</p>
  </footer>
</template>

<script lang="ts" setup>
const handleToGov = () => {
  window.open("https://beian.miit.gov.cn/", "_black")
}
</script>

<style scoped lang="scss">
footer {
  @apply text-sm;
}

.text-hover {
  transition: all 0.5s;
}

.text-hover:hover {
  color: orange;
}
</style>
