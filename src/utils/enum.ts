import { shallowRef } from "vue"
import { StateList } from "../types"
import { JsSquare, Vuejs, Python, MobileAlt, StickyNoteRegular, Airbnb, Innosoft, BabyCarriage, Book, Gamepad } from "@vicons/fa"
import { LocalMoviesSharp, MovieFilterFilled } from "@vicons/material"

// 文章分类
export const stateList: StateList[] = [
  {
    value: 0,
    label: "TS/JS",
    icon: shallowRef(JsSquare),
    color: "#efd81d"
  },
  {
    value: 1,
    label: "Vue",
    icon: shallowRef(Vuejs),
    color: "#42b883"
  },
  {
    value: 2,
    label: "Python",
    icon: shallowRef(Python),
    color: "#4483b5"
  },
  {
    value: 3,
    label: "移动端",
    icon: shallowRef(MobileAlt),
    color: "#4c1f24"
  },
  {
    value: 4,
    label: "其他",
    icon: shallowRef(StickyNoteRegular),
    color: "#773376"
  },
  {
    value: 5,
    label: "AI",
    icon: shallowRef(Airbnb),
    color: "#3df9e6"
  },
  {
    value: 6,
    label: "软件",
    icon: shallowRef(Innosoft),
    color: "#00a170"
  },
  {
    value: 7,
    label: "生活",
    icon: shallowRef(BabyCarriage),
    color: "#c21f30"
  }
]

// 桌面菜单
export const deskMenu: StateList[] = [
  {
    value: 0,
    label: "文章",
    // icon: "wenzhang"
    icon: "article.png"
  },
  {
    value: 1,
    label: "图书馆",
    // icon: "tushuguan"
    icon: "library.png"
  },
  {
    value: 2,
    label: "放映室",
    // icon: "film-line"
    icon: "movie.png"
  },
  {
    value: 3,
    label: "代码文件",
    // icon: "daimawenjian"
    icon: "code.png"
  },
  {
    value: 4,
    label: "工具箱",
    // icon: "gongjuxiang"
    icon: "tool.png"
  },
  {
    value: 5,
    label: "更新日志",
    // icon: "gengxinrizhi"
    icon: "log.png"
  }
]

// 缓存
export enum Stoage {
  BGIMG = "bgimg"
}

// 阅读
export const bookList: StateList[] = [
  {
    value: 0,
    label: "书籍",
    icon: shallowRef(Book),
    color: "#efd81d"
  }
]

// 放映室
export const movieList: StateList[] = [
  {
    value: 0,
    label: "电影",
    icon: shallowRef(LocalMoviesSharp),
    color: "#c8e6c9"
  },
  {
    value: 0,
    label: "电视剧",
    icon: shallowRef(MovieFilterFilled),
    color: "#fb923c"
  }
]

// 代码文件
export const codeList: StateList[] = [
  {
    value: 0,
    label: "TS/JS",
    icon: shallowRef(JsSquare),
    color: "#efd81d"
  },
  {
    value: 1,
    label: "Vue",
    icon: shallowRef(Vuejs),
    color: "#42b883"
  },
  {
    value: 2,
    label: "Python",
    icon: shallowRef(Python),
    color: "#4483b5"
  }
]

// 工具箱
export const toolList: StateList[] = [
  {
    value: 1,
    label: "小游戏",
    icon: shallowRef(Gamepad),
    color: "#2ec9ce"
  },
  {
    value: 0,
    label: "软件",
    icon: shallowRef(Innosoft),
    color: "#00a170"
  }
]

// 工具箱软件
export const softList: any[] = [
  {
    name: "autojs 4.1.1 去更新版",
    img: "https://s1.ax1x.com/2023/07/14/pC4bH7d.png",
    describe:
      "关注公众号【橘子的分享】，回复autojs获取下载链接。这个是最开始的免费版，取消了插件等几个功能，不然点击到了就会闪退。毕竟这个版本很久不维护了，但是能用。"
  },
  {
    name: "Internet Download Manager",
    img: "https://s1.ax1x.com/2023/07/14/pC4qo80.png",
    describe: "关注公众号【橘子的分享】，回复IDM获取下载链接。网页嗅探器，可以下载网页上识别到的媒体，比如视频或者照片等。"
  }
]

// 工具箱小游戏
export const gameList: any[] = [
  {
    name: "在线魔方",
    img: "/src/assets/img/cube.jpg",
    url: "https://www.orangecj.cn/cube/"
  },
  {
    name: "今天吃个啥",
    img: "/src/assets/img/eat.jpg",
    url: "https://www.orangecj.cn/eat/"
  }
]
