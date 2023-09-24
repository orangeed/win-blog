import request from "../utils/request"

// bing图片
export const getImg = (): Promise<any> => request({ url: "/tools/img" })

// 一言
export const getOneTips = (): Promise<any> => request({ url: "/tools/one" })
