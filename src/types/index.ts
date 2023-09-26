export interface StateList {
  value: number
  label: string
  icon?: any
  color?: string
}

export interface Tips {
  text: string
  author: string
}

export interface GetHomeArticleList {
  pageNum: number
  pageSize: number
  title?: string
  tag?: string
}

export interface GetHomeFindDetails {
  id: any
}

export interface GetMovieList {
  pageSize: number
  pageNum: number
  type?: number // 0为电视剧 1为电影 不传是所有的
  name?: string
}

export interface GetMovie {
  id: string
}

export interface GetReadList {
  pageSize: number
  pageNum: number
  name?: string
}

export interface GetRead {
  id: string
}
