<template>
  <form @submit.prevent="register" class="register-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        v-model="userData.email"
        type="text"
        class="form-control"
        id="email"
        required
      />
      <p v-if="validationErrors.email" class="validation">
        {{ validationErrors.email }}
      </p>
    </div>

    <div class="form-group">
      <label for="first_name">First name</label>
      <input
        v-model="userData.first_name"
        class="form-control"
        id="first_name"
        required
      />
      <p v-if="validationErrors.first_name" class="validation">
        {{ validationErrors.first_name }}
      </p>
    </div>

    <div class="form-group">
      <label for="last_name">Last name</label>
      <input
        v-model="userData.last_name"
        class="form-control"
        id="last_name"
        required
      />
      <p v-if="validationErrors.last_name" class="validation">
        {{ validationErrors.last_name }}
      </p>
    </div>

    <div class="form-group">
      <label>Gender</label>
      <br />
      <label>
        <input
          v-model="userData.gender"
          type="radio"
          name="gender"
          value=""
        />Incognito
      </label>

      <label>
        <input
          v-model="userData.gender"
          type="radio"
          name="gender"
          value="m"
        />Male
      </label>

      <label>
        <input
          v-model="userData.gender"
          type="radio"
          name="gender"
          value="f"
        />Female
      </label>
      <p v-if="validationErrors.gender" class="validation">
        {{ validationErrors.gender }}
      </p>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="userData.password"
        type="password"
        class="form-control"
        id="password"
        required
      />
      <p v-if="validationErrors.password" class="validation">
        {{ validationErrors.password }}
      </p>
    </div>

    <div class="form-group">
      <label for="password_confirmation">Password</label>
      <input
        v-model="userData.password_confirmation"
        type="password"
        class="form-control"
        id="password_confirmation"
        required
      />
      <p v-if="validationErrors.password_confirmation" class="validation">
        {{ validationErrors.password_confirmation }}
      </p>
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-success">
        Register
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { notify } from "@/services/notify";
import { UserData } from "@/services/users";
import { formatValidationErrors } from "@/services/validation";
import { Auth } from "@/services/authorization";

export default defineComponent({
  setup() {
    const userData = reactive(new UserData());

    const validationErrors = ref({});

    function register() {
      axios
        .post(`${process.env.VUE_APP_API_DOMAIN}/register`, userData)
        .then(_response => {
          validationErrors.value = {};
          userData.clear();
          notify.success("User created successfully");
          Auth.afterLogin("testToken"); //todo: getToken here.
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

    return { userData, validationErrors, register };
  }
});
</script>

<style>
.register-form {
  max-width: 300px;
  margin: auto;
}

input[type="radio"] {
  margin-left: 10px;
}

.validation {
  color: red;
  font-size: 14px;
}
</style>
