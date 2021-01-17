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

      <div class="pagination float-right">
        <pagination
          v-model="pagination.current_page"
          :records="pagination.total"
          :per-page="pagination.per_page"
          @paginate="pagination.pageChangeHandler"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated, reactive } from "vue";
import axios from "axios";
import { useI18n } from "@/i18n";
import { useFormatters } from "@/services/formatters";
// @ts-ignore
import Pagination from "v-pagination-3";
import { useRouter, useRoute } from "vue-router";
import { notify } from "@/services/notify";

export default defineComponent({
  components: {
    Pagination
  },
  setup() {
    const i18n = useI18n();
    const formatters = useFormatters();
    const router = useRouter();
    const route = useRoute();

    const users = ref([]);

    const pagination = reactive({
      current_page: route.query.page ? parseInt(route.query.page as string) : 1,
      total: 0,
      per_page: 0,
      pageChangeHandler: async function(selectedPage: number) {
        pagination.current_page = selectedPage;
        await router.push({ query: { page: pagination.current_page } });
        getUsers();
      }
    });

    function getUsers() {
      axios
        .get(`${process.env.VUE_APP_API_DOMAIN}/users`, {
          params: route.query
        })
        .then(response => {
          users.value = response.data.data;
          pagination.current_page = response.data.meta.current_page;
          pagination.per_page = response.data.meta.per_page;
          pagination.total = response.data.meta.total;
        })
        .catch(error => {
          console.error(error);
          notify.error("Could not get users!");
        });
    }

    function deleteUser(userId: number) {
      if (!confirm(i18n.$t("users.deleteConfirmation"))) {
        return;
      }
      axios
        .delete(`${process.env.VUE_APP_API_DOMAIN}/users/${userId}`)
        .then(_response => {
          notify.success("User deleted successfully!");
          getUsers();
        })
        .catch(error => {
          console.error(error);
          notify.error("Could not delete user!");
        });
    }

    onActivated(() => {
      getUsers();
    });

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
