<template>
  <div class="create-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="text" class="form-control" id="email" required />
    </div>

    <div class="form-group">
      <label for="first_name">First name</label>
      <input class="form-control" id="first_name" required />
    </div>

    <div class="form-group">
      <label for="last_name">First name</label>
      <input class="form-control" id="last_name" required />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input class="form-control" id="password" required />
    </div>

    <div class="form-group">
      <label for="password_confirmation">Password</label>
      <input class="form-control" id="password_confirmation" required />
    </div>

    <div>
      <button class="btn btn-success">Register</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
