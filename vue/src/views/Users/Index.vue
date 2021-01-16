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
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ formatters.gender(user.gender) }}</td>
            <td>{{ formatters.dateTime(user.created_at) }}</td>
            <td>{{ formatters.dateTime(user.updated_at) }}</td>
            <td>
              <router-link :to="`/users/${user.id}`" class="badge badge-success"
                >Show</router-link
              >
              <router-link
                :to="`/users/${user.id}/edit`"
                class="badge badge-warning"
                >Edit</router-link
              >
              <button
                @click.prevent="deleteUser(user.id)"
                type="button"
                class="badge badge-danger"
              >
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
import { defineComponent, ref, onActivated } from "vue";
import axios from "axios";
import { useI18n } from "@/i18n";
import { useFormatters } from "@/services/formatters";

export default defineComponent({
  setup() {
    const i18n = useI18n();
    const formatters = useFormatters();

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

    function deleteUser(userId: number) {
      if (!confirm(i18n.$t("users.deleteConfirmation"))) {
        return;
      }
      axios
        .delete(`${process.env.VUE_APP_API_DOMAIN}/users/${userId}`)
        .then(_response => {
          getUsers();
        })
        .catch(error => {
          console.error(error);
        });
    }

    onActivated(() => {
      getUsers();
    });

    const pagination = {
      currentPage: 1,
      totalPages: 10,
      pageChangeHandler: function(selectedPage: number) {
        console.log(this);
        this.currentPage = selectedPage;
      }
    };

    return { users, deleteUser, formatters, pagination };
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
