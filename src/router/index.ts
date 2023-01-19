import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'top',
    component: async () => {
      const top = await import('@/pages/index.vue')
      return top
    },
  },
  {
    path: '/me',
    name: 'me',
    component: async () => {
      const me = await import('@/pages/me/index.vue')
      return me
    },
  },
  {
    path: '/slide/:id',
    name: 'slide',
    component: async () => {
      const slide = await import('@/pages/slide/index.vue')
      return slide
    },
  },
  {
    path: '/slide/share/:share_id',
    name: 'share slide',
    component: async () => {
      const share_slide = await import('@/pages/slide/share.vue')
      return share_slide
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: async () => {
      const not_found = await import('@/pages/404.vue')
      return not_found
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
