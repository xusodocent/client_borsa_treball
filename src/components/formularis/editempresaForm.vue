<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Editar empresa</h1>
  <div class="container">
    <form>
      <div class="row align-items-start">
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="nif" class="form-label">NIF</label>
          <input type="text" class="form-control" id="nif" required v-model="novaEmpresa.NIF"
            :placeholder="novaEmpresa.NIF" />
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
          <input type="url" class="form-control" id="web" required v-model="novaEmpresa.web" />
        </div>
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="sector" class="form-label">Sector</label>
          <select class="form-select" id="sector" required v-model="novaEmpresa.idsector" @change="onChangeSector">
            <option value="" disabled>Selecciona un sector</option>
            <option :value="String(sector.id)" v-for="sector in sectors" :key="sector.id">{{ sector.nomsector }}</option>
          </select>
        </div>
      </div>
      <br />

      <button type="submit" class="btn btn-outline-success" @click="putEmpresa()">
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
export default {
  name: "EmpresaFormulari",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      sectors: [
        {
          id: 1,
          nomsector: "Informàtica",
        },
        {
          id: 2,
          nomsector: "Agrària",
        }],
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
        sector: "1",
      },
      validat: false,
      enviat: false,
    };
  },
  methods: {
    onChangeSector() {
      console.log("Sector seleccionado:", this.novaEmpresa.idsector);
    },
    getNomSector(idsector) {
      // Método para obtener el nomsector correspondiente al idsector
      const sector = this.sectors.find(sector => sector.id === parseInt(idsector));
      return sector ? sector.nomsector : '';
    },
    async putEmpresa() {
      // Verifica si el idsector está presente
      if (!this.novaEmpresa.idsector) {
        alert("Selecciona un sector antes de enviar el formulario.");
        return;
      }

      let url = this.base_url + "/api/empresa/";
      console.log(JSON.stringify(this.novaEmpresa));
      try {
        // Asigna directamente el valor de nomsector desde novaEmpresa
        const selectedSector = this.sectors.find(sector => sector.id === parseInt(this.novaEmpresa.idsector));
        this.novaEmpresa.nomsector = selectedSector ? selectedSector.nomsector : '';

        const response = await fetch(url + this.$route.params.nif, {
          method: "PUT",
          body: JSON.stringify(this.novaEmpresa),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        this.resposta = await response.json();
        this.enviament_ok = await this.resposta.ok;
        if (this.resposta.ok) {
          // Muestra el alert si this.resposta.ok es cierto
          alert("S'ha modificat l'empresa correctament!");
        }

        this.enviament_ok = this.resposta.ok;
        //await alert("La resposta del servidor és: " + this.resposta.error);
        //await alert("La resposta del servidor és: " + this.resposta.ok);

      } catch (error) {
        console.error(error);
      }
    },

    async getEmpresa() {
      let url = this.base_url + "/api/empresa/";
      try {
        console.log("la ruta és" + this.$route.params.nif);
        const response = await fetch(
          url + this.$route.params.nif
        );
        this.resposta = await response.json();
        this.novaEmpresa = this.resposta.empresa;
        await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    postUsuario() {
      // Método para crear un usuario
    },
    putUsuario() {
      // Método para actualizar un usuario
    },
    deleteUsuario() {
      // Método para borrar un usuario
    },
    async getSectors() {
      let url = this.base_url + "/api/sector/";
      try {
        const response = await fetch(
          url
        );
        this.resposta = await response.json();
        this.sectors = this.resposta.sectors;
        //await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getEmpresa();
    this.getSectors();
  }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  