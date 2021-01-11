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
      <button class="btn btn-success" @click.prevent="auth.login(credentials)">
        {{ i18n.$t("system.login") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useI18n } from "@/i18n";
import { Auth } from "@/services/authorization";

export default defineComponent({
  setup() {
    const i18n = useI18n();
    const auth = new Auth();

    const credentials = reactive({
      email: null,
      password: null
    });

    return { credentials, auth, i18n };
  }
});
</script>

<style>
.create-form {
  max-width: 300px;
  margin: auto;
}
</style>
