import { RouteRecordRaw } from "vue-router";
import { ifNotLoggedIn } from "./guards";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: { title: "Login" },
    component: () =>
      import(
        /* webpackChunkName: "create" */ "@/views/Authorization/Login.vue"
      ),
    beforeEnter: ifNotLoggedIn
  },
  {
    path: "/register",
    name: "Register",
    meta: { title: "Register" },
    component: () =>
      import(
        /* webpackChunkName: "create" */ "@/views/Authorization/Register.vue"
      ),
    beforeEnter: ifNotLoggedIn
  }
];

export default routes;
