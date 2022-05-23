<template>
     <div class="content container">
                <div class="main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="page-header">
                                <h4 class="page-title">Jurusan</h4>
                                <div class="breadcrumb">
                                <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                                <div class="breadcrumb-item">Home</div>
                                <div class="breadcrumb-item">Jurusan</div>
                                <div class="breadcrumb-item">Tambah Jurusan</div>
                                </div>                         
                            </div>
                        </div>
                        <div class="col-lg-4">
                             <div class="d-grid d-md-flex justify-content-md-end">
                                <router-link to="/jurusan" class="btn btn-warning me-md-end" type="button"><i class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                             </div>
                        </div>
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <h4>Tambah Jurusan</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="store()">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Nama Jurusan</label>
                                    <input type="text" class="form-control" v-model="jurusan.nama_jurusan">
                                    <div v-if="Validation.nama_jurusan" class="text-danger">
                                        {{Validation.nama_jurusan[0]}}
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
import {reactive ,ref} from 'vue'
import { useRouter} from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        //data binding
        const jurusan = reactive({
            nama_jurusan: '',
        });

        const Validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post(
                'http://localhost:8000/api/jurusan',
                jurusan
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
            jurusan,
            Validation,
            router,
            store
        }
    }    
}
</script>