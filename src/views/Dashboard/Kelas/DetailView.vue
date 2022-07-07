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
                                <div class="breadcrumb-item">Kelas</div>
                                <div class="breadcrumb-item">Detail</div>
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
                            <h4>Detail Kelas</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="update()">
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
                                    <button class="btn btn-warning" type="submit">Update</button>
                                </div>
                            </form>  
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4 >Data Siswa {{kelas.nama_kelas}}</h4>
                            <div class="mt-4">
                                <table id="data-table" class="table data-table">
                                    <thead>
                                        <tr>
                                            <th>Nama Lengkap</th>                                           
                                            <th>NIS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(siswa, index) in siswa.data" :key="index"> 
                                            <td>{{siswa.nama_siswa}}</td>
                                            <td>{{siswa.nis_siswa}}</td>                                            
                                        </tr>                                                                                                 
                                    </tbody>                                   
                                </table>
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

export default {
    setup(){
        //data binding
        const kelas = reactive({
            nama_kelas: '',
            jurusan_id: '',
        });

        const Validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios.get(`/api/kelas/${route.params.id}`)
            .then((result) => {
                kelas.nama_kelas = result.data.data.nama_kelas
                kelas.jurusan_id = result.data.data.jurusan_id
            }).catch((err) => {
                console.log(err.response.data)
            });
        });

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
        
        let siswa = ref([]);

        onMounted(() => {
            //get siswa from api
            axios.get(`/api/getkelas/${route.params.id}`)
            .then((result) => {
                siswa.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });


        function update() {
            axios.put(
                `/api/kelas/${route.params.id}`,
                kelas
            )
             .then(() => {
                router.push({
                    name : 'jurusan.index'
                })
            }).catch((err) => {
                Validation.value = err.response.data
            });
        }

        return {
            kelas,
            siswa,
            jurusan,
            Validation,
            router,
            update
        }
    }    
}
</script>