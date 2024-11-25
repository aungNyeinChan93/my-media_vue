import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestView from "@/views/TestView.vue";
import PostDetailView from "@/views/PostDetailView.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutAction from "@/views/LogoutAction.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
  {
    path: "/postDetail/:id",
    name: "postDetail",
    component: PostDetailView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logoutAction",
    component: LogoutAction,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
