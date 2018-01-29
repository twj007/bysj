
import main from '@/page/main.vue'
import blogMainPage from '@/page/blog/blogMainPage.vue'

export default {
  path: '/blog',
  component: main,
  children: [{
    path: 'getDetail',
    component: blogMainPage
  }]
}
