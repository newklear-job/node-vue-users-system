<template>
  <div class="list row">
    <div class="col-md-10">
      <h4>Users List</h4>
      <router-link to="/users/create" class="btn btn-warning"
        >Create user</router-link
      >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Gender</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Controls</th>
          </tr>
          <tr>
            <th>
              <label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Search by id"
              /></label>
            </th>
            <th>
              <label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Search by email"
              /></label>
            </th>
            <th>
              <label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Search by first name"
              /></label>
            </th>
            <th>
              <label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Search by last name"
              /></label>
            </th>
            <th>
              <label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Search by gender"
              /></label>
            </th>
            <th>
              <label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Search by create at"
              /></label>
            </th>
            <th>
              <label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Search by updated at"
              /></label>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Email</td>
            <td>First name</td>
            <td>Last name</td>
            <td>Gender</td>
            <td>Created at</td>
            <td>Updated at</td>
            <td>
              <router-link :to="`/users/1`" class="badge badge-success"
                >Show</router-link
              >
              <router-link :to="`/users/1/edit`" class="badge badge-warning"
                >Edit</router-link
              >
              <button type="button" class="badge badge-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const users = ref([]);
    function getUsers() {
      axios
        .get(`${process.env.VUE_APP_API_DOMAIN}/users`)
        .then(response => {
          users.value = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
    getUsers();
    return { users };
  }
});
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

table {
  margin: 0 auto; /* or margin: 0 auto 0 auto */
}
</style>
