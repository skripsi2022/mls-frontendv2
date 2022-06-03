<template>
     <div class="content container">
                <div class="main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="page-header">
                                <h4 class="page-title">Ujian</h4>
                                <div class="breadcrumb">
                                <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                                <div class="breadcrumb-item">Home</div>
                                <div class="breadcrumb-item">Ujian</div>
                                <div class="breadcrumb-item">Tambah Ujian</div>
                                </div>                         
                            </div>
                        </div>
                        <div class="col-lg-4">
                             <div class="d-grid d-md-flex justify-content-md-end">
                                <router-link :to="{name: 'ujian.index'}" class="btn btn-warning me-md-end" type="button"><i class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                             </div>
                        </div>
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <h4>Tambah Ujian</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="store()">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Nama Ujian</label>
                                    <input type="text" class="form-control" v-model="ujian.nama_ujian">
                                    <div v-if="Validation.nama_ujian" class="text-danger">
                                        {{Validation.nama_ujian[0]}}
                                    </div>
                                </div>                                
                                <div class="col-md-3">
                                    <label for="" class="form-label">Kelas</label>
                                    <select name="kelas" class="form-select" v-model="ujian.kelas_id">
                                        <option v-for="(kelas, index) in kelas.data" :key="index" :value="kelas.id_kelas">{{kelas.nama_kelas}}</option>
                                    </select>
                                    <div v-if="Validation.kelas_id" class="text-danger">
                                        {{Validation.kelas_id[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Mapel</label>
                                    <select name="mapel" class="form-select" v-model="ujian.mapel_id">
                                        <option v-for="(mapel, index) in mapel.data" :key="index" :value="mapel.id_mapel">{{mapel.nama_mapel}}</option>
                                    </select>
                                    <div v-if="Validation.mapel_id" class="text-danger">
                                        {{Validation.mapel_id[0]}}
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
        const ujian = reactive({
            nama_ujian: '',
            kelas_id: '',
            mapel_id: '',
        });

        const Validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post(
                '/api/ujian',
                ujian
            )
             .then(() => {
                router.push({
                    name : 'ujian.index'
                })
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }

        let mapel = ref([]);

        onMounted(() => {
            //get mapel from api
            axios.get('/api/mapel')
            .then((result) => {
                mapel.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });

        let kelas = ref([]);

        onMounted(() => {
            //get kelas from api
            axios.get('/api/kelas')
            .then((result) => {
                kelas.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });

        return {
            ujian,
            kelas,
            mapel,
            Validation,
            router,
            store
        }
    }    
}
</script>