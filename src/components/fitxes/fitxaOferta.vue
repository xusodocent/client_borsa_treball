<template>
    <div class="container">
        <h2 class="text-center fw-bold text-primary">Detalls de l'oferta</h2>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <td class="negreta">ID</td>
                    <td>{{ oferta.id }}</td>
                </tr>
                <tr>
                    <td class="negreta">Nom de l'empresa</td>
                    <td>{{ oferta.empresa.nomempresa }}</td>
                </tr>
                <tr>
                    <td class="negreta">Data</td>
                    <td>{{ oferta.data }}</td>
                </tr>
                <tr>
                    <td class="negreta">Estat</td>
                    <td>{{ oferta.estat ? 'Actiu' : 'Inactiu' }}</td>
                </tr>
                <tr>
                    <td class="negreta">Text de l'oferta</td>
                    <td>{{ oferta.textoferta }}</td>
                </tr>
                <tr>
                    <td class="negreta">Experiència</td>
                    <td>{{ oferta.experiencia }}</td>
                </tr>
                <tr>
                    <td class="negreta">Idiomes</td>
                    <td>{{ oferta.idiomes }}</td>
                </tr>
                <tr>
                    <td class="negreta">Altres</td>
                    <td>{{ oferta.altres }}</td>
                </tr>
                <tr>
                    <td class="negreta">Enllaç</td>
                    <td><a :href="oferta.urloferta" target="_blank">Enllaç</a></td>
                </tr>
                <tr>
                    <td class="negreta">Cicles</td>
                    <td>
                        <ul>
                            <li v-for="cicle in oferta.cicles" :key="cicle.id">
                                {{ cicle.nomcicle }} ({{ cicle.graucicle }})
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {
    name: "OfertaFitxa",
    props: {
        //msg: String
        base_url: String,
    },
    data() {
        return {
            token: "",
            oferta: {
                "id": 2,
                "empresa": {
                    "nifempresa": "",
                    "nomempresa": "Odec"
                },
                "data": "23/05/2023",
                "estat": true,
                "textoferta": "Programador web",
                "experiencia": "Una miqueta",
                "idiomes": "Anglès avançat",
                "altres": "Cotxe propi",
                "urloferta": "https://firmania.es/alzira/roberta-klein-1122897",
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
                ]
                },
            validat: false,
            enviat: false,
        };
    },
    methods: {
        async getOferta() {
            let url = this.base_url + "/api/oferta/";
            try {
                console.log("la ruta és" + this.$route.params.id);
                const response = await fetch(url + this.$route.params.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                this.resposta = await response.json();
                this.oferta = this.resposta.oferta;
                await console.log(this.oferta);
            } catch (error) {
                console.error(error);
            }
        },
        postUsuario() {
            // Método para crear un usuario
        },
        putUsuario() {
            // Método para actualizar un usuario
        },
        deleteUsuario() {
            // Método para borrar un usuario
        },
    },
    mounted() {
        this.token = localStorage.getItem("jwtToken");
        this.getOferta();
    },
};
</script>

<style>
.negreta {
    font-weight: bold;
}
</style>