import { createRouter, createWebHistory } from 'vue-router';
import AllTasks from '../pages/AllTasks.vue';
import EditTask from '../pages/EditTask.vue';
import CreateTask from '../pages/CreateTask.vue';

const routes = [
  { path: '/', component: AllTasks },
  { path: '/edit/:id', component: EditTask },
  { path: '/create', component: CreateTask },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
