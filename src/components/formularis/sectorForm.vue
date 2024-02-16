<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Editar Sector</h1>
  <div class="container">
    <form action="">
      <div class="col">
        <label for="nom" class="form-label">Sector</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          aria-describedby="nomHelp"
          v-model="nouSector.nomsector"
        />
        <div id="emailHelp" class="form-text">Escriu el nom del sector</div>
      </div>
      <div class="col">
        <br /><br />
        <button type="submit" class="btn btn-outline-success" @click="this.postSector()">
          <i class="fa-regular fa-floppy-disk"></i>Afegir
        </button>
        <button
          class="btn btn-outline-danger"
          @click="this.$router.push('/sectors')"
        >
          <i class="fa-solid fa-xmark"></i>Cancelar
        </button>
      </div>
    </form>
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
      nouSector: {
        id: "",
        nomsector: "",
      },
      validat: false,
      enviat: false,
    };
  },
  methods: {
    async postSector() {
      let url = this.base_url + "/api/sector/";
      await console.log(JSON.stringify(this.nouSector));
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.nouSector),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        this.resposta = await response.json();
        //this.empreses = this.resposta.empreses;
        //await console.log(this.empreses);
        this.enviament_ok = await this.resposta.ok;
        await alert("La resposta del servidor és: " + this.resposta.error);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
