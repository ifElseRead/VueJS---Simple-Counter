<script setup>
import { ref, computed } from "vue";

// Existing tasks array from Day 2
const tasks = ref([
  // ... your tasks array
]);

// 1. New reactive variable for the input field
const newTaskText = ref("");

// Existing removeTask function
const removeTask = (taskIdToRemove) => {
  const index = tasks.value.findIndex((task) => task.id === taskIdToRemove);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
};

// 1. Define the function to add a new task
const addTask = () => {
  // 1. Basic validation: ensure the input isn't empty
  if (newTaskText.value.trim() === "") {
    return; // Stop if the input is empty or just whitespace
  }

  // 2. Create the new task object
  const newTask = {
    // Simple way to get a unique ID: using the current timestamp
    id: Date.now(),
    text: newTaskText.value,
    done: false,
  };

  // 3. Add the new task to the reactive array
  tasks.value.push(newTask);

  // 4. Clear the input field for the next task
  newTaskText.value = "";
};
const remainingTasksCount = computed(() => {
  // Filter the tasks array to find how many tasks are NOT done
  return tasks.value.filter((t) => !t.done).length;
});
const toggleDone = (taskIdToToggle) => {
  // Find the task object within the reactive array
  const task = tasks.value.find((t) => t.id === taskIdToToggle);

  // If the task is found, flip its boolean 'done' value
  if (task) {
    task.done = !task.done;
  }
};
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="What needs to be done?"
      v-model="newTaskText"
    />
    <button @click="addTask">Add Task</button>
  </div>

  <h1>My Day 3 Tasks</h1>
  <p>Remaining: **{{ remainingTasksCount }}**</p>
  <li
    v-for="task in tasks"
    :key="task.id"
    :class="{ done: task.done }"
    @click="toggleDone(task.id)"
  >
    {{ task.text }}
    <span v-if="task.done">✅</span>
    <span v-else>⏳</span>

    <button @click.stop="removeTask(task.id)">Remove</button>
  </li>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  color: #888;
}
</style>
