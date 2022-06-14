import { createRouter, createWebHistory } from 'vue-router'
import testEvents from "../views/testEvents.vue"
import sendAboutUs from "../views/SendAboutUs.vue";
import News from "../views/News.vue";
import postView from "../views/PostView.vue";
import UserPostView from "../views/UserPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "News",
      component: News,
    },
    /*{
      path: "/testEvents",
      name: "testEvents",
      component: testEvents
    },*/
    {
      path: "/sendAboutUs",
      name: "SendAboutUs",
      component: sendAboutUs
    },
    {
      path: "/schwarzesBrett",
      name: "schwarzesBrett",
      component: UserPostView
    },
    {
      path: "/postView:postid(.*)",
      name: "PostView",
      component: postView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
