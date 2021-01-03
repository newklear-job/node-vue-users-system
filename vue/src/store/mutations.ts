import { MutationTree } from "vuex";
import { State } from "./state";
import { VueCookieNext } from "vue-cookie-next";

export type Mutations<S = State> = {
  login(state: S, token: string): void;
  permissions(state: S, permissions: Array<string>): void;
};

export const mutations: MutationTree<State> & Mutations = {
  login: (state, token) => {
    state.token = token;
    if (token) {
      VueCookieNext.setCookie("token", token);
    } else {
      VueCookieNext.removeCookie("token");
    }
  },
  permissions: (state, permissions) => {
    state.permissions = permissions;
  }
};
