<script setup>
import RecipeCard from "../components/RecipeCard.vue";
import { ref } from "vue";

// State for user input
const searchInput = ref("chicken"); // Default search term

// State for API results
const recipes = ref([]);

// State for feedback
const isLoading = ref(false);
const error = ref(null);
const testingArray = ref([1, 2, 3, 4, 5]); // Testing data remains
const Name = "Murfy";

// API Key from environment variables
const API_KEY = import.meta.env.VITE_THEMEALDB_API_KEY;

const runSearch = async () => {
  // 1. Basic validation: don't search if input is empty
  if (searchInput.value.trim() === "") {
    recipes.value = [];
    error.value = "Please enter a search term.";
    return;
  }

  // Reset state and set loading flag
  isLoading.value = true;
  error.value = null;
  recipes.value = [];

  try {
    const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=${searchInput.value}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.meals) {
      recipes.value = data.meals;
    } else {
      error.value = "No recipes found.";
    }
  } catch (err) {
    error.value = `Search failed: ${err.message}`;
  } finally {
    isLoading.value = false;
  }
};

// Run an initial search when the component is created
runSearch();
</script>

<template>
  <div class="recipe-search-view">
    <header class="main-header">
      <h1>🍽️ Recipe Finder</h1>
    </header>

    <div class="search-bar">
      <input
        type="text"
        placeholder="Search for a cuisine, ingredient, or meal..."
        v-model="searchInput"
        @keyup.enter="runSearch"
        class="search-input"
      />
      <button @click="runSearch" :disabled="isLoading" class="search-button">
        {{ isLoading ? "Searching..." : "Search" }}
      </button>
    </div>

    <div v-if="isLoading" class="feedback-state loading-state">
      <p>Searching for delicious recipes...</p>
    </div>

    <div v-else-if="error" class="feedback-state error-state">
      <p class="error-message">🚨 Error: {{ error }}</p>
    </div>

    <div v-else-if="recipes.length > 0" class="recipe-list">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.idMeal"
        :recipe="recipe"
        :testing="testingArray"
        :name="Name"
      />
    </div>

    <div v-else class="feedback-state empty-state">
      <p>Start typing above to search for a recipe! Try "Beef" or "Italian".</p>
    </div>
  </div>
</template>

<style scoped>
/* ------------------------------------------------ */
/* MODERN CSS STYLES */
/* ------------------------------------------------ */

/* Global Container and Typography */
.recipe-search-view {
  max-width: 1100px; /* Increased max width for a modern, spacious feel */
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: "Inter", sans-serif; /* Modern, clean font stack */
}

.main-header h1 {
  font-size: 2.5rem;
  color: #2c3e50; /* Dark, professional color */
  border-bottom: 2px solid #f97316; /* Accent color under title */
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

/* Search Bar Styling */
.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Soft shadow for depth */
  border-radius: 8px;
  overflow: hidden; /* Contains the rounded input and button */
}

.search-input {
  flex-grow: 1;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb; /* Light border */
  border-right: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;
}

.search-input:focus {
  border-color: #f97316; /* Accent color on focus */
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
}

.search-button {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #f97316; /* Bright, modern accent color */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.search-button:hover:not(:disabled) {
  background-color: #e06813;
}

.search-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Recipe List Grid */
.recipe-list {
  display: grid;
  /* More flexible grid for modern displays */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

/* Feedback States (Loading, Error, Empty) */
.feedback-state {
  text-align: center;
  padding: 3rem 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  font-size: 1.1rem;
}

.loading-state {
  background-color: #f0f9ff;
  color: #3b82f6;
  border: 1px solid #bfdbfe;
}

.error-state {
  background-color: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
}

.empty-state {
  background-color: #f5f5f5;
  color: #71717a;
  border: 1px solid #e4e4e7;
}

.error-message {
  font-weight: bold;
}

/* Responsive adjustment for mobile */
@media (max-width: 600px) {
  .search-bar {
    flex-direction: column;
  }
  .search-input {
    border-right: 2px solid #e5e7eb; /* Restore right border on mobile */
  }
}
</style>
