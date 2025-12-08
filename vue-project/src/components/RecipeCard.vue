<script setup>
// We don't need to import RouterLink; it's globally available in the template
// when Vue Router is installed and configured.

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
  testing: {
    type: Array,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <!-- <div class="testing-data">
    <h4>Testing Array Contents:</h4>
    <ul>
      <li v-for="(item, index) in props.testing" :key="index">
        {{ item }}
      </li>
    </ul>
  </div> -->

  <RouterLink
    :to="{ name: 'RecipeDetails', params: { id: props.recipe.idMeal } }"
    class="recipe-card-link"
  >
    <div class="recipe-card">
      <img
        :src="props.recipe.strMealThumb"
        :alt="props.recipe.strMeal"
        class="recipe-poster"
      />
      <div class="recipe-details">
        <h3>{{ props.recipe.strMeal }}</h3>

        <p>Category: **{{ props.recipe.strCategory }}**</p>
        <p>Origin: {{ props.recipe.strArea }}</p>
        <span>By: {{ props.name }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/* Styling for the link wrapper and the card itself.
  It's important to remove the default link underline/color.
*/
.recipe-card-link {
  text-decoration: none; /* Removes underline */
  color: inherit; /* Inherits text color */
  display: block; /* Makes the link wrap the block element */
  transition: transform 0.2s;
}

/* Add hover effect to the card for better UX */
.recipe-card-link:hover .recipe-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.recipe-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
.recipe-poster {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}
.recipe-details h3 {
  margin-top: 0;
  color: #333;
}
</style>
