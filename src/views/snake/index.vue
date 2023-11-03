<!-- 贪吃蛇 -->
<template>
  <div id="snake">
    <div class="flex justify-center items-center flex-col">
      <p class="mt-6 text-orange-600 font-bold text-lg text-center w-full">
        <span>历史分数：{{ historyScore }}</span>
        <span id="scoreRef" class="ml-10">得分: 0</span>
      </p>
      <div class="flex mt-6 mb-6">
        <n-space>
          <n-button style="background-color: #36ad6a" @click="handleBegin">开始</n-button>
          <n-button style="background-color: #36ad6a" @click="handleRestart">重新开始</n-button>
          <n-button style="background-color: #de586e" @click="handlePause">暂停</n-button>
          <n-button style="background-color: #4098fc" @click="handleContinue">继续</n-button>
        </n-space>
      </div>
    </div>
    <div class="flex justify-center items-center w-full">
      <div class="flex-1 flex justify-center">
        <img src="../../assets/img/snake.jpg" class="w-64" />
      </div>
      <canvas id="snakeRef" width="1080" height="800"></canvas>
      <div class="flex-1 tips">
        <p>1.键盘方向键【上】对应往上走</p>
        <p>2.键盘方向键【下】对应往下走</p>
        <p>3.键盘方向键【左】对应往左走</p>
        <p>4.键盘方向键【右】对应往右走</p>
        <p>5.鼠标放在画布上，【空格】可以暂停，继续</p>
        <p>6.每吃一个食物，得【10分】</p>
        <p>7.当你撞到了自己或者撞到了边界，则判断为【游戏结束】</p>
      </div>
    </div>
    <div class="over" v-if="isOver">
      <div class="over-inner">
        <p class="text-7xl text-red-500">Game Over!</p>
        <p class="text-5xl text-red-500 mt-12">游戏结束！</p>
        <p class="mt-12">
          <n-button style="background-color: #36ad6a" class="w-96 h-20 text-3xl" @click="handleBegin">开始</n-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue"
import { getStorage, setStorage } from "../../utils/storage"
import { Stoage } from "../../utils/enum"
const historyScore: Ref<number | string> = ref(0)
const isOver: Ref<boolean> = ref(false)
let canvas: HTMLCanvasElement,
  ctx: any,
  scoreRef: HTMLElement,
  grid: any,
  maxX: number = 108, // 最大行
  maxY: number = 80, // 最大列
  itemWidth: number = 10, // 每个点的大小
  direction: string = "right", // up down right left 方向
  speed: number = 150, // ms 速度
  isStop: boolean = false, // 是否暂停
  isStart: boolean = false, // 是否开始
  score: number = 0, // 分数
  timer: any, // 移动定时器
  j: number = 1,
  canChange: boolean = true,
  snake: number[][],
  food: any

// 开始
const handleBegin = () => {
  console.log("isStart", isStart)
  if (!isStart) {
    if (timer) {
      clearTimeout(timer)
    }
    if (!isStart) {
      isStart = true
    }
    score = -10
    speed = 150
    isStop = false
    isOver.value = false
    direction = "right"
    handleCreateSnake()
    handleCreateFood()
    handleDraw()
    handleMove()
    historyScore.value = getStorage(Stoage.SCORE) || 0
  } else {
    handleContinue()
  }
}

// 创建蛇主体
const handleCreateSnake = () => {
  snake = [
    [4, 25],
    [3, 25],
    [2, 25],
    [1, 25],
    [0, 25]
  ]
}

// 移动
const handleMove = () => {
  if (isStop) return
  let [x, y] = snake[0]
  switch (direction) {
    case "left":
      x--
      break
    case "right":
      x++
      break
    case "up":
      y--
      break
    case "down":
      y++
      break
  }

  // 如果下一步不是食物的位置
  if (x !== food[0] || y !== food[1]) {
    snake.pop()
  } else {
    handleCreateFood()
  }

  if (handleOver([x, y])) {
    isOver.value = true
    isStart = false
    setStorage(Stoage.SCORE, score)
    return
  }
  if (handleCompleted()) {
    return
  }

  snake.unshift([x, y])

  handleDraw()
  canChange = true
  timer = setTimeout(() => handleMove(), speed)
}

// 暂停
const handlePause = () => {
  if (isStop || !isStart) return
  if (isOver.value) return
  isStop = true
}

// 继续
const handleContinue = () => {
  if (!isStop || !isStart) return
  if (isOver.value) return
  isStop = false
  handleMove()
}

// 键盘按键
const handleGetDirection = () => {
  // 上38 下40 左37 右39 不能往相反的方向走
  document.onkeydown = (e) => {
    // 在贪吃蛇移动的间隔内不能连续改变两次方向
    if (!canChange) return
    switch (e.keyCode) {
      case 37:
        if (direction !== "right") {
          direction = "left"
          canChange = false
        }
        break
      case 38:
        if (direction !== "down") {
          direction = "up"
          canChange = false
        }
        break
      case 39:
        if (direction !== "left") {
          direction = "right"
          canChange = false
        }
        break
      case 40:
        if (direction !== "up") {
          direction = "down"
          canChange = false
        }
        break
      case 32:
        // 空格暂停与继续
        if (!isStop) {
          stop()
        } else {
          handleContinue()
        }
        break
    }
  }
}

const handleCreatePos = (): any => {
  let [x, y] = grid[(Math.random() * grid.length) | 0]

  for (let i = 0; i < snake.length; i++) {
    if (snake[i][0] == x && snake[i][1] == y) {
      return handleCreatePos()
    }
  }

  return [x, y]
}
// 生成食物
const handleCreateFood = () => {
  food = handleCreatePos()

  // 更新分数
  scoreRef.innerHTML = `得分: ${(score += 10)}分`

  if (speed > 50) {
    speed--
  }
}

// 结束
// @ts-ignore
const handleOver = ([x, y]) => {
  if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
    return true
  }

  if (snake.some((v: any) => v[0] === x && v[1] === y)) {
    return true
  }
}

// 完成
const handleCompleted = () => {
  if (snake.length == maxX * maxY) {
    return true
  }
}

// 网格线
// const handleDrawGridLine = () => {
//   for (let i = 1; i < maxY; i++) {
//     ctx.moveTo(0, i * itemWidth)
//     ctx.lineTo(canvas.width, i * itemWidth)
//   }

//   for (let i = 1; i < maxX; i++) {
//     ctx.moveTo(i * itemWidth, 0)
//     ctx.lineTo(i * itemWidth, canvas.height)
//   }

//   ctx.lineWidth = 1
//   ctx.strokeStyle = "#ccc9c9"
//   ctx.stroke()
// }

// 绘制
const handleDraw = () => {
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // handleDrawGridLine()

  ctx.fillStyle = "green"
  ctx.fillRect(food[0] * itemWidth + j, food[1] * itemWidth + j, itemWidth - j * 2, itemWidth - +j * 2)
  j ^= 1

  ctx.fillStyle = "red"
  ctx.fillRect(snake[0][0] * itemWidth + 0.5, snake[0][1] * itemWidth + 0.5, itemWidth - 1, itemWidth - 1)
  ctx.fillStyle = "pink"
  for (let i = 1; i < snake.length; i++) {
    ctx.fillRect(snake[i][0] * itemWidth + 0.5, snake[i][1] * itemWidth + 0.5, itemWidth - 1, itemWidth - 1)
  }
}

// 重新开始
const handleRestart = () => {
  if (!isStart) return
  handleBegin()
}

onMounted(() => {
  canvas = document.getElementById("snakeRef") as HTMLCanvasElement
  ctx = canvas.getContext("2d")
  scoreRef = document.getElementById("scoreRef") as HTMLElement
  canvas.style.border = '1px solid #ccc'

  grid = new Array()
  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      grid.push([i, j])
    }
  }

  // handleDrawGridLine()
  handleGetDirection()
  historyScore.value = getStorage(Stoage.SCORE) || 0
})
</script>

<style lang="scss" scoped>
#snake {
  height: 100vh;
  #snake {
    border: 1px solid #000;
    width: 640px;
    height: 400px;
    display: inline-block;
    z-index: 99;
    background-color: rgba(0, 0, 0, 1);
  }
  #mask {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: block;
    color: #fff;
    line-height: 400px;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
  }
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    background-color: none !important;
    color: #fff;
  }
  .over {
    @apply absolute w-full h-full  bg-white top-0 left-0 flex justify-center items-center;
    background-color: rgba(63, 63, 63, 0.6);
    &-inner {
      @apply bg-white rounded-lg flex flex-col items-center justify-center;
      width: 1080px;
      height: 800px;
    }
  }

  .tips {
    p {
      @apply pl-2;
      line-height: 30px;
    }
  }
}
</style>
