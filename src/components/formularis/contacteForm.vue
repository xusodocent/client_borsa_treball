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
  </div>
</template>

<script>
export default {
  name: "ContacteFormulari",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
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
        const response = await fetch(url);
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
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const resposta = await response.json();
        if (resposta.ok) {
          alert("Contacte guardat correctament.");
          // Puedes redirigir a la página de contactes u otra acción necesaria
          //this.$router.push('/contactes');
        } else {
          alert("Error al guardar el contacte: " + resposta.error);
        }
      } catch (error) {
        console.error(error);
        alert("Error al realizar la solicitud.");
      }
    },
    cancelar() {
      // Puedes agregar lógica para manejar la cancelación
      this.$router.push('/contactes');
    },
  },
  mounted() {
    this.getEmpreses();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
