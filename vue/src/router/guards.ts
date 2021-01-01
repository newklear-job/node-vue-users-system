import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const store = useStore();

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.meta.requiresAuth === true && !store.getters.isLoggedIn) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else if (to.meta.requiresAuth === false && store.getters.isLoggedIn) {
    next("/");
  }
  next();
};

const setTitle = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  document.title = to.meta.title;
  next();
};

export { checkAuth, setTitle };
