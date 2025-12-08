<script setup>
// App.vue is now minimal—it only handles navigation
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <span class="separator">|</span>

      <RouterLink to="/recipes">Recipe Search</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/*
|----------------------------------------------------------
| HEADER STYLES
|----------------------------------------------------------
*/
header {
  background-color: #333; /* Dark background */
  color: white;
  padding: 10px 40px; /* Vertical and horizontal padding */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Soft shadow */
}

/*
|----------------------------------------------------------
| NAVIGATION (Flexbox setup)
|----------------------------------------------------------
*/
nav {
  display: flex; /* Enables flexbox */
  align-items: center; /* Vertically centers items */
  gap: 20px; /* Sets space between all items in the nav */
}

/*
|----------------------------------------------------------
| ROUTER LINKS
|----------------------------------------------------------
*/
.router-link-active,
a {
  /* Targets both RouterLink and its underlying anchor tag */
  color: #fff; /* White text for all links */
  text-decoration: none; /* Removes the default underline */
  font-weight: 500;
  transition: color 0.3s;
}

/* Hover effect */
a:hover {
  color: #42b883; /* Vue green on hover */
}

/* Styles for the pipe separator */
.separator {
  color: #666; /* Gray color for the separator pipe */
  font-size: 1.2em;
}

/* ... other styles for main ... */
main {
  padding: 20px;
}
</style>
