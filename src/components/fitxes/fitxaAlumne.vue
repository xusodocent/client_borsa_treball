<template>
    <div>
        <h1 class="text-center fw-bold text-primary">Informació de l'Alumne</h1>
        <hr>
        <br>
        <div class="container">
            <form @submit.prevent="uploadCurriculum">
                <div class="row">
                    <div class="col-4">
                        <label for="pdf" class="form-label">Penja o actualitza el currículum (PDF):</label>
                        <input type="file" id="pdf" ref="pdfInput" class="form-control" accept=".pdf" required />
                    </div>
                    <div class="col align-self-end">
                        <button type="submit" class="btn btn-primary mt-2">Penjar</button>
                    </div>
                </div>
            </form>
        </div>
        <br>
        <div class="container">
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Nom</th>
                        <td>{{ alumne.nomalumne }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cognoms</th>
                        <td>{{ alumne.cognoms }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Població</th>
                        <td>{{ alumne.poblacio }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telèfon</th>
                        <td>{{ alumne.telefon }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{{ alumne.email }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Transport</th>
                        <td>{{ alumne.transport ? 'Sí' : 'No' }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Actiu</th>
                        <td>{{ alumne.actiu ? 'Sí' : 'No' }}</td>
                    </tr>
                    <tr>
                        <th scope="row">PDF</th>
                        <td>{{ alumne.pdf ? 'Sí' : 'No' }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cicles</th>
                        <td>
                            <ul>
                                <li v-for="cicle in alumne.cicles" :key="cicle.id">
                                    {{ cicle.nomcicle }} - {{ cicle.graucicle }}
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Experiència</th>
                        <td>{{ alumne.curriculum.experiencia }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Idiomes</th>
                        <td>{{ alumne.curriculum.idiomes }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Estudis</th>
                        <td>{{ alumne.curriculum.estudis }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Competències</th>
                        <td>{{ alumne.curriculum.competencies }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Currículum</th>
                        <td>
                            <a id="enllaç" v-if="curriculumExists" ref="linkCurriculum" @click="downloadFile" class="btn btn-primary">Descarregar</a>
                            <p class="text-danger" v-else>No hi ha currículum disponible</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

//import VuePdf from 'vue-pdf';

export default {
    name: "AlumneInfo",
    props: {
        base_url: String,
    },
    data() {
        return {
            token: "",
            linkCurriculum: "",
            curriculumExists: true,
            alumne: {
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
                    { id: 2, nomcicle: "DAW", graucicle: "S" },
                    { id: 3, nomcicle: "DAM", graucicle: "S" }
                ],
                curriculum: {
                    experiencia: "3 anys treballant de algo més",
                    idiomes: "Anglès B2",
                    estudis: "2 anys de matemàtiques",
                    competencies: "Vàries"
                }
            }
        };
    },
    methods: {
        async downloadFile() {
            const url = `${this.base_url}/api/alumne/download/${this.alumne.id}`;
            try {
                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${this.token}` },
                });
                if (!response.ok) {
                    throw new Error("Error al descargar el archivo");
                }
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = objectUrl;
                link.download = 'curriculum.pdf';  // nombre del archivo
                document.body.appendChild(link);  // Necesario para Firefox
                link.click();
                document.body.removeChild(link);  // Limpiar el DOM
                URL.revokeObjectURL(objectUrl);
            } catch (error) {
                console.error("Error al descargar el archivo:", error);
                Swal.fire(
                    'Error!',
                    'Error al descarregar el fitxer.',
                    'error'
                );
            }
        },
        async viewFile(){
            //alert("Visualitzant el fitxer");
            this.$router.push({ name: 'vorepdf', params: { id: this.alumne.id } });
        },
        async uploadCurriculum() {
            const file = this.$refs.pdfInput.files[0];
            if (!file) {
                Swal.fire(
                    'Atenció!',
                    'Selecciona un fitxer PDF per penjar.',
                    'warning'
                );
                return;
            }

            const formData = new FormData();
            formData.append("pdf", file);
            formData.append("curriculum", JSON.stringify(this.alumne.curriculum));

            const url = `${this.base_url}/api/alumne/curriculum/${this.alumne.id}`;
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { 'Authorization': `Bearer ${this.token}` },
                    body: formData,
                });
                const data = await response.json();
                if (response.ok) {
                    Swal.fire(
                        'Èxit!',
                        'Currículum penjat amb èxit.',
                        'success'
                    );
                    this.linkCurriculum = `${this.base_url}/api/alumne/download/${this.alumne.id}`;
                    this.curriculumExists = true;
                } else {
                    Swal.fire(
                        'Error!',
                        'Error al penjar el currículum: ' + data.error,
                        'error'
                    );
                }
            } catch (error) {
                console.error("Error al penjar el currículum:", error);
                Swal.fire(
                    'Error!',
                    'Error al penjar el currículum.',
                    'error'
                );
            }
        },
        async getAlumne() {
            const url = `${this.base_url}/api/alumne/${this.$route.params.id}`;
            try {
                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                const data = await response.json();
                this.alumne = data.alumne;
                this.checkCurriculumExists();
            } catch (error) {
                console.error(error);
            }
        },
        async checkCurriculumExists() {
            const url = `${this.base_url}/api/alumne/download/${this.alumne.id}`;
            try {
                const response = await fetch(url, {
                    method: "HEAD",
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                this.curriculumExists = response.ok;
                if (response.ok) {
                    this.linkCurriculum = url;
                }
            } catch (error) {
                console.error("Error checking if curriculum exists:", error);
                this.curriculumExists = false;
            }
        },
    },
    mounted() {
        this.token = localStorage.getItem("jwtToken");
        this.getAlumne();
    },
};
</script>

<style scoped>
/* Estilos aquí */
</style>

