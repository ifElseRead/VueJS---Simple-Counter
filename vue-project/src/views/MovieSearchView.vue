<script setup>
import MovieCard from "../components/MovieCard.vue";
import { ref } from "vue";

// State for user input
const searchInput = ref("Batman"); // Default search term

// State for API results
const movies = ref([]);

// State for feedback
const isLoading = ref(false);
const error = ref(null);

// IMPORTANT: Replace YOUR_API_KEY with 'a1b2c3d4' for testing,
// or get a free key from OMDb API.
const API_KEY = "YOUR_API_KEY";

const runSearch = async () => {
  // 1. Basic validation: don't search if input is empty
  if (searchInput.value.trim() === "") {
    movies.value = []; // Clear old results
    error.value = "Please enter a search term.";
    return;
  }

  // Reset state and set loading flag
  isLoading.value = true;
  error.value = null;
  movies.value = [];

  try {
    // Construct the URL using the reactive input value
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInput.value}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.Response === "True") {
      // The API returns the search results in the 'Search' property
      movies.value = data.Search;
    } else {
      // Handle API-specific error (e.g., 'Movie not found!')
      error.value = data.Error;
    }
  } catch (err) {
    // Handle network or parsing errors
    error.value = `Search failed: ${err.message}`;
  } finally {
    // 4. Reset loading state
    isLoading.value = false;
  }
};

// Run an initial search when the component is created
runSearch();
</script>

<template>
  <h2>Movie Search</h2>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search for a movie..."
      v-model="searchInput"
      @keyup.enter="runSearch"
    />
    <button @click="runSearch" :disabled="isLoading">Search</button>
  </div>

  <div v-if="isLoading">
    <p>Searching for movies...</p>
  </div>

  <div v-else-if="error">
    <p style="color: red">Error: {{ error }}</p>
  </div>

  <div v-else-if="movies.length > 0" class="movie-list">
    <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
  </div>

  <div v-else>
    <p>Start typing above to search for a movie!</p>
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}
.search-bar input {
  padding: 10px;
  width: 300px;
}
.search-bar button {
  padding: 10px 15px;
  margin-left: 10px;
}
</style>
