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
                  v-model="filters.id"
                  type="text"
                  class="form-control"
                  placeholder="Search by id"
              /></label>
            </th>
            <th>
              <label
                ><input
                  v-model="filters.email"
                  type="text"
                  class="form-control"
                  placeholder="Search by email"
              /></label>
            </th>
            <th>
              <label
                ><input
                  v-model="filters.first_name"
                  type="text"
                  class="form-control"
                  placeholder="Search by first name"
              /></label>
            </th>
            <th>
              <label
                ><input
                  v-model="filters.last_name"
                  type="text"
                  class="form-control"
                  placeholder="Search by last name"
              /></label>
            </th>
            <th>
              <label>
                <select v-model="filters.gender" class="form-control">
                  <option value="">All</option>
                  <option value="i">{{ formatters.gender("i") }}</option>
                  <option value="m">{{ formatters.gender("m") }}</option>
                  <option value="f">{{ formatters.gender("f") }}</option>
                </select>
              </label>
            </th>
            <th>
              <label
                ><input
                  v-model="filters.created_at"
                  type="text"
                  class="form-control"
                  placeholder="Search by create at"
              /></label>
            </th>
            <th>
              <label
                ><input
                  v-model="filters.updated_at"
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
import { defineComponent, ref, onActivated, reactive, watch } from "vue";
import axios, { CancelTokenSource } from "axios";
import { useI18n } from "@/i18n";
import { useFormatters } from "@/services/formatters";
// @ts-ignore
import Pagination from "v-pagination-3";
import { useRouter, useRoute } from "vue-router";
import { notify } from "@/services/notify";
import _ from "lodash";

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
        await updateQueryParams();
        getUsers();
      }
    });

    const filters = reactive({
      id: route.query.id ?? "",
      email: route.query.email ?? "",
      first_name: route.query.first_name ?? "",
      last_name: route.query.last_name ?? "",
      gender: route.query.gender ?? "",
      created_at: route.query.created_at ?? "",
      updated_at: route.query.updated_at ?? ""
    });

    const updateQueryParams = () => {
      const usedParams = _.pickBy(filters, _.identity);
      if (pagination.current_page > 1) {
        usedParams.page = pagination.current_page.toString();
      }
      return router.push({ query: usedParams });
    };

    let cancelToken: CancelTokenSource | null = null;
    const getUsers = () => {
      if (cancelToken) {
        cancelToken.cancel();
      }
      cancelToken = axios.CancelToken.source();
      axios
        .get(`${process.env.VUE_APP_API_DOMAIN}/users`, {
          cancelToken: cancelToken.token,
          params: route.query
        })
        .then(response => {
          users.value = response.data.data;
          Object.assign(pagination, response.data.meta);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log("cancelled request");
            return;
          }
          console.error(error);
          notify.error("Could not get users!");
        });
    };

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
          console.log(error);
          notify.error("Could not delete user!");
        });
    }

    onActivated(() => {
      getUsers();
    });

    watch(filters, async () => {
      await updateQueryParams();
      getUsers();
    });

    return { users, filters, deleteUser, formatters, pagination };
  }
});
</script>

<style>
table,
th,
td,
tr {
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
  white-space: nowrap;
  padding: 5px;
}

table {
  margin: 0 auto; /* or margin: 0 auto 0 auto */
}

select {
  max-width: 100%;
}

td {
  min-width: 100px;
}
select:focus {
  width: auto;
}
</style>
