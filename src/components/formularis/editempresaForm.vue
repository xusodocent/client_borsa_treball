<template>
  <h1>Editar empresa</h1>
  <div class="container">
    <form v-if="!loading">
      <div class="row align-items-start">
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="nif" class="form-label">NIF</label>
          <input type="text" class="form-control" id="nif" required v-model="novaEmpresa.NIF" :placeholder="novaEmpresa.NIF" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="nom" class="form-label">Nom</label>
          <input type="text" class="form-control" id="nom" required v-model="novaEmpresa.nom" />
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label for="domicili" class="form-label">Domicili</label>
          <input type="text" class="form-control" id="domicili" required v-model="novaEmpresa.domicili" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="cp" class="form-label">CP</label>
          <input type="text" class="form-control" id="cp" required v-model="novaEmpresa.cpostal" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="poblacio" class="form-label">Població</label>
          <input type="text" class="form-control" id="poblacio" required v-model="novaEmpresa.poblacio" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="tfn" class="form-label">Tfn</label>
          <input type="tel" class="form-control" id="tfn" required v-model="novaEmpresa.telefon" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="email" class="form-label">Correu electrònic</label>
          <input type="email" class="form-control" id="email" required v-model="novaEmpresa.email" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="web" class="form-label">Web</label>
          <input type="url" class="form-control" id="web" v-model="novaEmpresa.web" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="sector" class="form-label">Sector</label>
          <select class="form-select" id="sector" required v-model="novaEmpresa.sector" @change="onChangeSector">
            <option value="" disabled>Selecciona un sector</option>
            <option :value="String(sector.id)" v-for="sector in sectors" :key="sector.id">{{ sector.nomsector }}</option>
          </select>
        </div>
      </div>
      <br />

      <button type="button" class="btn btn-outline-success" @click="putEmpresa()">
        <i class="fa-regular fa-floppy-disk"></i>Modificar
      </button>
      <button class="btn btn-outline-danger" @click="this.$router.push('/empreses')">
        <i class="fa-solid fa-xmark"></i>Cancelar
      </button>
    </form>
    <br>
    <div v-if="enviament_ok" class="alert alert-success">
      <h2>Empresa modificada correctament</h2>
    </div>
  </div>
</template>
  
<script>
import Swal from 'sweetalert2';
export default {
  name: "EmpresaFormulari",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
      sectors: [],
      enviament_ok: false,
      novaEmpresa: {
        NIF: "",
        nom: "",
        domicili: "",
        cpostal: "",
        poblacio: "",
        telefon: "",
        email: "",
        web: "",
        idsector: "",
        sector: "",
        nomsector: ""
      },
      validat: false,
      enviat: false,
      loading: true,
    };
  },
  methods: {
    onChangeSector() {
      console.log("Sector seleccionat:", this.novaEmpresa.sector);
    },
    async putEmpresa() {
      if (!this.novaEmpresa.sector) {
        alert("Selecciona un sector abans d'enviar el formulari.");
        return;
      }

      let url = this.base_url + "/api/empresa/";
      console.log("Estic enviant açò:" + JSON.stringify(this.novaEmpresa));
      try {
        const selectedSector = this.sectors.find(sector => sector.id === parseInt(this.novaEmpresa.sector));
        this.novaEmpresa.nomsector = selectedSector ? selectedSector.nomsector : '';

        const response = await fetch(url + this.novaEmpresa.NIF, {
          method: "PUT",
          body: JSON.stringify(this.novaEmpresa),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        this.resposta = await response.json();
        this.enviament_ok = this.resposta.ok;
        if (this.resposta.ok) {
          Swal.fire({
                        icon: 'success',
                        title: 'Empresa guardada correctament',
                        showConfirmButton: true,
                        timer: 2000
                    });
          this.$router.push('/empreses');
        }else {
          Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al guardar l\'empresa: ' + this.resposta.error
                    });
        }

        this.enviament_ok = this.resposta.ok;

      } catch (error) {
        console.error(error);
        Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al realitzar la sol·licitud.'
                });
      }
    },
    async getEmpresa() {
      let url = this.base_url + "/api/empresa/";
      try {
        console.log("la ruta és" + this.$route.params.nif);
        const response = await fetch(url + this.$route.params.nif, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }}
        );
        this.resposta = await response.json();
        this.novaEmpresa = this.resposta.empresa;
        this.novaEmpresa.sector = String(this.novaEmpresa.idsector);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getSectors() {
      let url = this.base_url + "/api/sector/";
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }}
        );
        this.resposta = await response.json();
        this.sectors = this.resposta.sectors;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getEmpresa();
    this.getSectors();
  }
};
</script>
  
<style scoped></style>
