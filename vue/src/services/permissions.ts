import { useStore } from "@/store";

const store = useStore();
function hasPermission(permission: string): boolean {
  console.log(permission);
  if (store.getters.isLoggedIn) return true;
  return false;
}

export { hasPermission };
