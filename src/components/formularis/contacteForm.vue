<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Crear Contacte</h1>
  <div class="container">
    <form>
      <div class="row align-items-start">
        <div class="col-lg-6 col-sm-12">
          <label for="nombre" class="form-label">Nom</label>
          <input type="text" class="form-control" id="nombre" required v-model="nouContacte.nomcontacte" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="cargo" class="form-label">Càrrec</label>
          <input type="text" class="form-control" id="cargo" required v-model="nouContacte.carrec" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="telefono" class="form-label">Telèfon</label>
          <input type="tel" class="form-control" id="telefono" required v-model="nouContacte.telefon" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="correo" class="form-label">Correu electrònic</label>
          <input type="email" class="form-control" id="correo" required v-model="nouContacte.email" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="empresa" class="form-label">Empresa</label>
          <select class="form-select" id="sector" required v-model="nouContacte.nifempresa" @change="onChangeEmpresa">
            <option value="" disabled>Selecciona una</option>
            <option :value="String(empresa.NIF)" v-for="empresa in llistaEmpreses" :key="empresa.NIF">{{ empresa.nom }}
            </option>
          </select>
        </div>
      </div>
    </form>
  </div>
  <div class="col">
    <br /><br />
    <button type="submit" class="btn btn-outline-success" @click="guardarContacte()">
      <i class="fa-regular fa-floppy-disk"></i>Afegir
    </button>
    <button class="btn btn-outline-danger" @click="this.$router.push('/contactes')">
      <i class="fa-solid fa-xmark"></i>Cancelar
    </button>
    <br>
    <br>
    <div v-if="afegit_ok" class="alert alert-success">
      <h2>Contacte afegit correctament</h2>
    </div>
    <div v-if="afegit_error" class="alert alert-danger">Errada afegint el contacte</div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "ContacteFormulari",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      token: "",
      afegit_error: false,
      afegit_ok: false,
      nouContacte: {
        nomcontacte: "",
        carrec: "",
        telefon: "",
        email: "",
        nifempresa: ""
      },
      llistaEmpreses: []
    };
  },
  methods: {
    onChangeEmpresa() {
      console.log(this.nouContacte.nifempresa);
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
    async guardarContacte() {
      let url = this.base_url + "/api/contacte/";
      console.log(this.nouContacte.nifempresa);
      try {
        const response = await fetch(url, {
          method: "POST", // O el método que tu API requiera
          body: JSON.stringify(this.nouContacte),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        const resposta = await response.json();
        if (resposta.ok) {
          //alert("Contacte guardat correctament.");
          Swal.fire({
            title: 'Contacte afegit correctament',
            icon: 'success',
            confirmButtonText: 'D\'acord'
          });
          this.afegit_ok = true;
          // Puedes redirigir a la página de contactes u otra acción necesaria
          //this.$router.push('/contactes');
        } else {
          this.afegit_error = true;
          //alert("Error al guardar el contacte: " + resposta.error);
          Swal.fire({
            title: 'Error afegint el contacte',
            text: resposta.error,
            icon: 'error',
            confirmButtonText: 'D\'acord'
          });
        }
      } catch (error) {
        this.afegit_error = true;
        console.error(error);
        //alert("Error al guardar el contacte: " + error);
        Swal.fire({
          title: 'Error afegint el contacte',
          text: error,
          icon: 'error',
          confirmButtonText: 'D\'acord'
        });
      }
    },
    cancelar() {
      // Puedes agregar lógica para manejar la cancelación
      this.$router.push('/contactes');
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getEmpreses();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
