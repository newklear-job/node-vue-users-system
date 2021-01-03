import { ActionTree, ActionContext } from "vuex";
import { State } from "@/store/state";
import { Mutations } from "@/store/mutations";
import { getPermissions } from "@/stubs/permissions";
import axios from "axios";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  login(
    { commit, dispatch }: AugmentedActionContext,
    credentials: object
  ): Promise<void>;
  logout({ commit, dispatch }: AugmentedActionContext, payload: null): void;
  permissions({ commit }: AugmentedActionContext, payload: null): void;
}

export const actions: ActionTree<State, State> & Actions = {
  login({ commit, dispatch }, credentials) {
    return axios
      .post(`${process.env.VUE_APP_API_DOMAIN}/login`, credentials)
      .then(async response => {
        const token = `${response.data.type} ${response.data.token}`;
        commit("login", token);
        await dispatch("permissions", null);
      })
      .catch(error => {
        commit("login", ""); // clear token from state
        throw error;
      });
  },

  async logout({ commit, dispatch }) {
    commit("login", ""); // clear token from state
    await dispatch("permissions", null);
  },

  async permissions({ commit }) {
    const permissions = await getPermissions();
    commit("permissions", permissions);
  }
};
