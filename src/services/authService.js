// src/services/authService.js
export default {
    getToken() {
      return localStorage.getItem('jwtToken');
    },
    isAuthenticated() {
      return !!localStorage.getItem('jwtToken');
    },
    logout() {
      localStorage.removeItem('jwtToken');
    },
    isTokenExpired() {
      const token = this.getToken();
      if (!token) return true;
    
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
    
      // Comparar la data actual amb l'expiració del token
      const now = Math.floor(Date.now() / 1000); // Obtenir el temps actual en segons
      
      return expiry < now;
    }
  };
  