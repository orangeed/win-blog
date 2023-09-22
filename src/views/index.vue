<!-- 桌面 -->
<template>
  <div id="desk">
    <img :src="img" />
  </div>
</template>

<script lang="ts" src="./index.ts" />
<style lang="scss" scoped>
#desk {
  height: 100vh;
  width: 100vw;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
