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
                                <div class="breadcrumb-item">Tambah Soal</div>
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
                            <h4>Tambah Soal </h4>
                            <br>
                            <form class="row g-3" @submit.prevent="store()">
                                <div class="col-md-12">
                                    <label for="" class="form-label">Isi Soal</label>
                                    <textarea type="text" class="form-control" v-model="soal.nama_ujian"></textarea>
                                    <div v-if="Validation.nama_ujian" class="text-danger">
                                        {{Validation.nama_ujian[0]}}
                                    </div>
                                </div>                               
                                <div class="col-md-6">
                                    <label for="" class="form-label">A</label>
                                    <input type="text" class="form-control" v-model="soal.opsi_a">
                                    <div v-if="Validation.opsi_a" class="text-danger">
                                        {{Validation.opsi_a[0]}}
                                    </div>
                                </div>                               
                                <div class="col-md-6">
                                    <label for="" class="form-label">B</label>
                                    <input type="text" class="form-control" v-model="soal.opsi_b">
                                    <div v-if="Validation.opsi_b" class="text-danger">
                                        {{Validation.opsi_b[0]}}
                                    </div>
                                </div>                               
                                <div class="col-md-6">
                                    <label for="" class="form-label">C</label>
                                    <input type="text" class="form-control" v-model="soal.opsi_c">
                                    <div v-if="Validation.opsi_c" class="text-danger">
                                        {{Validation.opsi_c[0]}}
                                    </div>
                                </div>                               
                                <div class="col-md-6">
                                    <label for="" class="form-label">D</label>
                                    <input type="text" class="form-control" v-model="soal.opsi_d">
                                    <div v-if="Validation.opsi_d" class="text-danger">
                                        {{Validation.opsi_d[0]}}
                                    </div>
                                </div>                               
                                 <div class="col-md-6">
                                    <label for="" class="form-label">Jawaban Benar</label>
                                    <select name="soal" class="form-select"  v-model="soal.opsi_benar">
                                        <option value="opsi_a">A</option>
                                        <option value="opsi_b">B</option>
                                        <option value="opsi_c">C</option>
                                        <option value="opsi_d">D</option>
                                    </select>
                                    <div v-if="Validation.opsi_benar" class="text-danger">
                                        {{Validation.opsi_benar[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Ujian</label>
                                    <input type="text" class="form-control" v-model="soal.ujian_id" disabled="">
                                    <div v-if="Validation.ujian_id" class="text-danger">
                                        {{Validation.ujian_id[0]}}
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
                <div class="footer">
                    <div class="footer-content justify-content-md-end">
                        <p class="mb-0">Copyright © 2022. All rights reserved.</p>
                    </div>
                </div>
                <!-- Footer End -->
            </div>
</template>

<script>
import {reactive ,ref,onMounted} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        //data binding
        const soal = reactive({
            isi_soal: '',
            opsi_a: '',
            opsi_b: '',
            opsi_c: '',
            opsi_d: '',
            opsi_benar: '',
            ujian_id: '',
        });

        const ujian = reactive({
            id_ujian: '',
        });

        const Validation = ref([]);

        const router = useRouter();
        const route = useRoute();

         onMounted(() => {
            axios.get(`http://localhost:8000/api/ujian/${route.params.id}`)
            .then((result) => {
                ujian.id_ujian = result.data.data.id_ujian
            }).catch((err) => {
                console.log(err.response.data)
            });
        });

        function store() {
            axios.post(
                'http://localhost:8000/api/soal',
                soal
            )
             .then(() => {
                router.push({
                    name : 'ujian.index'
                })
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }

        return {
            soal,
            Validation,
            router,
            store
        }
    }    
}
</script>