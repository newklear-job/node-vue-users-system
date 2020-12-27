<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/users" class="navbar-brand">Users list</router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/users/create" class="nav-link"
          >Create user</router-link
        >
      </li>
    </ul>
    <ul class="navbar-nav mr-right">
      <li class="nav-item">
        <router-link to="/login" class="nav-link">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/register" class="nav-link">Register</router-link>
      </li>
    </ul>
  </nav>

  <div class="container mt-3">
    <router-view v-slot="slotProps">
      <keep-alive max="5">
        <component :is="slotProps.Component" :key="$route.path"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
