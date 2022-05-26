<template>
     <div class="content container">
                <div class="main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="page-header">
                                <h4 class="page-title">Mapel</h4>
                                <div class="breadcrumb">
                                <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                                <div class="breadcrumb-item">Home</div>
                                <div class="breadcrumb-item">Mapel</div>
                                <div class="breadcrumb-item">Detail</div>
                                </div>                         
                            </div>
                        </div>
                        <div class="col-lg-4">
                             <div class="d-grid d-md-flex justify-content-md-end">
                                <router-link :to="{name: 'mapel.index'}" class="btn btn-warning me-md-end" type="button"><i class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                             </div>
                        </div>
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <h4>Detail Mapel</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="update()">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Nama Mapel</label>
                                    <input type="text" class="form-control" v-model="mapel.nama_mapel">
                                    <div v-if="Validation.nama_mapel" class="text-danger">
                                        {{Validation.nama_mapel[0]}}
                                    </div>
                                </div>
                                 <div class="col-md-4">
                                    <label for="" class="form-label">Guru</label>
                                    <select name="guru" class="form-select" v-model="mapel.guru_id">
                                        <option v-for="(guru, index) in guru.data" :key="index" :value="guru.id_guru">{{guru.nama_guru}}</option>
                                    </select>
                                    <div v-if="Validation.guru_id" class="text-danger">
                                        {{Validation.guru_id[0]}}
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-warning" type="submit">Update</button>
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
                <!-- Footer START -->
                <div class="footer fixed-bottom ">
                    <div class="footer-content justify-content-md-end">
                        <p class="mb-0">Copyright © 2022. All rights reserved.</p>
                    </div>
                </div>
                <!-- Footer End -->
            </div>
</template>

<script>
import {reactive ,ref, onMounted} from 'vue'
import { useRoute, useRouter} from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        //data binding
        const mapel = reactive({
            nama_mapel: '',
            guru_id: '',
        });

        const Validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios.get(`http://localhost:8000/api/mapel/${route.params.id}`)
            .then((result) => {
                mapel.nama_mapel = result.data.data.nama_mapel
                mapel.guru_id = result.data.data.guru_id
            }).catch((err) => {
                console.log(err.response.data)
            });
        });

        let guru = ref([]);

        onMounted(() => {
            //get siswa from api
            axios.get('http://localhost:8000/api/guru')
            .then((result) => {
                guru.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });


        function update() {
            axios.put(
                `http://localhost:8000/api/mapel/${route.params.id}`,
                mapel
            )
             .then(() => {
                router.push({
                    name : 'mapel.index'
                })
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }

        return {
            mapel,
            guru,
            Validation,
            router,
            update
        }
    }    
}
</script>