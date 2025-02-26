<template>
  <div @click="navigateToEdit"  class="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md">
    <h3 class="text-xl font-semibold text-gray-800">{{ task.title }}</h3>
    <p class="text-gray-600">{{ task.description }}</p>
    <p class="text-sm text-gray-500">Status: <span :class="statusClass">{{ task.status }}</span></p>
    <button @click.stop="deleteTask" class="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Task, TaskStatus } from '../types/task';
import { useTaskStore } from '../store/tasks.ts';
import router from '../router';

const props = defineProps<{
  task: Task;
}>();

const taskStore = useTaskStore();

const deleteTask = async (event: Event) : Promise<void> => {
  event.stopPropagation();
  await taskStore.deleteTask(props.task._id);
};

const navigateToEdit = async (): Promise<void> => {
  await router.push(`/edit/${props.task._id}`);
};

const statusClass = computed(() => {
  switch (props.task.status) {
    case TaskStatus.TODO:
      return 'text-yellow-500';
    case TaskStatus.IN_PROGRESS:
      return 'text-blue-500';
    case TaskStatus.DONE:
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
});
</script>
