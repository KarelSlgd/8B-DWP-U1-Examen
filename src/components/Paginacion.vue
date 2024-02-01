<template>
  <div>
    <div class="m-5">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
      <p class="mt-3">Pagina actual: {{ currentPage }}</p>
      <b-table
        label-sort-asc=""
        label-sort-desc=""
        :items="vehiculos"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :filter="filtro"
        @filtered="onFiltered"
      ></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      vehiculos: [],
      filtro: null,
      sortBy: "",
      sortDesc: false,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "brand", label: "Marca", sortable: true },
        { key: "model", label: "Modelo", sortable: true },
        { key: "year", label: "Año de fabricación", sortable: true },
        { key: "serie", label: "Numero de serie", sortable: true },
      ],
      items: [
        {
          text: "Inicio",
          to: "/",
        },
        {
          text: "Formulario",
          to: "/formulario",
        },
        {
          text: "Paginacion",
          active: true,
        },
      ],
    };
  },

  methods: {
    fetchData() {
      fetch("http://localhost:8080/api/vehiculos/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error");
            console.log(response);
          }
          return response.json();
        })
        .then((data) => {
          this.vehiculos = data.content;
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    },
    onFiltered(filteredItems) {
      this.currentPage = 1;
      this.rows = filteredItems.length;
    },
  },
  mounted() {
    this.fetchData();
  },

  created() {
    this.fetchData();
  },
  computed: {
    rows() {
      return this.vehiculos.length;
    },
  },
};
</script>

<style>
</style>

