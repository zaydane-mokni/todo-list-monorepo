<template>
  <div class="container mx-auto p-30">
    <h1 class="text-3xl font-bold mb-6">Create Task</h1>
    <div v-if="errorMessage" class="text-red-500 text-center mb-4">
      {{ errorMessage }}
    </div>

    <TaskForm @task-submit="onTaskSubmit" />
  </div>
</template>

<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue';
import type { Task } from '../types/task.ts';
import router from '../router';
import { useTaskStore } from '../store/tasks.ts';
import { ref } from 'vue';

const taskStore = useTaskStore();

const errorMessage = ref<string | null>(null);

const onTaskSubmit = async (task: Task): Promise<void> => {
  try {
    await taskStore.addTask(task);
    await router.push('/');
  } catch (error) {
    errorMessage.value = (error as Error).message;
  }
};
</script>
