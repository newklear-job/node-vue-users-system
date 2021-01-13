import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Authorization/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "Register",
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "register" */ "@/views/Authorization/Register.vue"
      )
  }
];

export default routes;
