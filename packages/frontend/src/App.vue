<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useTaskStore } from './store/tasks.ts';

onBeforeMount(async () => {
  await useTaskStore().fetchTasks();
});
</script>
