// 获取图片
export const getAssetsImage = (name?: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href
}
 