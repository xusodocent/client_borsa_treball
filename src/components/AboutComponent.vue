<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <menu-top></menu-top>
    </div>
    <h1>About</h1>
  </template>
  
  <script>
  import MenuTop from './MenuTop.vue'
  export default {
    name: 'AboutComponent',
    props: {
      //msg: String
    },
    components: {MenuTop},
    setup() {
    return { MenuTop }
  }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  