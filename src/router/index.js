import main from '@/page/main.vue'
import userMainPage from '@/page/user/userMainPage.vue'
import login from '@/router/login.js'
import register from '@/router/register.js'
import blog from '@/router/blog.js'

const routes = [
  {
    path: '/',
    component: main,
    children: [{
      path: '',
      component: userMainPage
    }]
  },
  login,
  register,
  blog
]

export default routes
