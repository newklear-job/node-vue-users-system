export const state = {
  token: localStorage.getItem("user-token") || "" //todo: unsecure, redo to cookies
};

export type State = typeof state;
