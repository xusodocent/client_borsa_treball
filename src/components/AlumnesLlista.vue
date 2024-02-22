<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1>Alumnes</h1>
    <br>
    <input type="text" v-model="filtro" placeholder="Buscar per cognom..." />
    <input type="text" v-model="filtroPoble" placeholder="Buscar per poble..." />
    <br /><br />
    <div id="tabla-personas">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Cognoms</th>
            <th>Població</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alumne in alumnesFiltrats" :key="alumne.id">
            <td>{{ alumne.id }}</td>
            <td>{{ alumne.nomalumne }}</td>
            <td>{{ alumne.cognoms }}</td>
            <td>{{ alumne.poblacio }}</td>
            <td>
              <button type="button" class="btn btn-outline-success" @click="
                this.$router.push({
                  path: `/alumnefitxa/${alumne.id}`,
                  params: { id: alumne.id },
                })
                ">
                <i class="fa-regular fa-eye"></i>
                Veure
              </button>
              <button type="button" class="btn btn-outline-danger" @click="deleteAlumne(alumne.id)">
                <i class="fa-regular fa-trash-can"></i>Eliminar
              </button>
              <button type="button" class="btn btn-outline-info" @click="
                this.$router.push({
                  path: `/editaalumne/${alumne.id}`,
                  params: { id: alumne.id },
                })
                ">
                <i class="fa-solid fa-file-pen"></i>
                Modificar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <button class="btn btn-dark" @click="this.$router.push('/noualumne')">
        <i class="fa-solid fa-plus"></i>Nou alumne
      </button>
    </div>
    <div v-if="eliminat_ok" class="alert alert-success">S'ha eliminat correctament l'alumne</div>
    <div v-if="eliminat_error" class="alert alert-danger">Errada eliminant alumnes</div>
  </div>
</template>

<script>
export default {
  name: "AlumnesLlista",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      filtro: "",
      filtroPoble: "",
      eliminat_ok: false,
      eliminat_error: false,
      alumnes: [{
        id: 1,
        nomalumne: "Fidel",
        cognoms: "Oltra",
        poblacio: "Sueca",
        telefon: "928329345556",
        email: "fidel@gmail.com",
        transport: true,
        actiu: false,
        pdf: true,
        cicles: [
          {
            id: 2,
            nomcicle: "DAW",
            graucicle: "S"
          },
          {
            id: 3,
            nomcicle: "DAM",
            graucicle: "S"
          }
        ],
        curriculum: {
          experiencia: "3 anys treballant de algo més",
          idiomes: "Anglés B2",
          estudis: "2 anys de matemàtiques",
          competencies: "Vàries"
        }
      }],
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
    async deleteAlumne(id) {
      this.eliminat_ok = false;
      this.eliminat_error = false;
      let url = this.base_url + "/api/alumne/" + id;
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
        if (this.resposta.ok == true) {
          this.eliminat_ok = true;

        }
        await alert("Alumne eliminat");
        this.getAlumnes();
      } catch (error) {
        this.eliminat_error = true;
        console.error(error);
      }
    },
  },
  mounted() {
    this.getAlumnes();
  },
  computed: {
    alumnesFiltrats() {
      return this.alumnes.filter(item => {
        return item.cognoms.toLowerCase().includes(this.filtro.toLowerCase()) && item.poblacio.toLowerCase().includes(this.filtroPoble.toLowerCase());
      });
    },
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
