<script setup>
// 1. Define the prop this component expects
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="movie-card">
    <img :src="props.movie.Poster" alt="Movie Poster" class="poster" />
    <div class="details">
      <h3>{{ props.movie.Title }}</h3>
      <p>{{ props.movie.Year }} - {{ props.movie.Type }}</p>
      <a
        :href="`https://www.imdb.com/title/${props.movie.imdbID}`"
        target="_blank"
        >View on IMDb</a
      >
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  gap: 15px;
  align-items: center;
}
.poster {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}
.details h3 {
  margin: 0 0 5px 0;
  color: #333;
}
</style>
