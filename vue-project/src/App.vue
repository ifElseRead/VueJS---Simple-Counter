<script setup>
// App.vue is now minimal—it only handles navigation
</script>

<template>
  <header>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/users">User List</RouterLink>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 20px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}
main {
  padding: 20px;
}
</style>
