<template>
  <UserForm @formSubmit="register" :validation-errors="validationErrors">
    <template v-slot:controls>
      <div class="form-group">
        <button type="submit" class="btn btn-success">
          Register
        </button>
      </div>
    </template>
  </UserForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { notify } from "@/services/notify";
import { formatValidationErrors } from "@/services/validation";
import { Auth } from "@/services/authorization";
import { useRouter } from "vue-router";
import UserForm from "@/components/Users/Form.vue";
import { UserDataI } from "@/services/users";

export default defineComponent({
  components: { UserForm },
  setup() {
    const router = useRouter();

    const validationErrors = ref({});

    function register(userData: UserDataI) {
      axios
        .post(`${process.env.VUE_APP_API_DOMAIN}/register`, userData)
        .then(async response => {
          validationErrors.value = {};
          userData.clear();
          notify.success("User created successfully");
          const token = `${response.data.type} ${response.data.token}`;
          await Auth.afterLogin(token);
          router.push("users");
        })
        .catch(error => {
          validationErrors.value = {};
          console.error(error);
          notify.error("User was not created!");
          if (error.response.status === 422) {
            validationErrors.value = formatValidationErrors(
              error.response.data.errors
            );
          }
        });
    }

    return { register, validationErrors };
  }
});
</script>

<style scoped></style>
