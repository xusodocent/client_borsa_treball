<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1 class="text-center text-muted">Dades del contacte</h1>
    <br />
    <div id="tabla-personas">
      <table class="table table-striped">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{{ contacte.id }}</td>
          </tr>
          <tr>
            <th>Nom</th>
            <td>{{ contacte.nomcontacte }}</td>
          </tr>
          <tr class="odd-row">
            <th>Càrrec</th>
            <td>{{ contacte.carrec }}</td>
          </tr>
          <tr>
            <th>Empresa</th>
            <td>{{ contacte.empresa.nomempresa }}</td>
          </tr>
          <tr class="odd-row">
            <th>NIF Empresa</th>
            <td>{{ contacte.empresa.nifempresa }}</td>
          </tr>
          <tr>
            <th>Telèfon</th>
            <td>{{ contacte.telefon }}</td>
          </tr>
          <tr>
            <th>e-mail</th>
            <td>{{ contacte.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-dark" @click="this.$router.push('/contactes')">
      <i class="fa-solid fa-list"></i>Llista de Contactes
    </button>
  </div>
</template>

<script>
export default {
  name: "ContacteFitxa",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      contacte: {
        id: 4,
        nomcontacte: "Toni Sales / Mari Paz",
        carrec: "Gerent",
        telefon: "96 171 20 96 / 656971849",
        email: "info@agsoft.es",
        empresa: {
          nifempresa: "B97698708",
          nomempresa: "Aicom Global Software",
        },
      },
      validat: false,
      enviat: false,
    };
  },
  methods: {
    async getContacte() {
      let url = this.base_url + "/api/contacte/";
      try {
        console.log("la ruta és" + this.$route.params.id);
        const response = await fetch(url + this.$route.params.id);
        this.resposta = await response.json();
        this.contacte = this.resposta.contacte;
        await console.log(this.contacte);
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
    deleteUsuario() {
      // Método para borrar un usuario
    },
  },
  mounted() {
    this.getContacte();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
