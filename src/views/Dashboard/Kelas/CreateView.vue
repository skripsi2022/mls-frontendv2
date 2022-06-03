<template>
     <div class="content container">
                <div class="main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="page-header">
                                <h4 class="page-title">Kelas</h4>
                                <div class="breadcrumb">
                                <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                                <div class="breadcrumb-item">Home</div>
                                <div class="breadcrumb-item">Jurusan</div>
                                <div class="breadcrumb-item">Tambah Kelas</div>
                                </div>                         
                            </div>
                        </div>
                        <div class="col-lg-4">
                             <div class="d-grid d-md-flex justify-content-md-end">
                                <router-link :to="{name: 'jurusan.index'}" class="btn btn-warning me-md-end" type="button"><i class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                             </div>
                        </div>
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <h4>Tambah Kelas</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="store()">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Nama Kelas</label>
                                    <input type="text" class="form-control" v-model="kelas.nama_kelas">
                                    <div v-if="Validation.nama_kelas" class="text-danger">
                                        {{Validation.nama_kelas[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Jurusan</label>
                                    <select name="mapel" class="form-select" v-model="kelas.jurusan_id">
                                        <option v-for="(jurusan, index) in jurusan.data" :key="index" :value="jurusan.id_jurusan">{{jurusan.nama_jurusan}}</option>
                                    </select>
                                    <div v-if="Validation.jurusan_id" class="text-danger">
                                        {{Validation.jurusan_id[0]}}
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
                <div class="footer fixed-bottom">
                    <div class="footer-content">
                        <p class="mb-0">Copyright © 2022 All rights reserved.</p>
                        <span>
                            <a href="" class="text-gray me-3">Term &amp; Conditions</a>
                            <a href="" class="text-gray">Privacy &amp; Policy</a>
                        </span>
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
        const kelas = reactive({
            nama_kelas: '',
            jurusan_id: '',
        });

        const Validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post(
                '/api/kelas',
                kelas
            )
             .then(() => {
                router.push({
                    name : 'kelas.index'
                })
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }

        let jurusan = ref([]);

        onMounted(() => {
            //get jurusan from api
            axios.get('/api/jurusan')
            .then((result) => {
                jurusan.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });

        return {
            kelas,
            jurusan,
            Validation,
            router,
            store
        }
    }    
}
</script>