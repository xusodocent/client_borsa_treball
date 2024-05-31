<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Afegir Sector</h1>
  <div class="container">
    <form action="" @submit.prevent>
      <div class="col">
        <label for="nom" class="form-label">Sector</label>
        <input type="text" class="form-control" id="nom" aria-describedby="nomHelp" v-model="nouSector.nomsector" />
        <div id="emailHelp" class="form-text">Escriu el nom del sector</div>
      </div>
      <div class="col">
        <br /><br />
        <button type="submit" class="btn btn-outline-success" @click="this.postSector()">
          <i class="fa-regular fa-floppy-disk"></i>Afegir
        </button>
        <button class="btn btn-outline-danger" @click="this.$router.push('/sectors')">
          <i class="fa-solid fa-xmark"></i>Cancelar
        </button>
      </div>
    </form>
    <br>
    <br>
    <div v-if="afegit_ok" class="alert alert-success">S'ha afegit correctament el sector</div>
    <div v-if="afegit_error" class="alert alert-danger">Errada afegint sectors</div>
  </div>
</template>

<script>
export default {
  name: "SectorFormulari",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      token: "",
      nouSector: {
        //id: "",
        nomsector: "",
      },
      validat: false,
      enviat: false,
      afegit_ok: false,
      afegit_error: false,
    };
  },
  methods: {
    async postSector() {
      this.afegit_ok = false;
      this.afegit_error = false;
      let url = this.base_url + "/api/sector/";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.nouSector),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        console.log(response);
        const resposta = await response.json();
        //this.empreses = resposta.empreses;
        console.log(resposta);
        //this.enviament_ok = resposta.ok;
        if (resposta.ok) {
          alert("Sector afegit correctament");
          this.afegit_ok = true;
        }
        else {
          alert("La resposta del servidor és: " + resposta.error);
          this.afegit_error = true;
        }

      } catch (error) {
        alert("Error afegint sector");
        this.afegit_error = true;
        console.error(error);
      }
    },

  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
