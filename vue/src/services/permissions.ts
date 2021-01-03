import { useStore } from "@/store";

const store = useStore();
function hasPermission(permission: string): boolean {
  return store.getters.permissions.includes(permission);
}

export { hasPermission };
