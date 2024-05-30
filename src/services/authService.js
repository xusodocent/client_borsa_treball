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
    }
  };
  