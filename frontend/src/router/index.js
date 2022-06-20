import { createRouter, createWebHistory } from 'vue-router'
import testEvents from "../views/testEvents.vue"
import sendAboutUs from "../views/SendAboutUs.vue";
import News from "../views/News.vue";
import postView from "../views/PostView.vue";
import UserPostView from "../views/UserPostView.vue";
import BlackBoard from "../views/BlackBoard.vue";
import OwnPosts from "../views/OwnPosts.vue"
import savedPosts from "../views/savedPosts.vue"
import NewPost from "../views/NewPost.vue"

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
      name: "BlackBoard",
      component: BlackBoard
    },
    {
      path: "/postView:postid(.*)",
      name: "PostView",
      component: postView
    },
    {
      path: "/userPostView:postid(.*)",
      name: "UserPostView",
      component: UserPostView
    },
    {
      path: "/meinePosts",
      name: "OwnPosts",
      component: OwnPosts
    },
    {
    path: "/vermerktePosts",
    name: "savedPosts",
    component: savedPosts
    },
    {
    path: "/neuerPost",
    name: "NewPost",
    component: NewPost
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
