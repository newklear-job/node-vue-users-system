import { useStore } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { hasPermission } from "@/services/permissions";

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

const checkPermission = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const permission = to.meta.permission;
  if (permission && !hasPermission(permission)) {
    next(from.fullPath || "/");
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

export { checkAuth, setTitle, checkPermission };
