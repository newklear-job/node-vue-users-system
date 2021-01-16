<template>
  <UserForm @formSubmit="create" :validation-errors="validationErrors">
    <template v-slot:controls>
      <div class="form-group">
        <a @click="$router.back()" class="btn btn-warning">Back</a>
        <button class="btn btn-success">Create</button>
      </div>
    </template>
  </UserForm>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from "vue";
import axios from "axios";
import { notify } from "@/services/notify";
import { formatValidationErrors } from "@/services/validation";
import { UserDataI } from "@/entities/userData";

export default defineComponent({
  components: {
    UserForm: defineAsyncComponent(() =>
      import(/* webpackChunkName: "user-form"*/ "@/components/Users/Form.vue")
    )
  },
  setup() {
    const validationErrors = ref({});

    function create(userData: UserDataI) {
      axios
        .post(`${process.env.VUE_APP_API_DOMAIN}/users/`, userData)
        .then(() => {
          validationErrors.value = {};
          userData.clear();
          notify.success("User created successfully!");
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
    return { create, validationErrors };
  }
});
</script>

<style scoped></style>
