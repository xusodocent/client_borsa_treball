<template>
  <div class="container">
    <h1 class="text-center fw-bold text-primary">Alumnes</h1>
    <hr>
    <br />
    <div class="d-flex align-items-center mb-3">
      <input type="text" v-model="filtro" placeholder="Buscar per cognom..." class="form-control me-2"/>
      <input type="text" v-model="filtroPoble" placeholder="Buscar per poble..." class="form-control me-2"/>
      <input type="text" v-model="filtroCicle" placeholder="Buscar per cicle..." class="form-control me-2"/>
      <button class="btn btn-dark" @click="generatePDF">
        <i class="fa-solid fa-file-pdf"></i> Generar PDF
      </button>
    </div>
    <div id="tabla-personas" ref="pdfContent">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Cognoms</th>
            <th>Població</th>
            <th>Cicles</th>
            <th class="actions-col">Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alumne in alumnesFiltrats" :key="alumne.id">
            <td>{{ alumne.nomalumne }}</td>
            <td>{{ alumne.cognoms }}</td>
            <td>{{ alumne.poblacio }}</td>
            <td>
              <ul style="list-style-type: none;">
                <li v-for="cicle in alumne.cicles" :key="cicle.id">{{ cicle.nomcicle }}</li>
              </ul>
            </td>
            <td class="actions-col">
              <button type="button" class="btn btn-outline-success" @click="
                this.$router.push({
                  path: `/alumnefitxa/${alumne.id}`,
                  params: { id: alumne.id },
                })
                ">
                <i class="fa-regular fa-eye"></i>
                Veure
              </button>
              <button type="button" class="btn btn-outline-danger" @click="confirmDeleteAlumne(alumne.id)">
                <i class="fa-regular fa-trash-can"></i>Eliminar
              </button>
              <button type="button" class="btn btn-outline-info" @click="
                this.$router.push({
                  path: `/editaalumne/${alumne.id}`,
                  params: { id: alumne.id },
                })
                ">
                <i class="fa-solid fa-file-pen"></i>
                Modificar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-dark" @click="this.$router.push('/noualumne')">
      <i class="fa-solid fa-plus"></i>Nou alumne
    </button>
    <div v-if="eliminat_ok" class="alert alert-success">S'ha eliminat correctament l'alumne</div>
    <div v-if="eliminat_error" class="alert alert-danger">Errada eliminant alumnes</div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  name: "AlumnesLlista",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
      filtro: "",
      filtroPoble: "",
      filtroCicle: "",
      eliminat_ok: false,
      eliminat_error: false,
      alumnes: [{
        id: 1,
        nomalumne: "Fidel",
        cognoms: "Oltra",
        poblacio: "Sueca",
        telefon: "928329345556",
        email: "fidel@gmail.com",
        transport: true,
        actiu: false,
        pdf: true,
        cicles: [
          {
            id: 2,
            nomcicle: "DAW",
            graucicle: "S"
          },
          {
            id: 3,
            nomcicle: "DAM",
            graucicle: "S"
          }
        ],
        curriculum: {
          experiencia: "3 anys treballant de algo més",
          idiomes: "Anglés B2",
          estudis: "2 anys de matemàtiques",
          competencies: "Vàries"
        }
      }],
    }
  },
  methods: {
    async getAlumnes() {
      let url = this.base_url + "/api/alumne/";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }});
        this.resposta = await response.json();
        this.alumnes = this.resposta.alumnes;
        console.log(this.alumnes);
      } catch (error) {
        console.error(error);
      }
    },
    confirmDeleteAlumne(id) {
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
          this.deleteAlumne(id);
        }
      });
    },
    async deleteAlumne(id) {
      this.eliminat_ok = false;
      this.eliminat_error = false;
      let url = this.base_url + "/api/alumne/" + id;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.resposta = await response.json();
        if (this.resposta.ok == true) {
          this.eliminat_ok = true;
          Swal.fire(
            'Eliminat!',
            'L\'alumne s\'ha eliminat correctament.',
            'success'
          );
        } else {
          this.eliminat_error = true;
          Swal.fire(
            'Error!',
            'No s\'ha pogut eliminar l\'alumne.',
            'error'
          );
        }
        this.getAlumnes();
      } catch (error) {
        this.eliminat_error = true;
        Swal.fire(
          'Error!',
          'No s\'ha pogut eliminar l\'alumne.',
          'error'
        );
        console.error(error);
      }
    },
    async generatePDF() {
      // Oculta la columna d'accions
      document.querySelectorAll('.actions-col').forEach(col => col.style.display = 'none');
      
      // Genera el PDF
      const pdfContent = this.$refs.pdfContent;
      const canvas = await html2canvas(pdfContent);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('alumnes.pdf');
      
      // Torna a mostrar la columna d'accions
      document.querySelectorAll('.actions-col').forEach(col => col.style.display = '');
    },
  },
  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.getAlumnes();
  },
  computed: {
    alumnesFiltrats() {
      return this.alumnes.filter(alumne => {
        return (
          alumne.cognoms.toLowerCase().includes(this.filtro.toLowerCase()) &&
          alumne.poblacio.toLowerCase().includes(this.filtroPoble.toLowerCase()) &&
          alumne.cicles.some(cicle =>
            cicle.nomcicle.toLowerCase().includes(this.filtroCicle.toLowerCase())
          )
        );
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.d-flex.align-items-center.mb-3 {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.form-control.me-2 {
  margin-right: 0.5rem;
}
.actions-col {
  display: table-cell;
}
</style>
