<template>
  <div class="container mx-auto p-30">
    <h1 class="text-3xl font-bold mb-6">Edit Task</h1>

    <div v-if="errorMessage" class="text-red-500 text-center mb-4">
      {{ errorMessage }}
    </div>

    <div v-if="taskStore.loading" class="flex justify-center items-center">
      <div class="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
    </div>

    <div v-else-if="task">
      <TaskForm :task="task" @task-submit="onTaskSubmit" />
    </div>

    <div v-else>
      <p class="text-lg text-red-500 mb-4">Task not found. Please create a new task.</p>
      <router-link to="/" class="text-blue-500">Go to the home page to create a task</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '../store/tasks.ts';
import TaskForm from '../components/TaskForm.vue';
import { type Task } from '../types/task.ts';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const errorMessage = ref<string | null>(null);
const task = ref<Task | null>(null);
const taskId = route.params.id as string;

onMounted( async () => {
  await fetchTask();
});

const fetchTask = async () : Promise<void> => {
  const existingTask = taskStore.tasks.find((t) => t._id === taskId);

  if (existingTask) {
    task.value = existingTask;
    return;
  }

  try {
    task.value = await taskStore.getTaskById(taskId);
  } catch (error) {
    errorMessage.value = (error as Error).message;
  }
};

const onTaskSubmit = async (updatedTask: Task): Promise<void> => {
  try {
    await taskStore.updateTask(taskId, updatedTask);
    await router.push('/');
  } catch (error) {
    errorMessage.value = (error as Error).message;
  }
};
</script>
