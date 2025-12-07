<script setup>
import { ref, onMounted } from "vue"; // Make sure to import 'onMounted'
import UserCard from "../components/UserCard.vue";

// 1. Reactive array to hold the fetched users
const users = ref([]);

// 2. Reactive boolean to track the loading status
const isLoading = ref(false);

// 3. Reactive string to hold any errors that occur
const error = ref(null);

// 4. Define the async function to fetch data
const fetchUsers = async () => {
  // Set the loading state to true and clear any previous error
  isLoading.value = true;
  error.value = null;

  try {
    // Fetch data from the external API
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Check if the response was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Update the reactive 'users' array with the fetched data
    users.value = data;
  } catch (err) {
    // If an error occurs (e.g., network issue), store the message
    error.value = err.message;
  } finally {
    // Regardless of success or failure, set loading back to false
    isLoading.value = false;
  }
};
// 3. New deletion function for the parent
const deleteUser = (userIdToDelete) => {
  // Filter out the user with the matching ID
  users.value = users.value.filter((user) => user.id !== userIdToDelete);
};

// 5. Call the fetching function when the component is mounted
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <h1>External User Data Fetcher</h1>

  <div v-if="isLoading">
    <p>Loading user data, please wait...</p>
  </div>

  <div v-else-if="error">
    <p style="color: red">Error fetching data: {{ error }}</p>
    <button @click="fetchUsers">Try Again</button>
  </div>

  <ul v-else>
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @delete-user="deleteUser"
    />
  </ul>
</template>
