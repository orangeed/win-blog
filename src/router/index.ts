import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { routerMap } from "./routerMap"

export const basisRoutes: RouteRecordRaw[] = [
  {
    path: routerMap.HOME,
    name: routerMap.HOME,
    component: () => import("../views/home/index.vue")
  },
  {
    path: routerMap.SNAKE,
    name: routerMap.SNAKE,
    component: () => import("../views/snake/index.vue")
  },
  {
    path: "/404",
    component: () => import("../views/error-page/404.vue"),
    name: "404"
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: basisRoutes
})

export default router
