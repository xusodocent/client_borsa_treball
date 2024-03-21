<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1 class="text-center text-muted">Llistat de cicles</h1>
    <br />
    <br />
    <div id="tabla-personas">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Grau</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cicle in cicles" :key="cicle.id">
            <td>{{ cicle.id }}</td>
            <td>{{ cicle.nomcicle }}</td>
            <td>{{ cicle.graucicle }}</td>
            <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteCicle(cicle.id)"
            >
              <i class="fa-regular fa-trash-can"></i>Eliminar
            </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <br /><br /><button
      class="btn btn-dark"
      @click="this.$router.push('/noucicle')"
    >
      <i class="fa-solid fa-plus"></i>Nou cicle
    </button>
  </div>
</template>

<script>
//import router from 'vue-router'
export default {
  name: "CiclesLlista",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      cicles: [
        {
          id: 1,
          nomcicle: "ASIX",
          graucicle: "S",
        },
        {
          id: 2,
          nomcicle: "DAW",
          graucicle: "S",
        },
        {
          id: 3,
          nomcicle: "DAM",
          graucicle: "S",
        },
      ],
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
    postUsuario() {
      // Método para crear un usuario
    },
    putUsuario() {
      // Método para actualizar un usuario
    },
    async deleteCicle(id) {
      let url = this.base_url + "/api/cicle/" + id;
      try {
        const response = await fetch(
          /*`http://10.2.0.126/api/empresa/${nif}`*/ url,
          {
            method: "DELETE",
          }
        );
        this.resposta = await response.json();
        //this.empreses = this.resposta.empreses;
        //await console.log(this.empreses);
        await alert("Cicle eliminat");
        this.getCicles();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted(){
    this.getCicles();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
