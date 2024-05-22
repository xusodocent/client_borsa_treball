<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Ofertes</h1>
  <br>
  <input type="text" v-model="filtro" placeholder="Buscar per empresa..." />
  <div class="container">
    <br>
    <button class="btn btn-dark" @click="this.$router.push('/novaoferta')">
    <i class="fa-solid fa-plus"></i>Nova Oferta
  </button>
  <br>
    <div id="tabla-personas">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Data</th>
            <th>Estat</th>
            <th>Publicació</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="oferta in ofertesFiltrades" :key="oferta.id">
            <td>{{ oferta.empresa.nomempresa }}</td>
            <td>{{ oferta.data }}</td>
            <td>{{ oferta.estat }}</td>
            <td><a :href="oferta.urloferta">{{ oferta.urloferta }}</a></td>
            <td>
              <button
              type="button"
              class="btn btn-outline-success"
              @click="
                this.$router.push({
                  path: `/ofertafitxa/${oferta.id}`,
                  params: { id: oferta.id },
                })
              "
            >
              <i class="fa-regular fa-eye"></i>
              Veure
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteOferta(oferta.id)"
            >
              <i class="fa-regular fa-trash-can"></i>Eliminar
            </button>
            <button
              type="button"
              class="btn btn-outline-info"
              @click="
                this.$router.push({
                  path: `/editaoferta/${oferta.id}`,
                  params: { id: oferta.id },
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

  </div>
</template>

<script>
export default {
  name: "OfertesLlista",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      filtro:"",
      ofertes: [],
      ofertes2: [
        {
          id: 2,
          empresa: {
            nifempresa: "A46063418",
            nomempresa: "Odec",
          },
          data: "23/05/2023",
          estat: true,
          textoferta: "Programador web",
          experiencia: "Una miqueta",
          idiomes: "Anglés avançat",
          altres: "Cotxe propi",
          urloferta: "https://firmania.es/alzira/roberta-klein-1122897",
          cicles: [
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
        },
      ],
    };
  },
  methods:{
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
    async deleteOferta(id) {
      let url = this.base_url + "/api/oferta/" + id;
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });
        this.resposta = await response.json();
        await console.log(this.resposta);
        this.getOfertes();
      } catch (error) {
        console.error(error);
      }
    },
    
  },
  mounted(){
    this.getOfertes();
  },
  computed: {
    ofertesFiltrades() {
      return this.ofertes.filter(item => {
        return item.empresa.nomempresa.toLowerCase().includes(this.filtro.toLowerCase());
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
