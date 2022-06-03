<template>
     <div class="content container">
                <div class="main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="page-header">
                                <h4 class="page-title">Mata Pelajaran</h4>
                                <div class="breadcrumb">
                                <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                                <div class="breadcrumb-item">Home</div>
                                <div class="breadcrumb-item">Mapel</div>
                                <div class="breadcrumb-item">Tambah Mapel</div>
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
                            <h4>Tambah Mata Pelajaran</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="store()">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Nama Mapel</label>
                                    <input type="text" class="form-control" v-model="mapel.nama_mapel">
                                    <div v-if="Validation.nama_mapel" class="text-danger">
                                        {{Validation.nama_mapel[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Guru</label>
                                    <select name="guru" class="form-select" v-model="mapel.guru_id">
                                        <option v-for="(guru, index) in guru.data" :key="index" :value="guru.id_guru">{{guru.nama_guru}}</option>
                                    </select>
                                    <div v-if="Validation.guru_id" class="text-danger">
                                        {{Validation.guru_id[0]}}
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary" type="submit">Tambah</button>
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
import {reactive ,ref,onMounted} from 'vue'
import { useRouter} from 'vue-router'
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

        function store() {
            axios.post(
                '/api/mapel',
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

        let guru = ref([]);

        onMounted(() => {
            //get siswa from api
            axios.get('/api/guru')
            .then((result) => {
                guru.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });

        return {
            mapel,
            guru,
            Validation,
            router,
            store
        }
    }    
}
</script>