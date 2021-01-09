import {
  useRoute,
  useRouter,
  Router,
  RouteLocationNormalized
} from "vue-router";
import { useStore, Store } from "@/store";
import { notify } from "@/services/notify";

let router: Router;
let route: RouteLocationNormalized;
let store: Store;

export function init() {
  if (!router) router = useRouter();
  if (!route) route = useRoute();
  if (!store) store = useStore();
}

export async function login(credentials: Credentials) {
  store
    .dispatch("login", credentials)
    .then(_result => {
      const redirectUrl =
        (route.query.redirect as string | undefined) || "users";
      router.push(redirectUrl);
    })
    .catch(error => {
      console.error(error);
      notify.error(error.response.data.errors[0].message);
    });
}

export async function afterLogin(token: string) {
  store.commit("login", token);
  return store.dispatch("permissions", null);
}

interface Credentials {
  email: string;
  password: string;
}
