<template>
  <div>
    <h1>Formulari d'Oferta</h1>

    <form action="" @submit.prevent class="row g-3">
      <div class="row align-items-start">
        <div class="col-lg-6 col-sm-12">
          <label for="empresa" class="form-label">Empresa</label>
          <select class="form-select" id="sector" required v-model="oferta.empresa" @change="onChangeEmpresa">
            <option value="" disabled>Selecciona una</option>
            <option :value="String(empresa.NIF)" v-for="empresa in llistaEmpreses" :key="empresa.NIF">{{ empresa.nom }}
            </option>
          </select>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="data" class="form-label">Data</label>
          <input type="date" class="form-control" id="data" v-model="oferta.data" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="textoferta" class="form-label">Text de l'oferta</label>
          <input type="text" class="form-control" id="textoferta" v-model="oferta.textoferta" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="textoferta" class="form-label">Experiència</label>
          <input type="text" class="form-control" id="textoferta" v-model="oferta.experiencia" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="textoferta" class="form-label">Idiomes</label>
          <input type="text" class="form-control" id="textoferta" v-model="oferta.idiomes" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="textoferta" class="form-label">Altres</label>
          <input type="text" class="form-control" id="textoferta" v-model="oferta.altres" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="urloferta" class="form-label">URL de l'oferta</label>
          <input type="url" class="form-control" id="urloferta" v-model="oferta.urloferta" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="cicles" class="form-label">Cicles</label>
          <select multiple class="form-select" id="cicles" v-model="oferta.cicles" required>
            <option value="" disabled>Selecciona vàrios ciles amb Ctrl</option>
            <option :value="cicle.id" v-for="cicle in cicles" :key="cicle.id">
              {{ cicle.nomcicle }}
            </option>
          </select>
        </div>
        <div class="col-lg-6 col-sm-12 ">
          <div class="form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckChecked">Estat</label>
            <input v-model="oferta.estat" class="form-check-input" type="checkbox" role="switch"
              id="flexSwitchCheckChecked" checked>
          </div>
        </div>
        <!-- Agrega más campos según tus necesidades -->
      </div>

      <!-- Agrega más campos según tus necesidades -->

      <div class="col-12">
        <button class="btn btn-primary" @click="postOferta()">Enviar Oferta</button>
      </div>
    </form>
    <br>
    <br>
    <div v-if="afegit_ok" class="alert alert-success">S'ha afegit correctament l'oferta</div>
    <div v-if="afegit_error" class="alert alert-danger">Errada afegint oferta</div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "OfertaFormulari",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
      oferta: {
        empresa: "",
        data: "",
        estat: true,
        textoferta: "",
        experiencia: "FCTs de ciles formatius",
        idiomes: "",
        altres: "Cap requisit extra",
        urloferta: "",
        cicles: [1, 2],
      },
      cicles: [],
      selectedCicles: [],
      selectedEmpresa: "",
      llistaEmpreses: [],
      afegit_ok: false,
      afegit_error: false,
    };
  },
  methods: {
    async getCicles() {
      let url = this.base_url + "/api/cicle/";
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        this.cicles = this.resposta.cicles;
        await console.log(this.cicles);
      } catch (error) {
        console.error(error);
      }
    },
    onChangeEmpresa() {
      console.log(this.oferta.empresa);
    },
    async getEmpreses() {
      let url = this.base_url + "/api/empresa/";
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        this.llistaEmpreses = this.resposta.empreses;
        this.llistaEmpreses.sort(function (a, b) {
          var nomA = a.nom.toUpperCase(); // Converteix els noms a majúscules per assegurar una ordenació sense distinció de majúscules/minúscules
          var nomB = b.nom.toUpperCase();

          if (nomA < nomB) {
            return -1;
          }
          if (nomA > nomB) {
            return 1;
          }
          return 0; // En cas d'igualtat
        });
        await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async postOferta() {
      if (!this.oferta.empresa) {
        Swal.fire({
          icon: 'error',
          title: 'Obligatori triar empresa...',
          text: 'Selecciona una empresa'
        });
        return;
      }
      this.afegit_ok = false;
      this.afegit_error = false;
      let url = this.base_url + "/api/oferta/";
      try {
        await console.log(JSON.stringify(this.oferta));
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.oferta),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        const resposta = await response.json();
        if (resposta.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Oferta afegida correctament',
            text: "La resposta del esrvidor és:" + resposta.ok,
            showConfirmButton: true,
          });
          this.afegit_ok = true;
          this.$router.push("/ofertes");
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error en enviar dades al servidor',
            text: resposta.error
          });
          this.afegit_error = true;
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error en enviar dades al servidor',
          text: error
        });
        this.afegit_error = true;
        console.error(error);
      }

      this.resetForm();
    },
    resetForm() {
      this.oferta = {
        empresa: "",
        data: "",
        estat: true,
        textoferta: "",
        experiencia: "FCTs de ciles formatius",
        idiomes: "",
        altres: "Cap requisit extra",
        urloferta: "",
        cicles: [],
      };
      this.selectedCicles = [];
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getEmpreses();
    this.getCicles();
  }
};
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí si es necesario */
.form-check-inline {
  display: flex;
  align-items: center;
}

.form-check-label {
  margin-right: 1px;
  /* Ajusta este valor según sea necesario */
}
</style>
