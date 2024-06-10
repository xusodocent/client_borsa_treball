<template>
  <div class="container">
    <h1 class="text-center fw-bold text-primary">Llistat de cicles</h1>
    <hr>
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
              <button type="button" class="btn btn-outline-danger" @click="confirmDeleteCicle(cicle.id)">
                <i class="fa-regular fa-trash-can"></i>Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <br /><br /><button class="btn btn-dark" @click="this.$router.push('/noucicle')">
      <i class="fa-solid fa-plus"></i>Nou cicle
    </button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "CiclesLlista",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
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
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        this.cicles = this.resposta.cicles;
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
    confirmDeleteCicle(id) {
      Swal.fire({
        title: 'Estàs segur?',
        text: "No podràs revertir això!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar-ho!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCicle(id);
        }
      });
    },
    async deleteCicle(id) {
      let url = this.base_url + "/api/cicle/" + id;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        Swal.fire(
          'Eliminat!',
          'El cicle ha estat eliminat.',
          'success'
        );
        this.getCicles();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem('jwtToken');
    this.getCicles();
  }
};
</script>

<style scoped></style>
