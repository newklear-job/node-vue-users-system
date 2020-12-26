<template>
  <div class="submit-form">
    <div class="form-group">
      <label>ID</label>
    </div>
    <div class="form-group">
      <label>Email</label>
    </div>
    <div class="form-group">
      <label>First name</label>
    </div>
    <div class="form-group">
      <label>Last name</label>
    </div>
    <div class="form-group">
      <label>Gender</label>
    </div>
    <div class="form-group">
      <label>Created at</label>
    </div>
    <div class="form-group">
      <label>Updated at</label>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserShow"
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
