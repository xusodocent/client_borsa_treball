<template>
  <h1>Nou cicle</h1>
  <div class="container">
    <form @submit.prevent="postCicle">
      <div class="mb-3">
        <label for="nom" class="form-label">Cicle</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          aria-describedby="nomHelp"
          v-model="nouCicle.nomcicle"
        />
        <div id="emailHelp" class="form-text">
          Escriu el nom del cicle formatius
        </div>
      </div>
      <br />
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <label for="cicles" class="form-label">Grau/Nivell formatiu</label>
        <select
          name="cicles"
          id="cicles"
          class="form-select"
          aria-label="Default select example"
          v-model="nouCicle.graucicle"
        >
          <option value="" selected>--- Tria opció ---</option>
          <option value="B">Formació Professional Bàsica</option>
          <option value="M">Grau Mitjà</option>
          <option value="S">Grau Superior</option>
          <option value="E">Curs d'Especialització</option>
        </select>
      </div>
      <div class="col-lg-2">
        <br /><br />
        <button type="submit" class="btn btn-outline-success">
          <i class="fa-regular fa-floppy-disk"></i>Afegir
        </button>
        <button
          class="btn btn-outline-danger"
          @click="this.$router.push('/cicles')"
        >
          <i class="fa-solid fa-xmark"></i>Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "CicleFormulari",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
      nouCicle: {
        nomcicle: "",
        graucicle: "",
      },
    };
  },
  methods:{
    async postCicle() {
      let url = this.base_url + "/api/cicle/";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.nouCicle),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        this.resposta = await response.json();
        
        if (this.resposta.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Cicle afegit',
            text: 'El cicle s\'ha afegit correctament.',
          });
          this.$router.push('/cicles');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error afegint el cicle: ' + this.resposta.error,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error afegint el cicle: ' + error,
        });
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
  },
};
</script>

<style scoped></style>
