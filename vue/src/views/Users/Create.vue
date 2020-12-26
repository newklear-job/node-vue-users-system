<template>
  <div class="create-form">
    <UserForm></UserForm>
    <div>
      <router-link to="/users" class="btn btn-warning">Back</router-link>
      <button class="btn btn-success">Create</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserForm from "@/components/Users/Form.vue";

export default defineComponent({
  components: {
    UserForm
  },
  setup() {
    return {};
  }
});
</script>

<style>
.create-form {
  max-width: 300px;
  margin: auto;
}
</style>
