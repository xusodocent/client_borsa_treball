<template>
    <div>
        <h1>Informació de l'Alumne</h1>
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
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "AlumneInfo",
    props: {
        base_url: String,
    },
    data() {
        return {
            alumne: {
                "id": 1,
                "nomalumne": "Fidel",
                "cognoms": "Oltra",
                "poblacio": "Sueca",
                "telefon": "928329345556",
                "email": "fidel@gmail.com",
                "transport": true,
                "actiu": false,
                "pdf": true,
                "cicles": [
                    {
                        "id": 2,
                        "nomcicle": "DAW",
                        "graucicle": "S"
                    },
                    {
                        "id": 3,
                        "nomcicle": "DAM",
                        "graucicle": "S"
                    }
                ],
                "curriculum": {
                    "experiencia": "3 anys treballant de algo més",
                    "idiomes": "Anglès B2",
                    "estudis": "2 anys de matemàtiques",
                    "competencies": "Vàries"
                }
            },
        };
    },
    methods: {
        async getAlumne() {
            let url = this.base_url + "/api/alumne/";
            try {
                console.log("la ruta és" + this.$route.params.id);
                const response = await fetch(url + this.$route.params.id);
                this.resposta = await response.json();
                this.alumne = this.resposta.alumne;
                //await console.log(this.contacte);
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.getAlumne();
    },
};
</script>
  
<style scoped>
/* Puedes agregar estilos específicos aquí si es necesario */
</style>
  