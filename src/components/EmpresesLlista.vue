<template>
  <div class="container">
    <h1 class="text-center fw-bold text-primary">Empreses</h1>
    <hr>
    <br />
    <div class="d-flex align-items-center mb-3">
      <input type="text" v-model="filtro" placeholder="Buscar per empresa..." id="buscarEmpresa" class="form-control me-2"/>
      <input type="text" v-model="filtroPoble" placeholder="Buscar per poble..." id="buscarPoble" class="form-control me-2"/>
      <input type="text" v-model="filtroSector" placeholder="Buscar per sector..." id="buscarSector" class="form-control me-2"/>
      <button class="btn btn-dark" @click="generatePDF">
        <i class="fa-solid fa-file-pdf"></i> Generar PDF
      </button>
    </div>
    <br /><br />
    <button class="btn btn-dark" @click="this.$router.push('/novaempresa')">
      <i class="fa-solid fa-plus"></i> Nova empresa
    </button>
    <br />
    <div id="tabla-personas" ref="pdfContent">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 25%;">Nom</th>
            <th style="width: 12%;">Població</th>
            <th style="width: 12%;">Sector</th>
            <th style="width: 12%;">Telèfon</th>
            <th style="width: 39%;" class="action-column">Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in empresesFiltrades" :key="empresa.NIF">
            <td>{{ empresa.nom }}</td>
            <td>{{ empresa.poblacio }}</td>
            <td>{{ empresa.nomsector }}</td>
            <td>{{ empresa.telefon }}</td>
            <td class="action-column">
              <button
                type="button"
                class="btn btn-outline-success"
                @click="this.$router.push({ path: `/empresafitxa/${empresa.NIF}`, params: { nif: empresa.NIF } })"
              >
                <i class="fa-regular fa-eye"></i> Veure
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="confirmDeleteEmpresa(empresa.NIF)"
              >
                <i class="fa-regular fa-trash-can"></i> Eliminar
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                @click="this.$router.push({ path: `/editaempresa/${empresa.NIF}`, params: { nif: empresa.NIF } })"
              >
                <i class="fa-solid fa-file-pen"></i> Modificar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-dark" @click="this.$router.push('/novaempresa')">
      <i class="fa-solid fa-plus"></i> Nova empresa
    </button>
    <br />
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  name: "EmpresesLlista",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
      resposta: "",
      filtro: "",
      filtroPoble: "",
      filtroSector: "", // Añadido filtro por sector
      empreses: [],
    };
  },
  methods: {
    async getEmpreses() {
      let url = this.base_url + "/api/empresa/";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        this.resposta = await response.json();
        this.empreses = this.resposta.empreses;
        console.log(this.empreses);
      } catch (error) {
        console.error(error);
      }
    },
    confirmDeleteEmpresa(nif) {
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
          this.deleteEmpresa(nif);
        }
      });
    },
    async deleteEmpresa(nif) {
      let url = this.base_url + "/api/empresa/" + nif;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        this.resposta = await response.json();
        if (this.resposta.ok) {
          Swal.fire(
            'Eliminada!',
            'L\'empresa s\'ha eliminat correctament.',
            'success'
          );
        } else {
          Swal.fire(
            'Error!',
            'No s\'ha pogut eliminar l\'empresa.',
            'error'
          );
        }
        this.getEmpreses();
      } catch (error) {
        Swal.fire(
          'Error!',
          'No s\'ha pogut eliminar l\'empresa.',
          'error'
        );
        console.error(error);
      }
    },
    async generatePDF() {
      // Oculta les columnes d'accions abans de generar el PDF
      const actionColumns = document.querySelectorAll('.action-column');
      actionColumns.forEach(column => column.style.display = 'none');

      const content = this.$refs.pdfContent || document.getElementById('tabla-personas');
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('empreses.pdf');

      // Torna a mostrar les columnes d'accions després de generar el PDF
      actionColumns.forEach(column => column.style.display = '');
    }
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getEmpreses();
  },
  computed: {
    empresesFiltrades() {
      return this.empreses.filter(item => {
        return item.nom.toLowerCase().includes(this.filtro.toLowerCase()) &&
               item.poblacio.toLowerCase().includes(this.filtroPoble.toLowerCase()) &&
               item.nomsector.toLowerCase().includes(this.filtroSector.toLowerCase());
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Estils aquí */
</style>
