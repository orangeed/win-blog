import { getImg, getOneTips } from "../serve/index"
import { defineComponent, reactive, Ref, ref, toRefs } from "vue"
import { Stoage, deskMenu } from "../utils/enum"
import About from "../components/about/index.vue"
import Footer from "../components/footer/index.vue"
import { StateList, Tips } from "../types"
import { getAssetsImage } from "../utils"
import Dialog from "../components/dialog/index.vue"
import { setStorage } from "../utils/storage"

export default defineComponent({
  name: "Index",
  components: { About, Footer, Dialog },
  setup() {
    // 背景
    const img: Ref<string> = ref("")

    // 是否显示关于
    const showAbout: Ref<boolean> = ref(true)

    // 是否显示弹窗
    const showDialog: Ref<boolean> = ref(false)

    // 弹窗标题
    const title: Ref<string> = ref("")

    // 一言
    const tips: Tips = reactive({
      text: "",
      author: ""
    })

    // 获取背景
    const handleGetImg = () => {
      getImg().then((res: any) => {
        img.value = res.data
        setStorage(Stoage.BGIMG, img.value)
      })
    }
    handleGetImg()

    // 获取一言
    const handleGetOne = () => {
      getOneTips().then((res: any) => {
        console.log("res", res)
        Object.assign(tips, res.data)
      })
    }
    handleGetOne()

    // 打开菜单
    const handleOpenMenu = (item: StateList) => {
      console.log("item", item)
      showDialog.value = true
      title.value = item.label
    }

    // 关闭菜单
    const handleClose = () => {
      showDialog.value = false
    }

    // 获取弹窗右边的数据
    const handleGetRight = (item: any) => {
      console.log("获取弹窗右边的数据", item)
    }

    // 获取屏幕分辨率
    const handleGetWindow = () => {
      let width = window.innerWidth
      showAbout.value = width > 950
    }
    handleGetWindow()
    window.onresize = () => {
      handleGetWindow()
    }

    return {
      img,
      deskMenu,
      ...toRefs(tips),
      handleOpenMenu,
      showAbout,
      getAssetsImage,
      showDialog,
      handleClose,
      title,
      handleGetRight
    }
  }
})
