<template>
  <div>
    <h1>Formulari d'Oferta</h1>

    <form @submit.prevent="submitForm" class="row g-3">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="data" class="form-label">Data</label>
          <input type="date" class="form-control" id="data" v-model="oferta.data" required>
        </div>
        <div class="mb-3">
          <label for="textoferta" class="form-label">Text de l'oferta</label>
          <input type="text" class="form-control" id="textoferta" v-model="oferta.textoferta" required>
        </div>
        <!-- Agrega más campos según tus necesidades -->
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="urloferta" class="form-label">URL de l'oferta</label>
          <input type="url" class="form-control" id="urloferta" v-model="oferta.urloferta" required>
        </div>
        <div class="mb-3">
          <label for="cicles" class="form-label">Cicles</label>
          <select multiple class="form-select" id="cicles" v-model="selectedCicles" required>
            <option v-for="cicle in cicles" :key="cicle.id" :value="cicle.id">{{ cicle.nomcicle }}</option>
          </select>
        </div>
        <!-- Agrega más campos según tus necesidades -->
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Enviar Oferta</button>
      </div>
    </form>
  </div>
</template>
  
<script>
export default {
  name: "OfertaFormulari",
  data() {
    return {
      oferta: {
        data: "",
        textoferta: "",
        urloferta: "",
        cicles: [],
      },
      cicles: [
        { id: 2, nomcicle: "DAW", graucicle: "S" },
        { id: 8, nomcicle: "IA i Big Data", graucicle: "E" },
        // Agrega más cicles según necesites
      ],
      selectedCicles: [],
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes preparar la oferta antes de enviarla a la API
      const ofertaToSend = {
        ...this.oferta,
        cicles: this.selectedCicles,
      };

      // Lógica para enviar la oferta a la API
      console.log("Oferta a enviar:", ofertaToSend);

      // Restablecer el formulario después de enviar
      this.resetForm();
    },
    resetForm() {
      this.oferta = {
        data: "",
        textoferta: "",
        urloferta: "",
        cicles: [],
      };
      this.selectedCicles = [];
    },
  },
};
</script>
  
<style scoped>
/* Puedes agregar estilos específicos aquí si es necesario */
</style>
  