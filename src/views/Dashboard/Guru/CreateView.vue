<template>
     <div class="content container">
                <div class="main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="page-header">
                                <h4 class="page-title">Guru</h4>
                                <div class="breadcrumb">
                                <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                                <div class="breadcrumb-item">Home</div>
                                <div class="breadcrumb-item">Guru</div>
                                <div class="breadcrumb-item">Tambah Guru</div>
                                </div>                         
                            </div>
                        </div>
                        <div class="col-lg-4">
                             <div class="d-grid d-md-flex justify-content-md-end">
                                <router-link :to="{name: 'guru.index'}" class="btn btn-warning me-md-end" type="button"><i class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                             </div>
                        </div>
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <h4>Tambah Guru</h4>
                            <br>
                            <form class="row g-3" @submit.prevent="store()">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Nama Lengkap</label>
                                    <input type="text" class="form-control" v-model="guru.nama_guru">
                                    <div v-if="Validation.nama_guru" class="text-danger">
                                        {{Validation.nama_guru[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Email</label>
                                    <input type="text" class="form-control" v-model="guru.email_guru">
                                    <div v-if="Validation.email_guru" class="text-danger">
                                        {{Validation.email_guru[0]}}
                                    </div>
                                </div>                               
                                <div class="col-md-4">
                                    <label for="" class="form-label">No. Telp</label>
                                    <input type="text" class="form-control" v-model="guru.notelp_guru">
                                    <div v-if="Validation.notelp_guru" class="text-danger">
                                        {{Validation.notelp_guru[0]}}
                                    </div>
                                </div>                               
                                <div class="col-md-8">
                                    <label for="" class="form-label">Alamat</label>
                                    <textarea type="text" class="form-control" v-model="guru.alamat_guru"></textarea>
                                    <div v-if="Validation.alamat_guru" class="text-danger">
                                        {{Validation.alamat_guru[0]}}
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
import {reactive ,ref} from 'vue'
import { useRouter} from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    setup(){
        //data binding
        const guru = reactive({
            nama_guru: '',
            notelp_guru: '',
            email_guru: '',
            alamat_guru: '',
        });

        const Validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post(
                '/api/guru',
                guru
            )
             .then(() => {
                 Swal.fire({
                     title: 'Berhasil!',
                     text: 'Guru Berhasil ditambahkan',
                     icon: 'success',
                     confirmButtonText: 'Lanjut !'
                 }
                 )
                router.push({
                    name : 'guru.index'
                })
            }).catch((err) => {
                Swal.fire({
                    title: 'Gagal !',
                    text: 'Pastikan Data Lengkap yaa !',
                    icon: 'warning',
                    confirmButtonText: 'Lanjut !'
                }
                )
                Validation.value = err.response.data
            });
        }

        return {
            guru,
            Validation,
            router,
            store
        }
    }    
}
</script>