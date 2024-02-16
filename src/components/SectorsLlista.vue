<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Sectors</h1>
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
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="this.deleteSector(sector.id)"
            >
              <i class="fa-regular fa-trash-can"></i>Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <br />
  <button class="btn btn-dark" @click="this.$router.push('/nousector')">
    <i class="fa-solid fa-plus"></i>Nou sector
  </button>
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
          url
        );
        this.resposta = await response.json();
        this.sectors = this.resposta.sectors;
        //await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSector(id) {
      let url = this.base_url + "/api/sector/" + id;
      try {
        const response = await fetch(/*`http://10.2.0.126/api/empresa/${nif}`*/url, {
          method: "DELETE",
        });
        this.resposta = await response.json();
        //this.empreses = this.resposta.empreses;
        //await console.log(this.empreses);
        await alert("Sector eliminat");
        this.getSectors();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted(){
    this.getSectors();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
