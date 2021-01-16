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

export default defineComponent({
  components: {
    UserForm
  },
  setup() {
    const validationErrors = ref({});

    const route = useRoute();
    const userId = route.params.id;

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

    function getUser() {
      axios
        .get(`${process.env.VUE_APP_API_DOMAIN}/users/${userId}`)
        .then(response => {
          initialUserData.value.setValues(response.data);
          userRetrieved.value = true;
        })
        .catch(error => {
          console.error(error);
          notify.error("Unable to receive user's data");
        });
    }
    getUser();

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
