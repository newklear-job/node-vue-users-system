<template>
  <div class="create-form">
    <div class="form-group">
      <label for="email">Login</label>
      <input
        v-model="credentials.email"
        type="text"
        class="form-control"
        id="email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="credentials.password"
        class="form-control"
        id="password"
        required
      />
    </div>

    <div>
      <button class="btn btn-success" @click.prevent="login">
        {{ i18n.$t("login") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "@/i18n";

export default defineComponent({
  setup() {
    const store = useStore();

    const i18n = useI18n();

    const credentials = reactive({
      email: null,
      password: null
    });

    const router = useRouter();
    const route = useRoute();
    async function login() {
      store
        .dispatch("login", credentials)
        .then(_result => {
          const redirectUrl =
            (route.query.redirect as string | undefined) || "users";
          router.push(redirectUrl);
        })
        .catch(error => console.error(error));
    }

    return { credentials, login, i18n };
  }
});
</script>

<style>
.create-form {
  max-width: 300px;
  margin: auto;
}
</style>
