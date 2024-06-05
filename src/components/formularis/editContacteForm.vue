<template>
    <h1>Editar Contacte</h1>
    <div class="container">
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
                    <select class="form-select" id="sector" required v-model="empresaTriada" @change="onChangeEmpresa">
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
            nouContacte: {},
            empresaTriada: "",
            llistaEmpreses: [],
            loading: true,
        };
    },
    methods: {
        onChangeEmpresa() {
            this.nouContacte.nifempresa = this.empresaTriada;
            console.log(this.nouContacte.nifempresa);
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
                this.resposta = await response.json();
                this.llistaEmpreses = this.resposta.empreses;
                this.llistaEmpreses.sort((a, b) => a.nom.toUpperCase().localeCompare(b.nom.toUpperCase()));
                this.loading = false;
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al carregar les empreses.'
                });
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
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al guardar el contacte: ' + resposta.error
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
        async getContacte() {
            let url = this.base_url + "/api/contacte/";
            try {
                const response = await fetch(url + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                this.resposta = await response.json();
                this.nouContacte = this.resposta.contacte;
                this.empresaTriada = this.nouContacte.nifempresa;
                this.loading = false;
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al carregar el contacte.'
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
        await this.getEmpreses();
        await this.getContacte();
    }
};
</script>

<style scoped></style>
