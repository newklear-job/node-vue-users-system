import { MutationTree } from "vuex";
import { State } from "./state";

export type Mutations<S = State> = {
  login(state: S, token: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  login: (state, token) => {
    state.token = token;
  }
};
