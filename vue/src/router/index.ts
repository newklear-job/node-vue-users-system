import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import authRoutes from "./auth";
import usersRoutes from "./users";

const routes: Array<RouteRecordRaw> = [...authRoutes, ...usersRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
