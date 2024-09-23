<template>
  <div v-if="!token" class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center">Login</h2>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Usuari:</label>
                <input type="text" v-model="email" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="password" class="form-control" required />
              </div>
              <br>
              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="token" class="container mt-5">
    <p>Usuari: {{ usuariRegistrat }}</p>
    <button class="btn btn-danger" @click="logout">Eixir</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  props: {
    base_url: String,
  },
  data() {
    return {
      email: '',
      password: '',
      tokenUpdateTrigger: 0,  // variable reactiva para actualizar el token
    };
  },
  computed: {
    token() {
      this.tokenUpdateTrigger;  // forzar la actualización de la propiedad computada
      return localStorage.getItem('jwtToken');
    },
    usuariRegistrat() {
      this.tokenUpdateTrigger;  // forzar la actualización de la propiedad computada
      return localStorage.getItem('email');
    },
  },
  methods: {
    logout() {
      //alert('Tancant la sessió... fins prompte!');
      Swal.fire({
                        icon: 'info',
                        title: 'Tancant sessió!',
                        //showConfirmButton: false,
                        //timer: 2000
                    });
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('email');
      this.tokenUpdateTrigger++;  // actualizar el trigger para forzar la actualización de la propiedad computada
    },
    async login() {
      let url = this.base_url + "/auth";
      try {
        const response = await fetch(url, {
          method: 'POST',
          //mode: 'no-cors' ,
          headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'http://borsa.ieseljust.com/backend' // Afegeix el teu domini
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();
        if (!data.token) {
          //alert('Ha fallat el Login: ' + data.message);
          Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al realitzar la sol·licitud.' + data.message
                });
        } else {
          //alert('Login exitós: ' + this.email);
          Swal.fire({
                        icon: 'success',
                        title: 'Login exitós, benvingut!',
                        showConfirmButton: false,
                        timer: 2000
                    });
          const token = data.token;

          // Guardar el token en localStorage
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('email', this.email);
          this.tokenUpdateTrigger++;  // actualizar el trigger para forzar la actualización de la propiedad computada
        }

        // Redirigir o realizar otras acciones después del login exitoso
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Error:', error);
        //alert('Login failed: ' + error.message);
        Swal.fire({
                    icon: 'error',
                    title: 'Error intentant autenticar-se!',
                    text: 'Error al realitzar la sol·licitud.' + error.message
                });
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
