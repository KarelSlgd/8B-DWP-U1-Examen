<template>
  <div>
    <div class="m-5">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>
    <div class="m-5">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-row>
          <b-col
            ><b-form-group id="marca" label="Marca">
              <b-form-input
                id="marca"
                v-model="form.marca"
                type="text"
                required
                pattern="[A-Za-z0-9]+"
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col>
            <b-form-group id="modelo" label="Modelo">
              <b-form-input
                id="modelo"
                v-model="form.modelo"
                type="text"
                pattern="[A-Za-z0-9]+"
                required
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col>
            <b-form-group id="anio" label="Año">
              <b-form-input
                id="anio"
                v-model="form.anio"
                type="number"
                required
              ></b-form-input> </b-form-group
          ></b-col>
        </b-row>
        <b-row>
          <b-col
            ><b-form-group id="numero_serie" label=" Numero de serie">
              <b-form-input
                id="numero_serie"
                v-model="form.numero_serie"
                type="text"
                required
              ></b-form-input> </b-form-group
          ></b-col>
        </b-row>
        <div class="mt-2">
          <b-button type="submit" variant="primary">Registrar</b-button>
          <b-button type="reset" variant="danger">Borrar</b-button>
        </div>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      form: {
        marca: "",
        modelo: "",
        anio: "",
        numero_serie: "",
      },
      items: [
        {
          text: "Inicio",
          to: "/",
        },
        {
          text: "Formulario",
          active: true,
        },
        {
          text: "Paginacion",
          to: "/paginacion",
        },
      ],
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      const anioActual = new Date().getFullYear();

      if (this.form.anio > anioActual) {
        alert("El año no puede ser mayor que el actual " + anioActual);
        return false;
      }
      const regex = /^[A-Za-z]{4}\d{3}-\d{2}[A-Za-z]{2}$/;
      if (!regex.test(this.form.numero_serie)) {
        alert("El num de serie debe seguir el formato XXXX000-00XX");
        return;
      }
      const url = "http://localhost:8080/api/vehiculos";
      const vehiculo = {
        brand: this.form.marca,
        model: this.form.modelo,
        year: this.form.anio,
        serie: this.form.numero_serie,
      };
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehiculo),
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            console.log(response);
            console.log("error");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Se creo");
        })
        .catch((err) => {
          console.error(err);
          console.log("error en el catch");
        });
    },
    onReset(event) {
      event.preventDefault();
      this.form.marca = "";
      this.form.modelo = "";
      this.form.anio = "";
      this.form.numero_serie = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style></style>
