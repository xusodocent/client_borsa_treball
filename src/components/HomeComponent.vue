<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1 class="text-center fw-bold text-primary">Aplicació de gestió de la borsa de treball</h1>
    <hr>
    <br />
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Backend</th>
          <th>IP</th>
        </tr>
      </thead>
      <tr>
        <td>VPS</td>
        <td>{{ base_url }}</td>
      </tr>
    </table>
    <br /><br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Empreses</th>
          <th>Alumnes</th>
          <th>Cicles</th>
          <th>Ofertes</th>
          <th>Contactes</th>
        </tr>
      </thead>
      <tr>
        <td>{{ num_empreses }}</td>
        <td>{{ num_alumnes }}</td>
        <td>{{ num_cicles }}</td>
        <td>{{ num_ofertes }}</td>
        <td>{{ num_contactes }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import authService from '@/services/authService';
import Swal from 'sweetalert2';
export default {
  name: "HomeComponent",
  props: {
    //msg: String
    base_url: String,
  },
  data() {
    return {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTY5OTIxNjQsImV4cCI6MTcxNjk5NTc2NCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Inh1c0BnbWFpbC5jb20ifQ.UHIpH4q7SnZP_7FH0N8Yv8gy_XpvuTGXMlpXp_TqjVBtyf0PgK3DWPdiah1TWzbxWlBD3MjX1Yc6vNq8W9bqZIOjFtnYawBd9h9mlg1LJwF_WkY90UujajhGPYNLf-u-3lEk8Z6_IaWewFFQRGeUd7j2S6-WiSj3KACMrwA2t_LG9DxyyFFy7WxbtNsRF6S28ldwvqBAhDPhVmoCdaGUzm1EaFd5bL1Gd9UjMl-rThlaKufAHg3L5Lp9Mz5TGqdDWlGcFWYBxHRYH8AlbHcKeUl6V1yW917THecoZAsahkh0CuWcZcKfBZdVwEIeUUFJoxELj5WL1QxhM8DoqZ1KfA",
      empreses: [],
      alumnes: [],
      contactes: [],
      cicles: [],
      ofertes: []
    }
  },
  computed: {
    num_empreses() {
      return this.empreses.length;
    },
    num_ofertes() {
      return this.ofertes.length;
    },
    num_contactes() {
      return this.contactes.length;
    },
    num_alumnes() {
      return this.alumnes.length;
    },
    num_cicles() {
      return this.cicles.length;
    }
  },
  methods: {
    async getAlumnes() {
      let url = this.base_url + "/api/alumne/";
      try {
        const response = await fetch(url, {
          method: 'GET', // o 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        this.alumnes = this.resposta.alumnes;
        await console.log(this.alumnes);
      } catch (error) {
        console.error(error);
      }
    },
    async getContactes() {
      let url = this.base_url + "/api/contacte/";
      try {
        const response = await fetch(
          url, {
          method: 'GET', // o 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
        );
        this.resposta = await response.json();
        this.contactes = this.resposta.contactes;
        await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async getEmpreses() {
      let url = this.base_url + "/api/empresa/";
      try {
        const response = await fetch(url, {
          method: 'GET', // o 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        this.empreses = this.resposta.empreses;
        await console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    async getOfertes() {
      let url = this.base_url + "/api/oferta";
      try {
        const response = await fetch(url, {
          method: 'GET', // o 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        this.ofertes = this.resposta.ofertes;
        await console.log(this.ofertes);
      } catch (error) {
        console.error(error);
      }
    },
    async getCicles() {
      let url = this.base_url + "/api/cicle/";
      try {
        const response = await fetch(url, {
          method: 'GET', // o 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        this.cicles = this.resposta.cicles;
        await console.log(this.cicles);
      } catch (error) {
        console.error(error);
      }
    },
    getToken() {
      this.token = localStorage.getItem('jwtToken');
    }

  },
  mounted() {
    if (authService.isTokenExpired()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La sessió ha expirat.'
      });
      authService.logout();
      this.$router.push({ name: 'login' });
    }
    this.getToken();
    this.getAlumnes();
    this.getCicles();
    this.getContactes();
    this.getEmpreses();
    this.getOfertes();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
