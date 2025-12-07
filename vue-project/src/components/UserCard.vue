<script setup>
// 1. Define the props (data flowing DOWN from the parent)
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// 2. Define the events (messages flowing UP to the parent)
const emit = defineEmits(["delete-user"]);

// 3. Function to handle the button click and emit the event
const handleDelete = () => {
  // We send the 'delete-user' event, along with the user's ID as the payload.
  // The parent component (App.vue) will listen for this event.
  emit("delete-user", props.user.id);
};
</script>

<template>
  <li class="user-card">
    <strong>{{ props.user.name }}</strong> ({{ props.user.username }})
    <br />
    <small>
      Email: {{ props.user.email }} | City: {{ props.user.address.city }}
    </small>

    <button @click="handleDelete">Delete User</button>
  </li>
</template>

<style scoped>
.user-card {
  /* Applying a slightly cleaner style here */
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
  list-style: none; /* Ensure no bullets */
  display: flex;
  flex-direction: column;
}

.user-card strong {
  color: #333;
  font-size: 1.1em;
}

.user-card button {
  align-self: flex-end;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-card button:hover {
  background-color: #c82333;
}
</style>
