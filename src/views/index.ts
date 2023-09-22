import { getImg } from "../serve/index"
import { defineComponent, Ref, ref } from "vue"
export default defineComponent({
  name: "Index",
  components: {},
  setup() {
    // 背景
    const img: Ref<string> = ref("")

    // 获取背景
    const handleGetImg = () => {
      getImg().then((res: any) => {
        img.value = res.data
      })
    }
    handleGetImg()
    return {
      img
    }
  }
})
