<template>
    <h1>Editar Alumne</h1>
    <div class="container">
        <form @submit.prevent="putAlumne">
            <div class="row align-items-start">
                <div class="col-lg-6 col-sm-12">
                    <label for="nombre" class="form-label">Nom</label>
                    <input type="text" class="form-control" id="nombre" required v-model="nouAlumne.nomalumne" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="apellido" class="form-label">Cognom</label>
                    <input type="text" class="form-control" id="apellido" required v-model="nouAlumne.cognoms" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="telefono" class="form-label">Població</label>
                    <input type="tel" class="form-control" id="poblacio" required v-model="nouAlumne.poblacio" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="telefono" class="form-label">Tfn</label>
                    <input type="tel" class="form-control" id="telefono" required v-model="nouAlumne.telefon" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="correo" class="form-label">Correu electrònic</label>
                    <input type="email" class="form-control" id="correo" required v-model="nouAlumne.email" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="telefono" class="form-label">Idiomes</label>
                    <input type="tel" class="form-control" id="idiomes" required v-model="nouAlumne.idiomes" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="telefono" class="form-label">Estudis</label>
                    <input type="tel" class="form-control" id="estudis" required v-model="nouAlumne.estudis" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="telefono" class="form-label">Competències</label>
                    <input type="tel" class="form-control" id="competencies" required
                        v-model="nouAlumne.competencies" />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <label for="cicles" class="form-label">Cicles</label>
                    <select multiple class="form-select" id="cicles" v-model="nouAlumne.cicles" required>
                        <option value="" disabled>Selecciona vàrios cicles amb Ctrl</option>
                        <option :value="cicle.id" v-for="cicle in cicles" :key="cicle.id">
                            {{ cicle.nomcicle }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6 col-sm-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="activo" v-model="nouAlumne.transport" />
                        <label class="form-check-label" for="activo"> Transport </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="activo" v-model="nouAlumne.actiu" />
                        <label class="form-check-label" for="activo"> Actiu </label>
                    </div>
                </div>
                <!---
                <div class="col-lg-6 col-sm-12">
                    <label for="pdf" class="form-label">Currículum</label>
                    <input type="file" class="form-control" id="pdf" required />
                </div>
                --->
            </div>
            <div class="col">
                <br /><br />
                <button type="submit" class="btn btn-outline-success">
                    <i class="fa-regular fa-floppy-disk"></i>Modificar
                </button>
                <button class="btn btn-outline-danger" @click="this.$router.push('/alumnes')">
                    <i class="fa-solid fa-xmark"></i>Cancelar
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: "AlumneFormulari",
    props: {
        base_url: String,
    },
    data() {
        return {
            resposta: {},
            token: "",
            nouAlumne: {
                nomalumne: "",
                cognoms: "",
                poblacio: "",
                telefon: "",
                email: "",
                transport: true,
                actiu: true,
                pdf: true,
                cicles: [],
                experiencia: "",
                idiomes: "Valencià, Castellà, Anglés, etc...",
                estudis: "Ciles formatius, universitat, etc...",
                competencies: "Totes",
            },
            cicles: [],
            selectedCicles: [],
            validat: false,
            enviat: false,
        };
    },
    methods: {
        async getCicles() {
            let url = this.base_url + "/api/cicle/";
            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                this.resposta = await response.json();
                this.cicles = this.resposta.cicles;
                await console.log(this.cicles);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al carregar els cicles.'
                });
            }
        },
        transformarAlumne(alumne) {
            return {
                nomalumne: alumne.nomalumne || "",
                cognoms: alumne.cognoms || "",
                poblacio: alumne.poblacio || "",
                telefon: alumne.telefon || "",
                email: alumne.email || "",
                transport: alumne.transport || true,
                actiu: alumne.actiu || true,
                pdf: alumne.pdf || true,
                cicles: alumne.cicles.map(cicle => cicle.id) || [],
                experiencia: alumne.curriculum ? alumne.curriculum.experiencia || "" : "",
                idiomes: alumne.curriculum ? alumne.curriculum.idiomes || "Valencià, Castellà, Anglés, etc..." : "Valencià, Castellà, Anglés, etc...",
                estudis: alumne.curriculum ? alumne.curriculum.estudis || "Ciles formatius, universitat, etc..." : "Ciles formatius, universitat, etc...",
                competencies: alumne.curriculum ? alumne.curriculum.competencies || "Totes" : "Totes",
            };
        },
        async getAlumne() {
            let url = this.base_url + "/api/alumne/";
            try {
                console.log("la ruta és" + this.$route.params.id);
                const response = await fetch(
                    url + this.$route.params.id,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.token}`
                        }
                    }
                );
                this.resposta = await response.json();
                let alumne = this.resposta.alumne;
                this.nouAlumne = this.transformarAlumne(alumne);
                await console.log("El nou alumne és:" + JSON.stringify(this.nouAlumne));
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al carregar l\'alumne.'
                });
            }
        },
        async putAlumne() {
            let url = this.base_url + "/api/alumne/" + this.$route.params.id;
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(this.nouAlumne),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor: ' + response.statusText);
                }

                this.resposta = await response.json();

                console.log("La respuesta del servidor es:" + JSON.stringify(this.resposta));

                Swal.fire({
                    title: 'Alumne modificat correctament',
                    icon: 'success',
                    confirmButtonText: 'D\'acord'
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Alguna cosa ha anat malament!' + error,
                });
            }
        }

    },
    mounted() {
        this.token = localStorage.getItem("jwtToken");
        this.getCicles();
        this.getAlumne();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
