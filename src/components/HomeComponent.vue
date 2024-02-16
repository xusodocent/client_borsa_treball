<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1>Aplicació de gestió de la borsa de treball</h1>
    <br />
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Backend</th>
          <th>IP</th>
        </tr>
      </thead>
      <tr>
        <td>Màquina virtual</td>
        <td>{{ base_url }}</td>
      </tr>
    </table>
    <br /><br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Empreses</th>
          <th>Alumnes</th>
          <th>Cicles</th>
          <th>Ofertes</th>
          <th>Contactes</th>
        </tr>
      </thead>
      <tr>
        <td>{{ num_empreses }}</td>
        <td>{{ num_alumnes }}</td>
        <td>{{ num_cicles }}</td>
        <td>{{ num_ofertes }}</td>
        <td>{{ num_contactes }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "HomeComponent",
  props: {
    //msg: String
    base_url: String,
  },
  data(){
    return{
      empreses:[],
      alumnes:[],
      contactes:[],
      cicles:[],
      ofertes:[]
    }
  },
  computed:{
    num_empreses(){
      return this.empreses.length;
    },
    num_ofertes(){
      return this.ofertes.length;
    },
    num_contactes(){
      return this.contactes.length;
    },
    num_alumnes(){
      return this.alumnes.length;
    },
    num_cicles(){
      return this.cicles.length;
    }
  },
  methods: {
    async getAlumnes() {
      let url = this.base_url + "/api/alumne/";
      try {
        const response = await fetch(url);
        this.resposta = await response.json();
        this.alumnes = this.resposta.alumnes;
        await console.log(this.alumnes);
      } catch (error) {
        console.error(error);
      }
    },
    async getContactes() {
      let url = this.base_url + "/api/contacte/";
      try {
        const response = await fetch(
          url
        );
        this.resposta = await response.json();
        this.contactes = this.resposta.contactes;
        await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async getEmpreses() {
      let url = this.base_url + "/api/empresa/";
      try {
        const response = await fetch(url);
        this.resposta = await response.json();
        this.empreses = this.resposta.empreses;
        await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async getOfertes() {
      let url = this.base_url + "/api/oferta";
      try {
        const response = await fetch(url);
        this.resposta = await response.json();
        this.ofertes = this.resposta.ofertes;
        await console.log(this.ofertes);
      } catch (error) {
        console.error(error);
      }
    },
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

  },
  mounted(){
    this.getAlumnes();
    this.getCicles();
    this.getContactes();
    this.getEmpreses();
    this.getOfertes();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
