<template>
  <div class="create-form">
    <div class="form-group">
      <label for="email">Login</label>
      <input type="text" class="form-control" id="email" required />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input class="form-control" id="password" required />
    </div>

    <div>
      <button class="btn btn-success">Login</button>
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
