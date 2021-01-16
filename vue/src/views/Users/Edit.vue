<template>
  <UserForm
    v-if="userRetrieved"
    @formSubmit="update"
    :validation-errors="validationErrors"
    :initialUserData="initialUserData"
  >
    <template #controls>
      <div class="form-group">
        <a @click="$router.back()" class="btn btn-warning">Back</a>
        <button class="btn btn-success">Update</button>
      </div>
    </template>
  </UserForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UserForm from "@/components/Users/Form.vue";
import { UserData, UserDataI } from "@/entities/userData";
import axios from "axios";
import { useRoute } from "vue-router";
import { notify } from "@/services/notify";
import { formatValidationErrors } from "@/services/validation";
import { getUser } from "@/services/users";

export default defineComponent({
  components: {
    UserForm
  },
  setup() {
    const validationErrors = ref({});

    const route = useRoute();
    const userId = route.params.id as string;

    const initialUserData = ref(new UserData());
    const userRetrieved = ref(false);

    function update(userData: UserDataI) {
      axios
        .put(`${process.env.VUE_APP_API_DOMAIN}/users/${userId}`, userData)
        .then(response => {
          validationErrors.value = {};
          notify.success("User updated successfully");
          userData.setValues(response.data);
        })
        .catch(error => {
          validationErrors.value = {};
          console.error(error);
          notify.error("User was not updated");
          if (error.response.status === 422) {
            validationErrors.value = formatValidationErrors(
              error.response.data.errors
            );
          }
        });
    }

    getUser(userId)
      .then(userResponse => {
        initialUserData.value.setValues(userResponse);
        userRetrieved.value = true;
      })
      .catch(_error => {
        //
      });

    return { validationErrors, update, userRetrieved, initialUserData };
  }
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
