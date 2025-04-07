<template>
    <div class="container">
      <h2 class="text-center fw-bold text-primary">Visualitzar Canal de Telegram</h2>
      <div v-if="channelInfo">
        <h4>Nom del Canal: {{ channelInfo.title }}</h4>
        <p>Descripció: {{ channelInfo.description }}</p>
        <p>Participants: {{ channelInfo.members_count }}</p>
        <p>Enllaç: <a :href="channelUrl" target="_blank">{{ channelUrl }}</a></p>
      </div>
  
      <!-- Si hi ha algun error o falta informació -->
      <div v-else>
        <p>Càrrega de la informació del canal... Si el canal és privat, potser no es pot accedir.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TelegramChannelViewer',
    data() {
      return {
        botToken: '7892658899:AAFmOIeHOsiqGugkEb41QlHpOUmjq29SCk0',  // Substitueix per el token del teu bot
        channelUsername: '@ofertesElJust_bot',  // Substitueix per el nom d'usuari del canal
        channelInfo: null, // Objecte per a guardar la informació del canal
        channelUrl: `https://t.me/${this.channelUsername}`, // URL del canal de Telegram
      };
    },
    methods: {
      async getChannelInfo() {
        const apiUrl = `https://api.telegram.org/bot${this.botToken}/getChat?chat_id=${this.channelUsername}`;
  
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
  
          if (data.ok) {
            this.channelInfo = data.result;
          } else {
            console.error("No es va poder obtenir la informació del canal.");
          }
        } catch (error) {
          console.error('Error al carregar la informació del canal:', error);
        }
      },
    },
    mounted() {
      this.getChannelInfo(); // Obtenir informació del canal quan es munta el component
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: 0 auto;
  }
  
  h4 {
    color: #3f6f9f;
  }
  </style>
  