<script setup>
import { ref } from "vue";

// 1. Define a reactive array of objects
const tasks = ref([
  { id: 1, text: "Complete Day 1 Recap", done: true },
  { id: 2, text: "Define Day 2 Tasks Array", done: true },
  { id: 3, text: "Implement v-for Directive", done: false },
]);

// 3. Define the function to remove a task
const removeTask = (taskIdToRemove) => {
  // Find the index of the task we want to remove
  const index = tasks.value.findIndex((task) => task.id === taskIdToRemove);

  // If the task is found (index is not -1), remove it from the array
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
};
</script>

<template>
  <h1>My Day 2 Tasks</h1>
  <ul>
    <li v-for="task in tasks" :key="task.id" :class="{ done: task.done }">
      {{ task.text }}
      <span v-if="task.done">✅</span>
      <span v-else>⏳</span>
      <button @click="removeTask(task.id)">Remove</button>
    </li>
  </ul>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  color: #888;
}
</style>
