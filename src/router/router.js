// router.js
import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../components/AppLayout/AppLayout.vue";
import QuestionAnswer from "../components/QuestionAnswer/QuestionAnswer.vue";

const routes = [
  {
    path: "/",
    name: "AppLayout",
    component: AppLayout,
  },
  {
    path: "/question",
    name: "QuestionAnswer",
    component: QuestionAnswer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
