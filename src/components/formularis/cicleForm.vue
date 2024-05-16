<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Nou cicle</h1>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="nom" class="form-label">Cicle</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          aria-describedby="nomHelp"
          v-model="nouCicle.nomcicle"
        />
        <div id="emailHelp" class="form-text">
          Escriu el nom del cicle formatius
        </div>
      </div>
      <br />
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <label for="cicles" class="form-label">Grau/Nivell formatiu</label>
        <select
          name="cicles"
          id="cicles"
          class="form-select"
          aria-label="Default select example"
          v-model="nouCicle.graucicle"
        >
          <option value="" selected>--- Tria opció ---</option>
          <option value="B">Formació Professional Bàsica</option>
          <option value="M">Grau Mitjà</option>
          <option value="S">Grau Superior</option>
          <option value="E">Curs d'Especialització</option>
        </select>
      </div>
      <div class="col-lg-2">
        <br /><br />
        <button type="submit" class="btn btn-outline-success" @click="this.postCicle()">
          <i class="fa-regular fa-floppy-disk"></i>Afegir
        </button>
        <button
          class="btn btn-outline-danger"
          @click="this.$router.push('/cicles')"
        >
          <i class="fa-solid fa-xmark"></i>Cancelar
        </button>
      </div>
      <br>
      <div v-if="afegit_ok" class="alert alert-success">S'ha afegit correctament el cicle</div>
      <div v-if="afegit_error" class="alert alert-danger">Errada afegint el cicle</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CicleFormulari",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      nouCicle: {
        nomcicle: "",
        graucicle: "",
      },
      //validat: false,
      //enviat: false,
      afegit_ok: false,
      afegit_error: false,
    };
  },
  methods:{
    async postCicle() {
      let url = this.base_url + "/api/cicle/";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.nouCicle),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        this.resposta = await response.json();
        //this.empreses = this.resposta.empreses;
        alert("La resposta del servidor és: " + this.resposta);
        this.afegit_ok = await this.resposta.ok;
        if (this.afegit_ok) {
          alert("Cicle afegit correctament");
          this.afegit_ok = true;
        } else {
          alert("Error afegint el cicle: " + this.resposta.error);
          this.afegit_error = true;
        }
        //await alert("La resposta del servidor és: " + this.resposta.error);
      } catch (error) {
        this.afegit_error = true;
        alert("Error afegint el cicle: " + error);
        
        alert("afegit_error: " + this.afegit_error);
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
