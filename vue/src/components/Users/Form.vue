<template>
  <form @submit.prevent="submit" class="user-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        v-model="userData.email"
        type="text"
        class="form-control"
        id="email"
        required
      />
      <p v-if="validationErrors.email" class="validation">
        {{ validationErrors.email }}
      </p>
    </div>

    <div class="form-group">
      <label for="first_name">First name</label>
      <input
        v-model="userData.first_name"
        class="form-control"
        id="first_name"
        required
      />
      <p v-if="validationErrors.first_name" class="validation">
        {{ validationErrors.first_name }}
      </p>
    </div>

    <div class="form-group">
      <label for="last_name">Last name</label>
      <input
        v-model="userData.last_name"
        class="form-control"
        id="last_name"
        required
      />
      <p v-if="validationErrors.last_name" class="validation">
        {{ validationErrors.last_name }}
      </p>
    </div>

    <div class="form-group">
      <label>Gender</label>
      <br />
      <label>
        <input
          v-model="userData.gender"
          type="radio"
          name="gender"
          value=""
        />Incognito
      </label>

      <label>
        <input
          v-model="userData.gender"
          type="radio"
          name="gender"
          value="m"
        />Male
      </label>

      <label>
        <input
          v-model="userData.gender"
          type="radio"
          name="gender"
          value="f"
        />Female
      </label>
      <p v-if="validationErrors.gender" class="validation">
        {{ validationErrors.gender }}
      </p>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="userData.password"
        type="password"
        class="form-control"
        id="password"
        :required="!initialUserData"
      />
      <p v-if="validationErrors.password" class="validation">
        {{ validationErrors.password }}
      </p>
    </div>

    <div class="form-group">
      <label for="password_confirmation">Password</label>
      <input
        v-model="userData.password_confirmation"
        type="password"
        class="form-control"
        id="password_confirmation"
        :required="!initialUserData"
      />
      <p v-if="validationErrors.password_confirmation" class="validation">
        {{ validationErrors.password_confirmation }}
      </p>
    </div>

    <slot name="controls"></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UserData } from "@/services/users";

export default defineComponent({
  props: {
    validationErrors: {
      type: Object,
      required: true
    },
    initialUserData: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit }) {
    const userData = reactive(new UserData());
    if (props.initialUserData) {
      userData.setValues(props.initialUserData);
    }

    function submit() {
      emit("formSubmit", userData);
    }

    return { userData, submit };
  }
});
</script>

<style scoped>
.user-form {
  max-width: 300px;
  margin: auto;
}

input[type="radio"] {
  margin-left: 10px;
}

.validation {
  color: red;
  font-size: 14px;
}
</style>
