<template>
  <div>
    <div class="m-5">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>
    <div class="m-5">
      <h1>Inicio</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Inicio",
          active: true,
        },
        {
          text: "Formulario",
          to: "/formulario",
        },
        {
          text: "Paginacion",
          to: "/paginacion",
        },
      ],
    };
  },
};
</script>

<style>
</style>