import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import authRoutes from "@/router/auth";
import usersRoutes from "@/router/users";
import { setTitle, checkAuth } from "@/router/guards";

const routes: Array<RouteRecordRaw> = [...authRoutes, ...usersRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(setTitle);
router.beforeEach(checkAuth);

export default router;
