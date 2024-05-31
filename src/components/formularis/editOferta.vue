<template>
  <div>
    <h1>Editar Oferta</h1>
    <form action="" @submit.prevent class="row g-3">
      <div class="row align-items-start">
        <div class="col-lg-6 col-sm-12">
          <label for="empresa" class="form-label">Empresa</label>
          <select class="form-select" id="empresa" required v-model="oferta.empresa.NIF">
            <option value="" disabled>Selecciona una</option>
            <option :value="empresa.NIF" v-for="empresa in llistaEmpreses" :key="empresa.NIF">{{ empresa.nom }}</option>
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
          <label for="experiencia" class="form-label">Experiència</label>
          <input type="text" class="form-control" id="experiencia" v-model="oferta.experiencia" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="idiomes" class="form-label">Idiomes</label>
          <input type="text" class="form-control" id="idiomes" v-model="oferta.idiomes" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="altres" class="form-label">Altres requisits</label>
          <input type="text" class="form-control" id="altres" v-model="oferta.altres" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="urloferta" class="form-label">URL de l'oferta</label>
          <input type="url" class="form-control" id="urloferta" v-model="oferta.urloferta" required>
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="cicles" class="form-label">Cicles</label>
          <select multiple class="form-select" id="cicles" v-model="selectedCicles" required>
            <option value="" disabled>Selecciona diversos cicles amb Ctrl</option>
            <option :value="cicle.id" v-for="cicle in cicles" :key="cicle.id">{{ cicle.nomcicle }}</option>
          </select>
        </div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="updateOferta">Enviar Oferta</button>
      </div>
    </form>
    <div v-if="afegit_ok" class="alert alert-success">Oferta afegida correctament</div>
    <div v-if="afegit_error" class="alert alert-danger">Error en afegir oferta</div>
  </div>
</template>

<script>
export default {
  name: "OfertaFormulari",
  props: {
    base_url: String,
    ofertaId: Number,
  },
  data() {
    return {
      token: "",
      oferta: {
        empresa: { NIF: "" },
        data: "",
        estat: true,
        textoferta: "",
        experiencia: "",
        idiomes: "",
        altres: "",
        urloferta: "",
        cicles: [],
      },
      selectedCicles: [],
      llistaEmpreses: [],
      cicles: [],
      afegit_ok: false,
      afegit_error: false,
    };
  },
  methods: {
    async getOferta() {
      let url = this.base_url + "/api/oferta/" + this.$route.params.id;
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        const data = await response.json();
        this.oferta = data.oferta;
        this.selectedCicles = this.oferta.cicles;
      } catch (error) {
        console.error(error);
      }
    },
    async getCicles() {
      let url = this.base_url + "/api/cicle/";
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        const data = await response.json();
        this.cicles = data.cicles;
      } catch (error) {
        console.error(error);
      }
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
        const data = await response.json();
        this.llistaEmpreses = data.empreses;
      } catch (error) {
        console.error(error);
      }
    },
    async updateOferta() {
      if (!this.oferta.empresa.NIF) {
        alert("Cal seleccionar una empresa...");
        return;
      }
      this.afegit_ok = false;
      this.afegit_error = false;
      let url = this.base_url + "/api/oferta/" + this.$route.params.id;
      try {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(this.oferta),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        const resposta = await response.json();
        if (resposta.ok) {
          alert("Oferta actualitzada correctament");
          this.afegit_ok = true;
        } else {
          alert("La resposta del servidor és: " + resposta.error);
          this.afegit_error = true;
        }
      } catch (error) {
        console.error(error);
        this.afegit_error = true;
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getOferta().then(() => {
      this.getEmpreses();
      this.getCicles();
    });
  },
};
</script>

<style scoped>
/* Afegiu estils específics aquí si cal */
</style>
