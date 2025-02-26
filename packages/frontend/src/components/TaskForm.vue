<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-gray-700">Title:</label>
      <input
        v-model="submittedTask.title"
        id="title"
        type="text"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        :class="{'border-red-500': errors.title}"
      />
      <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
    </div>

    <div>
      <label for="description" class="block text-gray-700">Description:</label>
      <textarea
        v-model="submittedTask.description"
        id="description"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        :class="{'border-red-500': errors.description}"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
    </div>

    <div>
      <label for="status" class="block text-gray-700">Status:</label>
      <select
        v-model="submittedTask.status"
        id="status"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        :class="{'border-red-500': errors.status}"
      >
        <option :value="TaskStatus.TODO">To Do</option>
        <option :value="TaskStatus.IN_PROGRESS">In Progress</option>
        <option :value="TaskStatus.DONE">Done</option>
      </select>
      <p v-if="errors.status" class="text-red-500 text-sm">{{ errors.status }}</p>
    </div>

    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Save Task</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Task, TaskStatus } from '../types/task';

const props = defineProps<{
  task?: Task;
}>();

const emit = defineEmits(['task-submit']);

const submittedTask = ref<Partial<Task>>({
  title: props.task?.title || '',
  description: props.task?.description || '',
  status: props.task?.status || TaskStatus.TODO,
});

const errors = ref<{ title?: string; description?: string; status?: string }>({});

const validateForm = () : boolean => {
  errors.value = {};

  if (!submittedTask.value.title || submittedTask.value.title.length < 3 || submittedTask.value.title.length > 50) {
    errors.value.title = 'Title must be between 3 and 50 characters';
  }

  if (!submittedTask.value.description || submittedTask.value.description.length < 5 || submittedTask.value.description.length > 255) {
    errors.value.description = 'Description must be between 5 and 255 characters';
  }

  if (!Object.values(TaskStatus).includes(submittedTask.value.status as TaskStatus)) {
    errors.value.status = 'Status must be one of: TODO, IN_PROGRESS, DONE';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = (): void => {
  if (validateForm()) {
    emit('task-submit', submittedTask.value);
  }
};
</script>
