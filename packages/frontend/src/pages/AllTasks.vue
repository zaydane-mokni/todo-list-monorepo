<template>
  <div class="container mx-auto p-30">
    <h1 class="text-3xl font-bold mb-6">All Tasks</h1>

    <ErrorMessage  v-if="errorMessage" :message="errorMessage" />

    <div v-else>
      <div v-if="taskStore.loading" class="flex justify-center items-center">
        <div class="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
      </div>

      <div v-else-if="taskStore.tasks.length > 0" class="space-y-4">
        <TaskItem v-for="task in taskStore.tasks" :key="task._id" :task="task" />
      </div>

      <div v-else class="text-center text-gray-500">
        No tasks available. Start by creating a new task!
      </div>

      <div class="mt-4">
        <button @click="navigateToCreateTask" v-show="!taskStore.loading" class="bg-green-500 text-white px-6 py-2 rounded-lg w-full hover:bg-green-600">Create Task</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from '../components/TaskItem.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../store/tasks.ts';
import { onMounted, ref } from 'vue';

const taskStore = useTaskStore();
const router = useRouter();

const errorMessage = ref<string | null>(null);

onMounted(async () => {
  try {
    await useTaskStore().fetchTasks();
  } catch (error) {
    errorMessage.value = (error as Error).message;
  }
});

const navigateToCreateTask = async (): Promise<void> => {
  await router.push('/create');
};
</script>
