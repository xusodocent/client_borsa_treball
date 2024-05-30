<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Dades Alumne</h1>
  <div class="container">
    <form @submit.prevent="this.postAlumne()">
      <div class="row align-items-start">
        <div class="col-lg-6 col-sm-12">
          <label for="nombre" class="form-label">Nom</label>
          <input type="text" class="form-control" id="nombre" required v-model="nouAlumne.nomalumne" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="apellido" class="form-label">Cognom</label>
          <input type="text" class="form-control" id="apellido" required v-model="nouAlumne.cognoms" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="telefono" class="form-label">Població</label>
          <input type="tel" class="form-control" id="poblacio" required v-model="nouAlumne.poblacio" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="telefono" class="form-label">Tfn</label>
          <input type="tel" class="form-control" id="telefono" required v-model="nouAlumne.telefon" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="correo" class="form-label">Correu electrònic</label>
          <input type="email" class="form-control" id="correo" required v-model="nouAlumne.email" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="telefono" class="form-label">Idiomes</label>
          <input type="tel" class="form-control" id="idiomes" required v-model="nouAlumne.idiomes" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="telefono" class="form-label">Estudis</label>
          <input type="tel" class="form-control" id="estudis" required v-model="nouAlumne.estudis" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="telefono" class="form-label">Competències</label>
          <input type="tel" class="form-control" id="competencies" required v-model="nouAlumne.competencies" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="cicles" class="form-label">Cicles</label>
          <select multiple class="form-select" id="cicles" v-model="nouAlumne.cicles" required >
            <option value="" disabled>Selecciona vàrios ciles amb Ctrl</option>
            <option :value="cicle.id" v-for="cicle in cicles" :key="cicle.id">
              {{ cicle.nomcicle }}
            </option>
          </select>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="activo" v-model="nouAlumne.transport"/>
            <label class="form-check-label" for="activo"> Transport </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="activo" v-model="nouAlumne.actiu"/>
            <label class="form-check-label" for="activo"> Actiu </label>
          </div>
        </div>
        <!---
        <div class="col-lg-6 col-sm-12">
          <label for="pdf" class="form-label">Currículum</label>
          <input type="file" class="form-control" id="pdf" />
        </div>
        -->
      </div>
      <div class="col">
        <br /><br />
        <button type="submit" class="btn btn-outline-success" :disabled="!validat">
          <i class="fa-regular fa-floppy-disk"></i>Afegir
        </button>
        <button
          class="btn btn-outline-danger"
          @click="this.$router.push('/alumnes')"
        >
          <i class="fa-solid fa-xmark"></i>Cancelar
        </button>
      </div>
      <br>
      <div class="alert alert-warning" v-if="!validat">Tots els camps de text són obligatoris</div>
      <div class="alert alert-success" v-if="enviament_ok">Alumne afegit correctament</div>
      <div v-if="enviament_ok"><button type="button" class="btn btn-info" @click="this.$router.push('/alumnes')">Veure</button></div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AlumneFormulari",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      token: "",
      nouAlumne: {
        nomalumne: "",
        cognoms: "",
        poblacio: "",
        telefon: "",
        email: "",
        transport: true,
        actiu: true,
        pdf: true,
        cicles: [],
        experiencia: "",
        idiomes: "Valencià, Castellà, Anglés, etc...",
        estudis: "Ciles formatius, universitat, etc...",
        competencies: "Totes",
      },
      cicles: [
       
      ],
      selectedCicles: [],
      //validat: false,
      enviament_ok: false,
    };
  },
  methods: {
    async getCicles() {
      let url = this.base_url + "/api/cicle/";
      try {
        const response = await fetch(url);
        this.resposta = await response.json();
        this.cicles = this.resposta.cicles;
        await console.log(this.cicles);
      } catch (error) {
        console.error(error);
      }
    },
    async postAlumne() {
      let url = this.base_url + "/api/alumne/";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.nouAlumne),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        this.resposta = await response.json();
        if (this.resposta.ok) {
          this.enviament_ok = true;
          alert("Alumne afegit correctament");
        }else{
          alert("Error al afegir alumne: " + this.resposta.error);
        }
        //this.empreses = this.resposta.empreses;
        //await console.log(this.empreses);
        //this.enviament_ok = await this.resposta.ok;
        //await alert("La resposta del servidor és: " + this.resposta.error);
      } catch (error) {
        alert("Error al afegir alumne: " + error);
        //console.error(error);
      }
    },
    async enviarCurriculum(){
      console.log("Enviament curriculum");
    }
  },
  mounted(){
    this.token = localStorage.getItem("token");
    this.getCicles();
  },
  computed:{
    //haz que todos los campos sean obligatorios
    //si no se han rellenado todos los campos
    //no se puede enviar el formulario
    validat(){
      //comprova que el mail siga vàlid
      //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }                
      return this.nouAlumne.nomalumne && this.nouAlumne.cognoms && this.nouAlumne.poblacio && this.nouAlumne.telefon && validateEmail(this.nouAlumne.email) && this.nouAlumne.idiomes && this.nouAlumne.estudis && this.nouAlumne.competencies && this.nouAlumne.cicles;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
