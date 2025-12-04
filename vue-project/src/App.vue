<script setup>
import { ref } from "vue";

// 1. Define a reactive piece of data called 'count' with an initial value of 0.
const count = ref(0);

const increment = () => {
  // We must access the value property of the ref object to change it
  count.value++;
};
</script>

<template>
  <h1>Current Count: {{ count }}</h1>
  <button @click="increment">Increment</button>
</template>

<style scoped>
/* CSS goes here */
</style>
