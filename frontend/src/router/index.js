import { createRouter, createWebHistory } from 'vue-router'
import testEvents from "../views/testEvents.vue"
import sendAboutUs from "../views/sendAboutUs.vue";
import News from "../views/News.vue";
import detailedPost from "../components/detailedPost.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "news",
      component: News,
    },
    /*{
      path: "/testEvents",
      name: "testEvents",
      component: testEvents
    },*/
    {
      path: "/sendAboutUs",
      name: "sendAboutUs",
      component: sendAboutUs
    },
    {
      path: "/postView:postid(.*)",
      name: "postView",
      component: detailedPost
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
