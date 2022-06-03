<template>
     <div class="content container">
                <div class="main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="page-header">
                                <h4 class="page-title">Siswa</h4>
                                <div class="breadcrumb">
                                <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                                <div class="breadcrumb-item">Home</div>
                                <div class="breadcrumb-item">Siswa</div>
                                <div class="breadcrumb-item">Detail Siswa</div>
                                </div>                         
                            </div>
                        </div>
                        <div class="col-lg-4">
                             <div class="d-grid d-md-flex justify-content-md-end">
                                <router-link :to="{name: 'siswa.index'}" class="btn btn-warning me-md-end" type="button"><i class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                             </div>
                        </div>
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <h4>Detail Siswa</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="update()">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Nama Lengkap</label>
                                    <input type="text" class="form-control" v-model="siswa.nama_siswa">
                                    <div v-if="Validation.nama_siswa" class="text-danger">
                                        {{Validation.nama_siswa[0]}}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="" class="form-label">NIS</label>
                                    <input type="text" class="form-control" v-model="siswa.nis_siswa">
                                    <div v-if="Validation.nis_siswa" class="text-danger">
                                        {{Validation.nis_siswa[0]}}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="" class="form-label">Kelas</label>
                                    <select name="kelas" class="form-select" v-model="siswa.kelas_id">
                                        <option v-for="(kelas, index) in kelas.data" :key="index" :value="kelas.id_kelas">{{kelas.nama_kelas}}</option>
                                    </select>
                                    <div v-if="Validation.kelas_id" class="text-danger">
                                        {{Validation.kelas_id[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Alamat</label>
                                    <textarea type="text" class="form-control" v-model="siswa.alamat_siswa"></textarea>
                                    <div v-if="Validation.alamat_siswa" class="text-danger">
                                        {{Validation.alamat_siswa[0]}}
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-warning" type="submit">Update</button>
                                </div>
                            </form>  
                        </div>                         
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4>Daftar Nilai <span class="lead">{{siswa.nama_siswa}}</span></h4>
                            <div class="mt-4">
                                <table id="data-table" class="table data-table">
                                    <thead>
                                        <tr>
                                            <th>Mata Pelajaran</th>
                                            <th>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(nilaisiswa, index) in nilaisiswa.data" :key="index">
                                            <td>{{nilaisiswa.nama_mapel}}</td>
                                            <td>{{nilaisiswa.nilai}}</td>
                                            <!-- <td>
                                                <router-link :to="{name: 'siswa.detail',params:{id:siswa.id_siswa}}" class="btn btn-info btn-sm">Detail</router-link>
                                                <button class="btn btn-danger btn-sm" @click.prevent="destroy(siswa.id_siswa, index)">Delete</button>
                                            </td> -->
                                        </tr>                                                                                                 
                                    </tbody>                                   
                                </table>
                            </div>
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
        const siswa = reactive({
            nama_siswa: '',
            nis_siswa: '',
            kelas_id: '',
            alamat_siswa: '',
        });

        const Validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios.get(`/api/siswa/${route.params.id}`)
            .then((result) => {
                siswa.nama_siswa = result.data.data.nama_siswa,
                siswa.nis_siswa = result.data.data.nis_siswa,
                siswa.kelas_id = result.data.data.kelas_id,
                siswa.alamat_siswa = result.data.data.alamat_siswa
            }).catch((err) => {
                console.log(err.response.data)
            });
        });

        let nilaisiswa = ref([]);

        onMounted(() => {
            //get data-nilaisiswa from api
            axios.get(`/api/nilai/${route.params.id}`)
            .then((result) => {
                nilaisiswa.value = result.data
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
                console.log(err.response.data)
            });
        });

        function update() {
            axios.put(
                `/api/siswa/${route.params.id}`,
                siswa
            )
             .then(() => {
                router.push({
                    name : 'siswa.index'
                })
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }

        return {
            siswa,
            nilaisiswa,
            kelas,
            Validation,
            router,
            update
        }
    }    
}
</script>