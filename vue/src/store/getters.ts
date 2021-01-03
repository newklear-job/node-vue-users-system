import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  token(state: State): string;
  isLoggedIn(state: State): boolean;
  permissions(state: State): Array<string>;
};

export const getters: GetterTree<State, State> & Getters = {
  token: state => state.token,
  isLoggedIn: state => !!state.token,
  permissions: state => state.permissions
};
