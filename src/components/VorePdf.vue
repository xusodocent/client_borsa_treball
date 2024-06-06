<template>
    <div>
      <PDF :src="pdfUrl" :accessToken="token"></PDF>
    </div>
  </template>
  
  <script>
  import { PDF } from 'vue-pdf';
  
  export default {
    name: 'PDFViewer',
    components: {
      PDF,
    },
    props: {
      token: {
        type: String,
        required: true,
      },
      base_url: {
        type: String,
        required: true,
      },
      alumne: {
        type: Object,
        required: true,
      },
    },
    computed: {
      pdfUrl() {
        // Suposem que la URL del PDF és proporcionada per una API
        return `${this.base_url}/api/alumne/download/${this.alumne.id}?token=${this.token}`;
      },
    },
  };
  </script>
  
  