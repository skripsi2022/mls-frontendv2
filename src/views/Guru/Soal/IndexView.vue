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
                            <div class="breadcrumb-item">Detail</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="d-grid d-md-flex justify-content-md-end">
                        <router-link :to="{name: 'guru.ujian.index'}" class="btn btn-warning me-md-end" type="button"><i
                                class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                        <!-- <router-link :to="{name: 'soal.create', params:{id:ujian.id_ujian}}" class="btn btn-success me-md-end" type="button"><i class="icon-plus-circle feather"></i>Tambah</router-link> -->
                        <button class="btn btn-primary me-md-end" data-bs-toggle="modal"
                            data-bs-target="#exampleModalCenter">Tambah</button>
                    </div>
                </div>
            </div>
            <br>
            <div class="card">
                <div class="card-body">
                    <h4>Detail Ujian</h4>
                    <br>
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="" class="form-label">Nama Ujian</label>
                            <input type="text" class="form-control" v-model="ujian.nama_ujian" disabled="">
                            <div v-if="Validation.nama_ujian" class="text-danger">
                                {{Validation.nama_ujian[0]}}
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="" class="form-label">Mata Pelajaran</label>
                            <select name="guru" class="form-select" v-model="ujian.mapel_id" disabled="">
                                <option v-for="(mapel, index) in mapel.data" :key="index" :value="mapel.id_mapel">
                                    {{mapel.nama_mapel}}</option>
                            </select>
                            <div v-if="Validation.mapel_id" class="text-danger">
                                {{Validation.mapel_id[0]}}
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="" class="form-label">Kelas</label>
                            <select name="guru" class="form-select" v-model="ujian.kelas_id" disabled="">
                                <option v-for="(kelas, index) in kelas.data" :key="index" :value="kelas.id_kelas">
                                    {{kelas.nama_kelas}}</option>
                            </select>
                            <div v-if="Validation.kelas_id" class="text-danger">
                                {{Validation.kelas_id[0]}}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4>Soal <span class="lead">{{ujian.nama_ujian}}</span> </h4>
                    <div class="mt-4">
                        <table id="data-table" class="table data-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Soal</th>
                                    <th>A</th>
                                    <th>B</th>
                                    <th>C</th>
                                    <th>D</th>
                                    <th>Jawaban</th>
                                    <th>Action</th>
                                </tr>   
                            </thead>
                            <tbody>
                                <tr v-for="(soal, index) in soal.data" :key="index">
                                    <td>{{++index}}</td>
                                    <td>{{soal.isi_soal}}</td>
                                    <td>{{soal.opsi_a}}</td>
                                    <td>{{soal.opsi_b}}</td>
                                    <td>{{soal.opsi_c}}</td>
                                    <td>{{soal.opsi_d}}</td>
                                    <td>{{soal.opsi_benar}}</td>
                                    <td>
                                        <router-link :to="{name: 'ujian.detail',params:{id:soal.id_soal}}"
                                            class="btn btn-info btn-sm">Detail</router-link>
                                        <button class="btn btn-danger btn-sm"
                                            @click.prevent="destroy(soal.id_soal, index)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterLabel">Tambah Soal</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <form class="row g-3" @submit.prevent="store()">
                                <div class="col-md-12">
                                    <label for="" class="form-label">Isi Soal</label>
                                    <textarea type="text" class="form-control" v-model="addsoal.isi_soal"></textarea>
                                    <div v-if="Validation.isi_soal" class="text-danger">
                                        {{Validation.isi_soal[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">A</label>
                                    <input type="text" class="form-control" v-model="addsoal.opsi_a">
                                    <div v-if="Validation.opsi_a" class="text-danger">
                                        {{Validation.opsi_a[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">B</label>
                                    <input type="text" class="form-control" v-model="addsoal.opsi_b">
                                    <div v-if="Validation.opsi_b" class="text-danger">
                                        {{Validation.opsi_b[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">C</label>
                                    <input type="text" class="form-control" v-model="addsoal.opsi_c">
                                    <div v-if="Validation.opsi_c" class="text-danger">
                                        {{Validation.opsi_c[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">D</label>
                                    <input type="text" class="form-control" v-model="addsoal.opsi_d">
                                    <div v-if="Validation.opsi_d" class="text-danger">
                                        {{Validation.opsi_d[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Jawaban Benar</label>
                                    <select name="soal" class="form-select" v-model="addsoal.opsi_benar">
                                        <option value="opsi_a">A</option>
                                        <option value="opsi_b">B</option>
                                        <option value="opsi_c">C</option>
                                        <option value="opsi_d">D</option>
                                    </select>
                                    <div v-if="Validation.opsi_benar" class="text-danger">
                                        {{Validation.opsi_benar[0]}}
                                    </div>
                                </div> 
                                <div class="col-12">
                                    <button class="btn btn-primary" type="submit">Tambah</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer START -->
        <!-- <div class="footer fixed-bottom ">
                    <div class="footer-content justify-content-md-end">
                        <p class="mb-0">Copyright © 2022. All rights reserved.</p>
                    </div>
                </div> -->
        <!-- Footer End -->
    </div>
</template>

<script>
import {reactive ,ref, onMounted} from 'vue'
import { useRoute, useRouter} from 'vue-router'
import axios from 'axios'

export default {
    
    setup(){
        let ujian_id = localStorage.ujian_id;
        //data binding
        const ujian = reactive({
            nama_ujian: '',
            id_ujian: '',
            mapel_id: '',
            kelas_id: '',
        });

        const addsoal = reactive({
            isi_soal: '',
            opsi_a: '',
            opsi_b: '',
            opsi_c: '',
            opsi_d: '',
            opsi_benar: '',
            ujian_id: ujian_id,
        });
        
        const Validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios.get(`/api/ujian/${route.params.id}`)
            .then((result) => {
                ujian.id_ujian = result.data.data.id_ujian
                ujian.nama_ujian = result.data.data.nama_ujian
                ujian.mapel_id = result.data.data.mapel_id
                ujian.kelas_id = result.data.data.kelas_id
                //set localStorage
                localStorage.setItem("ujian_id", result.data.data.id_ujian)

            }).catch((err) => {
                console.log(err.response.data)
            });
        });

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

        let soal = ref([]);

        onMounted(() => {
            //get mapel from api
            axios.get(`/api/getSoalByUjian/${route.params.id}`)
            .then((result) => {
                soal.value = result.data
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

        function store() {
            console.log(addsoal)
            axios.post(
                '/api/soal',
                addsoal
            )
             .then(() => {
                localStorage.removeItem('ujian_id');
                router.push({
                    name : 'guru.ujian.index'
                })
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }


        function update() {
            axios.put(
                `/api/ujian/${route.params.id}`,
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

        function destroy(id,index){
            axios.delete(
                `/api/soal/${id}`
            )
            .then(() => {
                soal.value.data.splice(index,1)
            }).catch((err) => {
                console.log(err.response.data);
            });
        } 

        return {
            ujian,
            mapel,
            kelas,
            soal,
            store,destroy,update,
            addsoal,
            Validation,
            router,
        }
    }    
}
</script>