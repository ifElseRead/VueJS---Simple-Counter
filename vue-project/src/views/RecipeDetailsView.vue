<script setup>
// The script logic is already modern and uses best practices (Composition API, async/await, error handling).
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const recipe = ref(null);
const isLoading = ref(false);
const error = ref(null);
// const testing = ref([1, 2, 3, 4, 5]);

const route = useRoute();
const router = useRouter();

const API_KEY = import.meta.env.VITE_THEMEALDB_API_KEY;

// Helper to extract ingredients and measures into an array of objects
const getIngredients = (meal) => {
  const ingredients = [];
  // TheMealDB has up to 20 ingredients/measures, which must be looped through
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // Check if both ingredient name and measure exist and are not empty/null
    if (
      ingredient &&
      ingredient.trim() !== "" &&
      measure &&
      measure.trim() !== ""
    ) {
      ingredients.push({
        name: ingredient,
        measure: measure,
      });
    }
  }
  return ingredients;
};

const fetchRecipeDetails = async (id) => {
  isLoading.value = true;
  error.value = null;
  recipe.value = null;

  try {
    const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      // Store the fetched meal and attach the processed ingredients list
      const fetchedMeal = data.meals[0];
      fetchedMeal.ingredientsList = getIngredients(fetchedMeal);
      recipe.value = fetchedMeal;
    } else {
      error.value = "Recipe not found.";
    }
  } catch (err) {
    error.value = `Failed to fetch recipe details: ${err.message}`;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const recipeId = route.params.id;
  fetchRecipeDetails(recipeId);
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="recipe-details-container">
    <header class="detail-header">
      <button @click="goBack" class="back-button">← Back to Search</button>
      <h2>Recipe Details</h2>
    </header>

    <div v-if="isLoading" class="loading-state">
      <p>Loading recipe details...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p class="error-message">Error: {{ error }}</p>
    </div>
    <div v-else-if="recipe" class="recipe-content-grid">
      <section class="recipe-image-section">
        <img
          :src="recipe.strMealThumb"
          :alt="recipe.strMeal"
          class="recipe-image"
        />
      </section>

      <section class="recipe-meta-section">
        <h1>{{ recipe.strMeal }}</h1>
        <div class="meta-tags">
          <span class="tag">Category: **{{ recipe.strCategory }}**</span>
          <span class="tag">Origin: **{{ recipe.strArea }}**</span>
          <a
            v-if="recipe.strYoutube"
            :href="recipe.strYoutube"
            target="_blank"
            class="tag video-tag"
          >
            ▶ Watch Video
          </a>
        </div>
      </section>

      <section class="ingredients-section">
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
          <li
            v-for="(item, index) in recipe.ingredientsList"
            :key="index"
            class="ingredient-item"
          >
            <span class="measure">{{ item.measure }}</span>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </section>

      <section class="instructions-section">
        <h3>Instructions</h3>
        <p class="instructions-text">{{ recipe.strInstructions }}</p>
      </section>
    </div>
    <div v-else class="empty-state">
      <p>No recipe details available.</p>
    </div>
  </div>
</template>

<style scoped>
/* ------------------------------------------------ */
/* MODERN CSS STYLES */
/* ------------------------------------------------ */

/* Container and Layout */
.recipe-details-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: "Inter", sans-serif; /* Use a modern font stack */
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

h1 {
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #333;
}

h3 {
  font-size: 1.5rem;
  color: #555;
  border-left: 4px solid #f97316; /* Accent color */
  padding-left: 0.75rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

/* Grid Layout for Content */
.recipe-content-grid {
  display: grid;
  gap: 2rem;
  grid-template-areas:
    "image meta"
    "ingredients instructions";
  grid-template-columns: 1fr 2fr;
}

/* Make sections fill the area */
.recipe-image-section {
  grid-area: image;
}
.recipe-meta-section {
  grid-area: meta;
}
.ingredients-section {
  grid-area: ingredients;
}
.instructions-section {
  grid-area: instructions;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .recipe-content-grid {
    grid-template-areas:
      "image"
      "meta"
      "ingredients"
      "instructions";
    grid-template-columns: 1fr;
  }
}

/* Image Styling */
.recipe-image-section {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}
.recipe-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Tags and Metadata */
.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag,
.video-tag {
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px; /* Pill shape */
  font-size: 0.85rem;
  font-weight: 500;
}

.video-tag {
  background-color: #dc2626; /* YouTube red */
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
}

.video-tag:hover {
  background-color: #ef4444;
}

/* Ingredients List */
.ingredients-section {
  background-color: #f7fdfb;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e5e7eb;
  font-size: 1rem;
}
.ingredient-item:last-child {
  border-bottom: none;
}
.measure {
  font-weight: 600;
  color: #10b981; /* Green accent */
  min-width: 30%;
}
.name {
  color: #374151;
}

/* Instructions */
.instructions-text {
  line-height: 1.8;
  color: #4b5563;
  white-space: pre-line; /* Preserves line breaks in the text */
}

/* Button & States */
.back-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  font-weight: 500;
}
.back-button:hover {
  background-color: #f3f4f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 3rem;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin-top: 2rem;
}
.error-message {
  color: #ef4444; /* Red */
  font-weight: bold;
}
</style>
