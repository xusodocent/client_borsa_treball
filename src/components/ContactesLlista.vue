<template>
  <div class="container">
    <h1 class="text-center fw-bold text-primary">Contactes</h1>
    <hr>
    <br />
    <input type="text" v-model="filtro" placeholder="Buscar per nom..." />
    <input type="text" v-model="filtroEmpresa" placeholder="Buscar per empresa..." />
    <br><br>
    <button class="btn btn-dark" @click="this.$router.push('/noucontacte')">
      <i class="fa-solid fa-plus"></i>Nou contacte
    </button>
    <br>
    <div id="tabla-personas">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 25%;">Nom</th>
            <th style="width: 15%;">Empresa</th>
            <th style="width: 15%;">Correu</th>
            <th style="width: 40%;">Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contacte in contactesFiltrats" :key="contacte.id">
            <td>{{ contacte.nomcontacte }}</td>
            <td>{{ contacte.empresa.nomempresa }}</td>
            <td>{{ contacte.email }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-success"
                @click="
                  this.$router.push({
                    path: `/contactefitxa/${contacte.id}`,
                    params: { id: contacte.id },
                  })
                "
              >
                <i class="fa-regular fa-eye"></i>
                Veure
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="confirmDelete(contacte.id)"
              >
                <i class="fa-regular fa-trash-can"></i>Eliminar
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                @click="
                  this.$router.push({
                    path: `/editacontacte/${contacte.id}`,
                    params: { id: contacte.id },
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
    <button class="btn btn-dark" @click="this.$router.push('/noucontacte')">
      <i class="fa-solid fa-plus"></i>Nou contacte
    </button>
    <br>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "ContactesLlista",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
      filtro: "",
      filtroEmpresa: "",
      contactes: [
        {
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
        {
          id: 5,
          nomcontacte: "Xavi",
          carrec: "Gerent",
          telefon: "647430516",
          email: "xavi@grupapunts.es",
          empresa: {
            nifempresa: "B97733380",
            nomempresa: "Apunts Informàtica i Telecomunicacions,S.L.",
          },
        },
      ],
    };
  },
  methods: {
    async getContactes() {
      let url = this.base_url + "/api/contacte/";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
      });
        this.resposta = await response.json();
        this.contactes = this.resposta.contactes;
        await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteContacte(id) {
      let url = this.base_url + "/api/contacte/" + id;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        await Swal.fire('Contacte eliminat', '', 'success');
        this.getContactes();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No s\'ha pogut eliminar el contacte', 'error');
      }
    },
    confirmDelete(id) {
      Swal.fire({
        title: 'Estàs segur?',
        text: "No podràs revertir això!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancel·lar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteContacte(id);
        }
      });
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getContactes();
  },
  computed:{
    contactesFiltrats() {
      return this.contactes.filter(item => {
        return item.nomcontacte.toLowerCase().includes(this.filtro.toLowerCase()) && item.empresa.nomempresa.toLowerCase().includes(this.filtroEmpresa.toLowerCase());
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
