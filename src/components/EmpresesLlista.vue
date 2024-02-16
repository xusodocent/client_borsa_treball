<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1 class="text-center text-muted">Empreses</h1>
    <br />
    <input type="text" v-model="filtro" placeholder="Buscar..." />
    <br><br>
    <button class="btn btn-dark" @click="this.$router.push('/novaempresa')">
      <i class="fa-solid fa-plus"></i>Nova empresa
    </button>
    <br />
    <div id="tabla-personas">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 25%;">Nom</th>
            <th style="width: 15%;">Població</th>
            <th style="width: 15%;">Sector</th>
            <th style="width: 15%;">Telèfon</th>
            <th style="width: 30%;">Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in empresesFiltrades" :key="empresa.NIF">
            <td>{{ empresa.nom }}</td>
            <td>{{ empresa.poblacio }}</td>
            <td>{{ empresa.nomsector }}</td>
            <td>{{ empresa.telefon }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-success"
                @click="
                  this.$router.push({
                    path: `/empresafitxa/${empresa.NIF}`,
                    params: { nif: empresa.NIF },
                  })
                "
              >
                <i class="fa-regular fa-eye"></i>
                Veure
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteEmpresa(empresa.NIF)"
              >
                <i class="fa-regular fa-trash-can"></i>Eliminar
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                @click="
                  this.$router.push({
                    path: `/editaempresa/${empresa.NIF}`,
                    params: { nif: empresa.NIF },
                  })
                "
              >
                <i class="fa-solid fa-file-pen"></i>
                Modificar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-dark" @click="this.$router.push('/novaempresa')">
      <i class="fa-solid fa-plus"></i>Nova empresa
    </button>
    <br>
  </div>
</template>

<script>
export default {
  name: "EmpresesLlista",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      resposta: "",
      filtro:"",

      empreses: [
        {
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
        {
          NIF: "73596234Y",
          nom: "Víctor Huertas Mancebo",
          domicili: "C/ Del Niu 40",
          cpostal: "46410",
          poblacio: "Sueca",
          telefon: "640193306",
          email: "vsueca1989@gmail.com",
          web: null,
          idsector: 1,
          nomsector: "Informàtica",
        },
      ],
    };
  },
  methods: {
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
    postUsuario() {
      // Método para crear un usuario
    },
    putUsuario() {
      // Método para actualizar un usuario
    },
    async deleteEmpresa(nif) {
      let url = this.base_url + "/api/empresa/" + nif;
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
        await alert("Empresa eliminada");
        this.getEmpreses();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getEmpreses();
  },
  computed:{
    empresesFiltrades() {
      return this.empreses.filter(item => {
        return item.nom.toLowerCase().includes(this.filtro.toLowerCase());
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
