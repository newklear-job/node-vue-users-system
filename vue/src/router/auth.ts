import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: { title: "Login" },
    component: () =>
      import(/* webpackChunkName: "create" */ "@/views/Authorization/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: { title: "Register" },
    component: () =>
      import(
        /* webpackChunkName: "create" */ "@/views/Authorization/Register.vue"
      )
  }
];

export default routes;
