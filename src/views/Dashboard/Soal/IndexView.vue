<template>
    <div class="content container">
        <div class="main">
            <div class="row">
                <div class="col-lg-8">
                    <div class="page-header">
                        <h4 class="page-title">Soal</h4>
                        <div class="breadcrumb">
                            <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                            <div class="breadcrumb-item">Home</div>
                            <div class="breadcrumb-item">Ujian</div>
                            <div class="breadcrumb-item">Soal</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="d-grid d-md-flex justify-content-md-end">
                        <router-link :to="{name: 'ujian.index'}" class="btn btn-warning me-md-end" type="button"><i
                                class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                    </div>
                </div>
            </div>
            <br>
            <div class="card">
                <div class="card-body">
                    <h4> Ujian : <span class="lead">{{ujian.nama_ujian}}</span> </h4>
                    <div class="mt-4">
                        <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="detail-tab" data-bs-toggle="tab"
                                    data-bs-target="#detail" type="button" role="tab" aria-controls="detail"
                                    aria-selected="true">Detail Ujian</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="tambah-tab" data-bs-toggle="tab" data-bs-target="#tambah"
                                    type="button" role="tab" aria-controls="tambah" aria-selected="false">Tambah
                                    Soal</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="daftar-tab" data-bs-toggle="tab" data-bs-target="#daftar"
                                    type="button" role="tab" aria-controls="daftar" aria-selected="false">Daftar
                                    Soal</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="detail" role="tabpanel" aria-labelledby="detail-tab">
                                <div class="card">
                                    <div class="card-body">
                                        <h4>Detail Ujian</h4>
                                        <br>
                                        <form class="row g-3">
                                            <div class="col-md-6">
                                                <label for="" class="form-label">Nama Ujian</label>
                                                <input type="text" class="form-control" v-model="ujian.nama_ujian"
                                                    disabled="">
                                                <div v-if="Validation.nama_ujian" class="text-danger">
                                                    {{Validation.nama_ujian[0]}}
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="" class="form-label">Mata Pelajaran</label>
                                                <input type="text" class="form-control" v-model="ujian.mapel"
                                                    disabled="">
                                                <div v-if="Validation.mapel" class="text-danger">
                                                    {{Validation.mapel[0]}}
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="" class="form-label">Kelas</label>
                                                <input type="text" class="form-control" v-model="ujian.kelas"
                                                    disabled="">
                                                <div v-if="Validation.kelas_id" class="text-danger">
                                                    {{Validation.kelas_id[0]}}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="tambah" role="tabpanel" aria-labelledby="tambah-tab">
                                <div class="card">
                                    <div class="card-body">
                                        <h4>Tambah Soal</h4>
                                        <br>
                                        <form class="row g-3" @submit.prevent="store()">
                                            <div class="col-md-12">
                                                <label for="" class="form-label">Isi Soal</label>
                                                <textarea type="text" class="form-control"
                                                    v-model="addsoal.isi_soal"></textarea>
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
                            <div class="tab-pane fade" id="daftar" role="tabpanel" aria-labelledby="daftar-tab">
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
                                                            <!-- <router-link :to="{name: 'ujian.detail',params:{id:soal.id_soal}}"
                                            class="btn btn-info btn-sm">Detail</router-link> -->
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive ,ref, onMounted} from 'vue'
import { useRoute, useRouter} from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  
    setup(){
       
        //data binding
        const ujian = reactive({
            nama_ujian: '',
            id_ujian: '',
            mapel: '',
            kelas: '',
        });

        
        const Validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios.get(`/api/ujian/${route.params.id}`)
            .then((result) => {
                // localStorage.removeItem("ujian_id")

                ujian.id_ujian = result.data.data.id_ujian
                ujian.nama_ujian = result.data.data.nama_ujian
                ujian.mapel = result.data.data.mapel.nama_mapel
                ujian.kelas = result.data.data.kelas.nama_kelas
                
                //set localStorage
                // localStorage.removeItem('ujian_id');
                localStorage.setItem("ujian_id", ujian.id_ujian)
                
                console.log("ujian_id :" + localStorage.ujian_id)
                
            }).catch((err) => {
                console.log(err.response.data)
            });
        });

        // let id_ujian = localStorage.getItem('ujian_id');

        const addsoal = reactive({
            isi_soal: '',
            opsi_a: '',
            opsi_b: '',
            opsi_c: '',
            opsi_d: '',
            opsi_benar: '',
            ujian_id: '',
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


        async function store() {
            
            axios.post(
                '/api/soal',
                addsoal , 
                addsoal.ujian_id = localStorage.ujian_id
            )
             .then(() => {                
                localStorage.removeItem('ujian_id');
                 Swal.fire({
                     title: 'Success!',
                     text: 'Data Soal Berhasil ditambahkan !',
                     icon: 'success',
                     confirmButtonText: 'Lanjut !'
                 })
                router.push({
                   name: 'ujian.index',
                })
                //  window.location.href = "/#/soal"
                
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }

        function back() {
            console.log("balek ges")
        }
        
       async function destroy(id,index){
           Swal.fire({
               title: 'Hapus Soal',
               text: "Yakin dihapus ?",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Hapus !'
           }).then((result) => {
               if (result.isConfirmed) {
                    axios.delete(
                        `/api/soal/${id}`
                    )
                       .then(() => {
                           soal.value.data.splice(index, 1)
                           Swal.fire({
                               title: 'Berhasil!',
                               text: 'Soal Berhasil dihapus',
                               icon: 'success',
                               confirmButtonText: 'Lanjut !'
                           }
                           )
                          router.push({
                                name: 'ujian.index'
                            })
                       }).catch((err) => {
                           console.log(err.response.data);
                           Swal.fire({
                               title: 'Gagal!',
                               text: 'Kosongkan Jawaban terlebih dahulu !',
                               icon: 'error',
                               confirmButtonText: 'Lanjut !'
                           }
                           )
                       });

               }
           })
        } 

        return {
            ujian,
            soal,
            back,
            store,destroy,
            addsoal,
            Validation,
            router,
        }
    }    
}
</script>