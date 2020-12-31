import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import axios from "axios";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  login(
    { commit }: AugmentedActionContext,
    credentials: object
  ): Promise<object>;
  logout({ commit }: AugmentedActionContext, payload: null): Promise<object>;
}

export const actions: ActionTree<State, State> & Actions = {
  login({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      axios
        .post(`${process.env.VUE_APP_API_DOMAIN}/login`, credentials)
        .then(response => {
          const token = `${response.data.type} ${response.data.token}`;
          commit("login", token);
          resolve(response);
        })
        .catch(err => {
          commit("login", ""); // clear token from state
          reject(err);
        });
    });
  },

  logout({ commit }) {
    return new Promise(resolve => {
      commit("login", ""); // clear token from state
      resolve();
    });
  }
};