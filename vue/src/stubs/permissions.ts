import { useStore } from "@/store";

const guestPermissions = ["login", "register", "users.index"];
const authenticatedPermissions = [
  "users.index",
  "users.show",
  "users.create",
  "users.update",
  "users.delete",
  "logout"
];

function getPermissions() {
  const store = useStore();
  return new Promise<Array<string>>(function(resolve, _reject) {
    setTimeout(() => {
      const permissions = store.getters.isLoggedIn
        ? authenticatedPermissions
        : guestPermissions;
      resolve(permissions);
    }, 100);
  });
}

export { getPermissions };
