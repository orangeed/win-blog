import { GetHomeArticleList, GetHomeFindDetails, GetMovie, GetMovieList, GetRead, GetReadList } from "../types"
import request from "../utils/request"

// bing图片
export const getImg = (): Promise<any> => request({ url: "/tools/img" })

// 一言
export const getOneTips = (): Promise<any> => request({ url: "/tools/one" })

export const getHomeArticleList = (params: GetHomeArticleList): Promise<any> =>
  request({ url: "/article/findActicle", method: "GET", params })

export const getHomeFindDetails = (params: GetHomeFindDetails): Promise<any> =>
  request({ url: "/article/findDetails", method: "GET", params })

export const getMovieList = (params: GetMovieList): Promise<any> => request({ url: "/movies/list", method: "GET", params })

export const getMovie = (params: GetMovie): Promise<any> => request({ url: `/movies/${params.id}`, method: "GET" })

export const getReadList = (params: GetReadList): Promise<any> => request({ url: "/read/list", method: "GET", params })

export const getRead = (params: GetRead): Promise<any> => request({ url: `/read/${params.id}`, method: "GET" })
