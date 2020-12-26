<template>
  <div class="form-group">
    <label for="title">Email</label>
    <input type="text" class="form-control" id="title" required />
  </div>

  <div class="form-group">
    <label for="author">First name</label>
    <input class="form-control" id="author" required />
  </div>

  <div class="form-group">
    <label for="content">Last name</label>
    <textarea class="form-control" id="content" required rows="6" cols="50" />
  </div>

  <div class="form-group">
    <label for="publishedAt">Gender</label>
    <input class="form-control" id="publishedAt" required />
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

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
