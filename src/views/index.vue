<!-- 桌面 -->
<template>
  <div id="desk">
    <!-- 背景 -->
    <img :src="img" class="img" />
    <!-- 桌面菜单 -->
    <div class="menu flex flex-col flex-wrap">
      <div v-for="(item, index) in deskMenu" :key="index" class="menu-item" @click="handleOpenMenu(item)">
        <!-- <SVG :name="item.icon" :width="40" :height="40"></SVG> -->
        <img :src="getAssetsImage(item.icon)" class="icon" />
        <span class="text-sm">{{ item.label }}</span>
      </div>
    </div>
    <!-- 关于 -->
    <div class="about" v-if="showAbout">
      <About />
    </div>
    <!-- 备案信息 -->
    <div class="footer">
      <Footer />
    </div>
    <!-- tips -->
    <div class="tips">
      <p>{{ text }}</p>
      <p class="text-right">--{{ author }}</p>
    </div>
    <!-- 弹窗 -->
    <Dialog
      :showDialog="showDialog"
      :title="title"
      :img="img"
      :showAbout="showAbout"
      @CLOSE="handleClose"
      @LEFTINDEX="handleGetRight"
    ></Dialog>
  </div>
</template>

<script lang="ts" src="./index.ts" />
<style lang="scss" scoped>
#desk {
  height: 100vh;
  width: 100vw;
  position: relative;
  .img {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .menu {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100px;
    padding: 20px;
    :hover {
      background-color: rgba(209, 209, 209, 0.4);
      transition: all 0.5s;
    }
    .icon {
      height: 40px;
      margin-bottom: 5px;
    }
    &-item {
      border-radius: 20px;
      height: 100px;
      width: 100px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      :hover {
        background-color: transparent;
        transition: all 0.5s;
      }
    }
  }
  .about {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    width: 300px;
    background-color: rgba(209, 209, 209, 0.4);
    border-radius: 20px;
  }
  .footer {
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .tips {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
}
</style>
