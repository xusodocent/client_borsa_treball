<template>
  <div>
    <h1>Editar Oferta</h1>
    <form action="" @submit.prevent class="row g-3">
      <div class="row align-items-start">
        <div class="col-lg-6 col-sm-12">
          <label for="empresa" class="form-label">Empresa</label>
          <select class="form-select" id="empresa" required v-model="oferta.empresa.nifempresa">
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
          <select multiple class="form-select" id="cicles" v-model="this.oferta.cicles" required>
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
import Swal from 'sweetalert2';

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
        nifempresa: "",
        nif: "",
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
    transformarOferta(ofertaRebuda) {
      const ofertaTransformada = {
        nifempresa: ofertaRebuda.nifempresa,
        nif: ofertaRebuda.empresa.NIF,
        data: ofertaRebuda.data,
        estat: ofertaRebuda.estat,
        textoferta: ofertaRebuda.textoferta,
        experiencia: ofertaRebuda.experiencia,
        idiomes: ofertaRebuda.idiomes,
        altres: ofertaRebuda.altres,
        urloferta: ofertaRebuda.urloferta,
        cicles: ofertaRebuda.cicles
      };

      return ofertaTransformada;
    },
    convertToISODate(dateStr) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    },
    eliminarNomIGrauCicle(json) {
      if (json.cicles && Array.isArray(json.cicles)) {
        json.cicles.forEach(cicle => {
          delete cicle.nomcicle;
          delete cicle.graucicle;
        });
      }
      return json;
    },
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
        //alert("Oferta: " + JSON.stringify(this.oferta));
        this.selectedCicles = this.oferta.cicles;
        this.oferta.empresa.NIF = this.oferta.nifempresa;
        //this.oferta.nif = this.oferta.empresa.NIF;
        //this.preseleccionarEmpresa(); // Preselecciona la empresa una vez cargada la oferta
        this.oferta.cicles = this.oferta.cicles.map(cicle => cicle.id) || [];
        this.oferta.data = this.convertToISODate(this.oferta.data);


        //alert("Oferta que carregue: " + JSON.stringify(this.oferta));
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en carregar oferta'
        });
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en carregar cicles'
        });
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
        console.log("Empreses: " + JSON.stringify(data.empreses));
        this.llistaEmpreses = data.empreses;
        //this.preseleccionarEmpresa(); // Preselecciona la empresa una vez cargadas las empresas
        //alert("Empreses: " + JSON.stringify(this.llistaEmpreses));
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en carregar empreses'
        });
      }
    },
    preseleccionarEmpresa() {
      if (this.oferta.nifempresa && this.llistaEmpreses.length > 0) {
        const empresaSeleccionada = this.llistaEmpreses.find(empresa => empresa.NIF === this.oferta.empresa.NIF);
        if (empresaSeleccionada) {
          this.oferta.empresa.NIF = empresaSeleccionada.NIF;
        }
      }
    },
    async updateOferta() {
      this.oferta = this.eliminarNomIGrauCicle(this.oferta);
      if (this.oferta.empresa) {
        this.oferta.nif = this.oferta.empresa.nifempresa;
        //alert("Oferta.nif: " + this.oferta.nif);
      }else{
        //alert("No hi ha empresa");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en seleccionar una empresa...'
        });
      }
      //alert("Oferta: " + JSON.stringify(this.oferta));
      if (!this.oferta.empresa.nifempresa) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cal seleccionar una empresa...'
        });
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
          Swal.fire({
            icon: 'success',
            title: 'Oferta actualitzada correctament',
            showConfirmButton: true,
          });
          this.afegit_ok = true;
          this.$router.push("/ofertes");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La resposta del servidor és: ' + resposta.error
          });
          this.afegit_error = true;
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en afegir oferta'
        });
        this.afegit_error = true;
      }
    },
  },
  async mounted() {
    this.token = localStorage.getItem("jwtToken");
    await this.getEmpreses();
    await this.getCicles();
    await this.getOferta();
    //await this.preseleccionarEmpresa();
  },
};
</script>

<style scoped>
/* Afegiu estils específics aquí si cal */
</style>
