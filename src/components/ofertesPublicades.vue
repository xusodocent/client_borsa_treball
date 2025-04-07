<template>
    <div class="container">
      <h2 class="text-center fw-bold text-primary mb-4">Llista d'Ofertes de Feina</h2>
      <div class="row">
        <!-- Itera sobre les ofertes i crea una card per cada una -->
        <div class="col-md-4" v-for="oferta in ofertes" :key="oferta.id">
          <div class="card mb-4 shadow-sm">
            <img v-if="oferta.imagen" :src="oferta.imagen" class="card-img-top" alt="Imatge oferta" />
            <div class="card-body">
              <h5 class="card-title">{{ oferta.textoferta }}</h5>
              <p class="card-text">Empresa: {{ oferta.empresa.nomempresa }}</p>
              <p class="card-text">Data: {{ oferta.data }}</p>
              <p class="card-text">Experiència: {{ oferta.experiencia }}</p>
              <p class="card-text">Idiomes: {{ oferta.idiomes }}</p>
              <a :href="oferta.urloferta" target="_blank" class="btn btn-primary">Veure oferta</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LlistaOfertes",
    props: {
    base_url: String,
  },
    data() {
      return {
        token: "",
        ofertes: [], // Array on es guardaran les ofertes de feina
      };
    },
    methods: {
      async getOfertes() {
        let url = this.base_url + "/api/oferta"; // La URL per obtenir les ofertes
        try {
          const response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`,
            },
          });
          const data = await response.json();
          this.ofertes = data.ofertes; // Assignem les dades a l'array ofertes
        } catch (error) {
          console.error("Error al carregar les ofertes:", error);
        }
      },
    },
    mounted() {
      this.token = localStorage.getItem("jwtToken"); // Obtenim el token JWT del localStorage
      this.getOfertes(); // Carreguem les ofertes quan el component es munta
    },
  };
  </script>
  
  <style scoped>
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  