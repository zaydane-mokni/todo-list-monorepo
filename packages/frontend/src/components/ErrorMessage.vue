<template>
  <div v-if="message" class="bg-red-100 text-red-500 border border-red-500 rounded-lg p-4 mb-4">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true,
  }
});
</script>
