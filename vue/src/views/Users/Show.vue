<template>
  <div class="show-user">
    <table>
      <tr>
        <th>ID:</th>
        <td>{{ user.id }}</td>
      </tr>
      <tr>
        <th>Email:</th>
        <td>{{ user.email }}</td>
      </tr>
      <tr>
        <th>First name:</th>
        <td>{{ user.first_name }}</td>
      </tr>
      <tr>
        <th>Last name:</th>
        <td>{{ user.last_name }}</td>
      </tr>
      <tr>
        <th>Gender:</th>
        <td>{{ formatters.gender(user.gender) }}</td>
      </tr>
      <tr>
        <th>Created at:</th>
        <td>{{ formatters.dateTime(user.created_at) }}</td>
      </tr>
      <tr>
        <th>Updated at:</th>
        <td>{{ formatters.dateTime(user.updated_at) }}</td>
      </tr>
    </table>

    <div class="form-group">
      <a @click="$router.back()" class="btn btn-warning">Back</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useFormatters } from "@/services/formatters";
import { getUser } from "@/services/users";
export default defineComponent({
  name: "UserShow",
  setup() {
    const formatters = useFormatters();

    const user = ref({});

    const route = useRoute();
    const userId = route.params.id as string;

    getUser(userId)
      .then(userResponse => {
        user.value = userResponse;
      })
      .catch(_error => {
        //
      });

    return { formatters, user };
  }
});
</script>

<style>
.show-user {
  max-width: fit-content;
  margin: auto;
}

table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
</style>
