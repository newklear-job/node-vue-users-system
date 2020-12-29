import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  token(state: State): string;
  isLoggedIn(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  token: state => state.token,
  isLoggedIn: state => !!state.token
};
