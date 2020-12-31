import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const store = useStore();

const ifNotLoggedIn = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!store.getters.isLoggedIn) {
    next();
    return;
  }
  next("/");
};

const ifLoggedIn = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (store.getters.isLoggedIn) {
    next();
    return;
  }
  next({
    path: "/login",
    query: { redirect: to.fullPath }
  });
};

export { ifLoggedIn, ifNotLoggedIn };
