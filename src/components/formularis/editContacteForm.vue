<template>
  <h1>Editar Contacte</h1>
  <div class="container">
    <!-- Només mostrar el formulari quan les empreses i el contacte estiguin carregats -->
    <form v-if="!loading">
      <div class="row align-items-start">
        <div class="col-lg-6 col-sm-12">
          <label for="nombre" class="form-label">Nom</label>
          <input type="text" class="form-control" id="nombre" required v-model="nouContacte.nomcontacte" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="cargo" class="form-label">Càrrec</label>
          <input type="text" class="form-control" id="cargo" required v-model="nouContacte.carrec" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="telefono" class="form-label">Telèfon</label>
          <input type="tel" class="form-control" id="telefono" required v-model="nouContacte.telefon" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="correo" class="form-label">Correu electrònic</label>
          <input type="email" class="form-control" id="correo" required v-model="nouContacte.email" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <label for="empresa" class="form-label">Empresa</label>
          <select class="form-select" id="empresa" required v-model="nouContacte.nifempresa" @change="onChangeEmpresa">
            <option value="" disabled>Selecciona una</option>
            <option :value="String(empresa.NIF)" v-for="empresa in llistaEmpreses" :key="empresa.NIF">{{ empresa.nom }}</option>
          </select>
        </div>
      </div>
    </form>
  </div>
  <div class="col">
    <br /><br />
    <button type="submit" class="btn btn-outline-success" @click="actualitzarContacte">
      <i class="fa-regular fa-floppy-disk"></i>Actualitzar
    </button>
    <button class="btn btn-outline-danger" @click="this.$router.push('/contactes')">
      <i class="fa-solid fa-xmark"></i>Cancelar
    </button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "ContacteFormulari",
  props: {
    base_url: String,
  },
  data() {
    return {
      token: "",
      nouContacte: {
        nifempresa: "",  // Inicialitzem amb un valor buit
        nomcontacte: "",
        carrec: "",
        telefon: "",
        email: ""
      },
      llistaEmpreses: [],
      loading: true, // Ens assegurem que estem carregant les dades
    };
  },
  methods: {
    onChangeEmpresa() {
      console.log("Empresa seleccionada:", this.nouContacte.nifempresa);  // Verificació de l'empresa seleccionada
    },
    async getEmpreses() {
      let url = this.base_url + "/api/empresa/";
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        const resposta = await response.json();
        this.llistaEmpreses = resposta.empreses || [];
        this.llistaEmpreses.sort((a, b) => a.nom.toUpperCase().localeCompare(b.nom.toUpperCase()));

        // Quan les empreses es carreguen, cridem a getContacte per carregar el contacte
        await this.getContacte();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al carregar les empreses.'
        });
      }
    },
    async getContacte() {
      let url = this.base_url + "/api/contacte/";
      console.log("Carregant contacte amb ID: ", this.$route.params.id);
      try {
        const response = await fetch(url + this.$route.params.id, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });
        const resposta = await response.json();
        console.log("Contacte carregat:", resposta.contacte);

        this.nouContacte = resposta.contacte;  // Carreguem el contacte

        // Corregim l'accés a la dada 'nifempresa' de l'objecte 'empresa'
        if (this.nouContacte.empresa && this.nouContacte.empresa.nifempresa) {
          this.nouContacte.nifempresa = this.nouContacte.empresa.nifempresa;  // Actualitzem el valor del NIF
        }

        console.log("NIF empresa del contacte: ", this.nouContacte.nifempresa);

        // Comprovem si el NIF de l'empresa existeix abans de continuar
        if (!this.nouContacte.nifempresa) {
          Swal.fire({
            icon: 'warning',
            title: 'Atenció',
            text: 'El contacte no té associat un NIF d\'empresa. Si us plau, verifiqueu les dades.',
          });
        }

        if (this.nouContacte.nifempresa) {
          // Si el NIF existeix, processarem la selecció de l'empresa
          this.setEmpresaTriada();
        }

      } catch (error) {
        console.error("Error al carregar el contacte: ", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al carregar el contacte.'
        });
      }
    },
    setEmpresaTriada() {
      console.log("Comprovant NIF d'empresa del contacte:", this.nouContacte.nifempresa);

      const nifEmpresaContacte = String(this.nouContacte.nifempresa);

      if (this.llistaEmpreses.length > 0 && nifEmpresaContacte) {
        console.log("Estic buscant l'empresa associada...");

        // Busquem l'empresa associada al contacte
        const empresaSeleccionada = this.llistaEmpreses.find(empresa => String(empresa.NIF) === nifEmpresaContacte);

        console.log("Empresa seleccionada:", empresaSeleccionada);

        if (empresaSeleccionada) {
          console.log("Assignant l'empresa al contacte:", empresaSeleccionada.nom);

          // Assignem l'empresa seleccionada correctament
          this.nouContacte.nifempresa = empresaSeleccionada.NIF;

          // Asegurem que Vue actualitza el valor
          this.$nextTick(() => {
            Swal.fire({
              icon: 'info',
              title: 'Contacte carregat correctament',
              text: 'Verifiqueu les dades i modifiqueu-les si cal.',
            });
          });
        } else {
          console.log("No s'ha trobat l'empresa associada.");
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No s\'ha trobat l\'empresa associada al contacte.',
          });
        }
      } else {
        console.log("Esperant que les empreses es carreguin o que el contacte tingui un NIF d'empresa.");
        setTimeout(this.setEmpresaTriada, 100);  // Esperem que les empreses es carreguin abans de tornar a intentar
      }
    },
    async actualitzarContacte() {
      let url = this.base_url + "/api/contacte/";
      let contacteEditat = this.convertirAContacteReducido(this.nouContacte);

      try {
        const response = await fetch(url + this.$route.params.id, {
          method: "PUT",
          body: JSON.stringify(contacteEditat),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
        });
        let resposta = await response.json();
        if (resposta.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Contacte guardat correctament',
            showConfirmButton: true,
            timer: 2000
          });
          this.$router.push('/contactes');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el contacte: ' + resposta.error,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al realitzar la sol·licitud.'
        });
      }
    },
    convertirAContacteReducido(contacte) {
      return {
        id: contacte.id,
        nomcontacte: contacte.nomcontacte,
        carrec: contacte.carrec,
        telefon: contacte.telefon,
        email: contacte.email,
        nifempresa: contacte.nifempresa
      };
    }
  },
  async mounted() {
    this.token = localStorage.getItem("jwtToken");
    await this.getEmpreses(); // Primer carrega les empreses
    this.loading = false;  // Quan tot s'ha carregat, canviem el loading a false
  }
};
</script>

<style scoped></style>
