<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Nova empresa</h1>
  <div class="container">
    <form>
      <div class="row align-items-start">
        <div class="col col-md-4 col-sm-12 col-xs-12">
          <label for="nif" class="form-label">NIF</label>
          <input type="text" class="form-control" id="nif" required v-model="novaEmpresa.NIF" />
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
          <select class="form-select" id="sector" required v-model="novaEmpresa.sector" @change="onChangeSector">
            <option value="" disabled>Selecciona un sector</option>
            <option :value="String(sector.id)" v-for="sector in sectors" :key="sector.id">{{ sector.nomsector }}
            </option>
          </select>
        </div>
      </div>
      <br />

      <button type="submit" class="btn btn-outline-success" @click="postEmpresa()">
        <i class="fa-regular fa-floppy-disk"></i>Afegir
      </button>
      <button class="btn btn-outline-danger" @click="this.$router.push('/empreses')">
        <i class="fa-solid fa-xmark"></i>Cancelar
      </button>
    </form>
    <br>
    <div v-if=false class="alert alert-success">
      <h2>Empresa afegida correctament</h2>
    </div>
    <div v-if=false class="alert alert-danger">Errada afegint l'empresa</div> 
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "EmpresaFormulari",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      token: "",
      sectors: [
        {
          id: 1,
          nomsector: "Informàtica",
        },
        {
          id: 2,
          nomsector: "Agrària",
        },
      ],
      enviament_ok: false,
      afegit_error: false,
      novaEmpresa: {
        NIF: "",
        nom: "",
        domicili: "",
        cpostal: "",
        poblacio: "",
        telefon: "",
        email: "",
        web: "",
        sector: 1,
        nomsector: ""
      },
      validat: false,
      enviat: false,
    };
  },
  methods: {
    onChangeSector() {
      console.log("Sector seleccionado:", this.novaEmpresa.sector);
    },
    getNomSector(idsector) {
      // Método para obtener el nomsector correspondiente al idsector
      const sector = this.sectors.find(sector => sector.id === parseInt(idsector));
      return sector ? sector.nomsector : '';
    },
    async getSectors() {
      let url = this.base_url + "/api/sector/";
      try {
        const response = await fetch(
          url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        },
        );
        this.resposta = await response.json();
        this.sectors = this.resposta.sectors;
        //await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async postEmpresa() {
      // Verifica si el idsector está presente
      if (!this.novaEmpresa.sector) {
        //alert("Selecciona un sector antes de enviar el formulario.");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Selecciona un sector abans d\'enviar el formulari.',
        });
        return;
      }

      let url = this.base_url + "/api/empresa/";
      try {
        // Asigna directamente el valor de nomsector desde novaEmpresa
        const selectedSector = this.sectors.find(sector => sector.id === parseInt(this.novaEmpresa.sector));
        this.novaEmpresa.nomsector = selectedSector ? selectedSector.nomsector : '';

        await console.log(JSON.stringify(this.novaEmpresa));
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.novaEmpresa),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        this.resposta = await response.json();
        this.enviament_ok = await this.resposta.ok;
        if (this.enviament_ok) {
          //alert("Empresa afegida correctament");
          Swal.fire({
            icon: 'success',
            title: 'Empresa afegida',
            text: 'L\'empresa s\'ha afegit correctament.',
            showConfirmButton: true,
          });
          this.$router.push("/empreses");
        } else {
          this.afegit_error = true;
          //alert("Error en l'operació, a resposta del servidor és: " + this.resposta.error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en l\'enviament de dades, el servidor diu: ' + this.resposta.error,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        this.afegit_error = true;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en l\'enviament de dades: ' + error,
        });

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
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getSectors();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>