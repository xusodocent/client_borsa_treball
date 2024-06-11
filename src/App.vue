<script>
import Sidebar from '@/components/sidebar/SideBar'
import { sidebarWidth } from '@/components/sidebar/state'
import authService from './services/authService'
import Swal from 'sweetalert2';

export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  },
  data(){
    return{
      base_url: "http://172.29.35.24",
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
  },
}
</script>
<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view :base_url="base_url"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>