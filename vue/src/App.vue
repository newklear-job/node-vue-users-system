<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <!--    todo: hide links based on meta data for unauthorised users-->
    <router-link
      v-if="hasPermission('users.index')"
      to="/users"
      class="navbar-brand"
      >Users list</router-link
    >
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link
          v-if="hasPermission('users.create')"
          to="/users/create"
          class="nav-link"
          >Create user</router-link
        >
      </li>
    </ul>
    <ul class="navbar-nav mr-right">
      <li class="nav-item">
        <a @click.prevent="switchLanguage" class="nav-link"
          >Switch language({{ i18n.locale.value }})</a
        >
      </li>
      <li v-if="hasPermission('logout')" class="nav-item">
        <a @click.prevent="logout" class="nav-link">Logout</a>
      </li>
      <li v-if="hasPermission('login')" class="nav-item">
        <router-link to="/login" class="nav-link">Login</router-link>
      </li>
      <li v-if="hasPermission('register')" class="nav-item">
        <router-link to="/register" class="nav-link">Register</router-link>
      </li>
    </ul>
  </nav>

  <div class="container mt-3">
    <router-view v-slot="slotProps">
      <keep-alive max="5">
        <component :is="slotProps.Component" :key="$route.path"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { hasPermission } from "@/services/permissions";
import { useFormatters } from "@/services/formatters";
import { initI18n } from "@/i18n";

export default defineComponent({
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    store.dispatch("permissions", null);

    const i18n = initI18n({
      locale: "ua"
    });

    const router = useRouter();
    const route = useRoute();

    async function logout() {
      await store.dispatch("logout", null);
      if (route.meta.requiresAuth) {
        await router.push({
          path: "/login",
          query: { redirect: route.fullPath }
        });
      }
      if (route.meta.permission && !hasPermission(route.meta.permission)) {
        router.push({ path: "/" });
      }
    }

    const switchLanguage = () => {
      const locale = i18n.locale.value === "en" ? "ua" : "en";
      i18n.locale.value = locale;
    };

    const formatters = useFormatters();
    console.log(formatters.gender("m"));
    return { isLoggedIn, logout, hasPermission, switchLanguage, i18n };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
