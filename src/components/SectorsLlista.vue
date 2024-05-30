<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1 class="text-center fw-bold text-primary">Sectors</h1>
  <hr>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Sector</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sector in sectors" :key="sector.id">
          <td>{{ sector.id }}</td>
          <td>{{ sector.nomsector }}</td>
          <td>
            <button type="button" class="btn btn-outline-danger" @click="this.deleteSector(sector.id)">
              <i class="fa-regular fa-trash-can"></i>Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <button class="btn btn-dark" @click="this.$router.push('/nousector')">
      <i class="fa-solid fa-plus"></i>Nou sector
    </button>
    <div v-if="eliminat_ok" class="alert alert-success">S'ha eliminat correctament el sector</div>
    <div v-if="eliminat_error" class="alert alert-danger">Errada eliminant sectors</div>
  </div>
</template>

<script>
export default {
  name: "SectorsLlista",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      token: "",
      eliminat_ok: false,
      eliminat_error: false,
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
    };
  },
  methods: {
    async getSectors() {
      let url = this.base_url + "/api/sector/";
      try {
        const response = await fetch(
          url, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
          }
        );
        this.resposta = await response.json();
        this.sectors = this.resposta.sectors;
        //await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSector(id) {
      this.eliminat_ok = false;
      this.eliminat_error = false;
      let url = this.base_url + "/api/sector/" + id;
      try {
        const response = await fetch(/*`http://10.2.0.126/api/empresa/${nif}`*/url, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        //this.empreses = this.resposta.empreses;
        //await console.log(this.empreses);
        //await alert("Sector eliminat");
        if (this.resposta.ok == true) {
          this.eliminat_ok = true;
        } 
        this.getSectors();
      } catch (error) {
        this.eliminat_error = true;
        console.error(error);
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getSectors();
    this.eliminat_ok = false;
    this.eliminat_error = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
