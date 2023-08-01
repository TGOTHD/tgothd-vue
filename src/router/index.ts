import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManageView from '../views/ManageView.vue'
import UserView from '../views/UserView.vue'
import AddUser from '../views/AddUser.vue'
import UpdateUser from '../views/UpdateUser.vue'

const routes = [
  {
    show: true,
    path: '/',
    name: '用户管理',
    component: ManageView,
    redirect: "/user",
    children: [
      {
        path: '/user',
        name: '用户列表',
        component: UserView
      },
      {
        path: '/addUser',
        name: '添加用户',
        component: AddUser
      }
    ]
  },
  {
    show: false,
    path: '/updateUser',
    component: UpdateUser
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
