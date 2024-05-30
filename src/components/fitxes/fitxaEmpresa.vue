<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1 class="text-center fw-bold text-primary">Dades de: {{ empresa.nom }}</h1>
    <br />
    <div id="tabla-personas">
      <table class="table table-striped">
        <tbody>
            <tr class="odd-row">
          <th>NIF</th>
          <td>{{ empresa.NIF }}</td>
        </tr>
        <tr>
          <th>Nom</th>
          <td>{{ empresa.nom }}</td>
        </tr>
        <tr class="odd-row">
          <th>Domicili</th>
          <td>{{ empresa.domicili }}</td>
        </tr>
        <tr>
          <th>Població</th>
          <td>{{ empresa.poblacio }}</td>
        </tr>
        <tr class="odd-row">
          <th>Codi Postal</th>
          <td>{{ empresa.cpostal }}</td>
        </tr>
        <tr>
          <th>Telèfon</th>
          <td>{{ empresa.telefon }}</td>
        </tr>
        <tr class="odd-row">
          <th>e-mail</th>
          <td>{{ empresa.email }}</td>
        </tr>
        <tr>
          <th>Web</th>
          <td>{{ empresa.web }}</td>
        </tr>
        <tr class="odd-row">
          <th>Sector</th>
          <td>{{ empresa.nomsector }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-dark" @click="this.$router.push('/novaempresa')">
      <i class="fa-solid fa-plus"></i>Nova empresa
    </button>
  </div>
</template>

<script>
export default {
  name: "EmpresaFitxa",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      token: "",
      empresa: {
        NIF: "21507431Q",
        nom: "Roberta Klein",
        domicili: "C/ Nuestra Señora De Luján 1 - ENTLO A",
        cpostal: "46600",
        poblacio: "Alzira",
        telefon: "960624308 Ext 610",
        email: "andres@robertaklein.com",
        web: "https://gestion.robertaklein.com/",
        idsector: 1,
        nomsector: "Informàtica",
      },
      validat: false,
      enviat: false,
    };
  },
  methods: {
    async getEmpresa() {
      let url = this.base_url + "/api/empresa/";
      try {
        console.log("la ruta és" + this.$route.params.nif);
        const response = await fetch(
          url + this.$route.params.nif, 
          {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
          }
        );
        this.resposta = await response.json();
        this.empresa = this.resposta.empresa;
        await console.log(this.empreses);
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
    this.token = localStorage.getItem("jwtToken");
    this.getEmpresa();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
