import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/Blog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog
    }
  ]
})
