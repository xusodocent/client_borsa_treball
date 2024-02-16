<template>
    <router-link to="/">Inici</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/empreses">Empreses</router-link>
  </template>
  
  <script>
  export default {
    name: 'MenuTop',
    props: {
      //msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>