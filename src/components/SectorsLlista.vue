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
            <button type="button" class="btn btn-outline-danger" @click="confirmDeleteSector(sector.id)">
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
import Swal from 'sweetalert2';

export default {
  name: "SectorsLlista",
  props: {
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
      } catch (error) {
        console.error(error);
      }
    },
    confirmDeleteSector(id) {
      Swal.fire({
        title: 'Estàs segur?',
        text: "No podràs desfer aquesta acció!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimina-ho!',
        cancelButtonText: 'Cancel·la'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteSector(id);
        }
      });
    },
    async deleteSector(id) {
      this.eliminat_ok = false;
      this.eliminat_error = false;
      let url = this.base_url + "/api/sector/" + id;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        if (this.resposta.ok == true) {
          this.eliminat_ok = true;
          Swal.fire(
            'Eliminat!',
            'El sector s\'ha eliminat correctament.',
            'success'
          );
        } else {
          this.eliminat_error = true;
          Swal.fire(
            'Error!',
            'No s\'ha pogut eliminar el sector.',
            'error'
          );
        }
        this.getSectors();
      } catch (error) {
        this.eliminat_error = true;
        Swal.fire(
          'Error!',
          'No s\'ha pogut eliminar el sector.',
          'error'
        );
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
