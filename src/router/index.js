import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("../components/Inicio.vue"),
    },
    {
      path: "/formulario",
      name: "formulario",
      component: () => import("../components/Formulario.vue"),
    },
    {
      path: "/paginacion",
      name: "paginacion",
      component: () => import("../components/Paginacion.vue"),
    },
  ],
});

export default router;
