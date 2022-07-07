<template>
    <div class="content">
                <div class="main">                    
                    <div class="page-header">
                        <h4 class="page-title">Data Jurusan</h4>
                        <div class="breadcrumb">
                           <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                           <div class="breadcrumb-item">Home</div>
                           <div class="breadcrumb-item">Jurusan</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">                            
                        </div>
                        <div class="col-lg-3">                            
                        </div>
                        <div class="col-lg-6">
                            <div class="">                            
                                <div class="card-body" style="position: relative;">
                                     <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <router-link :to="{name: 'jurusan.create'}" class="btn btn-primary me-md-end" type="button"><i class="icon-plus-circle feather"></i>Tambah Jurusan</router-link>
                                        <router-link :to="{name: 'kelas.create'}" class="btn btn-success me-md-end" type="button"><i class="icon-plus-circle feather"></i>Tambah Kelas</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4>Data Jurusan</h4>
                            <div class="mt-4">
                                <table id="data-table" class="table data-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama</th>                                           
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(jurusan, index) in jurusan.data" :key="index">
                                            <td>{{++index}}</td> 
                                            <td>{{jurusan.nama_jurusan}}</td>
                                            <td>
                                                <router-link :to="{name: 'jurusan.detail',params:{id:jurusan.id_jurusan}}" class="btn btn-info btn-sm">Detail</router-link>
                                                <button class="btn btn-danger btn-sm" @click.prevent="destroy(jurusan.id_jurusan, index)">Delete</button>
                                            </td>
                                        </tr>                                                                                                 
                                    </tbody>                                   
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4>Data Kelas</h4>
                            <div class="mt-4">
                                <table id="data-table" class="table data-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Kelas</th>                                           
                                            <th>Jurusan</th>                                           
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(kelas, index) in kelas.data" :key="index">
                                            <td>{{++index}}</td> 
                                            <td>{{kelas.nama_kelas}}</td>
                                            <td>{{kelas.jurusan.nama_jurusan}}</td>
                                            <td>
                                                <router-link :to="{name: 'kelas.detail',params:{id:kelas.id_kelas}}" class="btn btn-info btn-sm">Detail</router-link>
                                                <button class="btn btn-danger btn-sm" @click.prevent="destroyKelas(kelas.id_kelas, index)">Delete</button>
                                            </td>
                                        </tr>                                                                                                 
                                    </tbody>                                   
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Footer START -->
                <!-- <div class="footer fixed-bottom">
                    <div class="footer-content">
                        <p class="mb-0">Copyright © 2022  All rights reserved.</p>
                        <span>
                            <a href="" class="text-gray me-3">Term &amp; Conditions</a>
                            <a href="" class="text-gray">Privacy &amp; Policy</a>
                        </span>
                    </div>
                </div> -->
                <!-- Footer End -->
            </div>
</template>

<script>

import axios from 'axios'
import {onMounted, ref} from 'vue'
import Swal from 'sweetalert2'

export default {
    // 
    setup(){
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

        async function destroy(id,index){
            Swal.fire({
                title: 'Hapus Data Jurusan',
                text: "Yakin dihapus ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus !'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(
                        `/api/jurusan/${id}`
                    )
                        .then(() => {
                            jurusan.value.data.splice(index, 1)
                            Swal.fire({
                                title: 'Berhasil!',
                                text: 'Jurusan Berhasil dihapus',
                                icon: 'success',
                                confirmButtonText: 'Lanjut !'
                            }
                            )
                             window.location.reload();
                        }).catch((err) => {
                            console.log(err.response.data);
                            Swal.fire({
                                title: 'Gagal!',
                                text: 'Jurusan memiliki relasi dengan tabel lain !',
                                icon: 'error',
                                confirmButtonText: 'Lanjut !'
                            }
                            )
                        });

                }
            })
        } 

        async function destroyKelas(id,index){
            Swal.fire({
                title: 'Hapus Data Kelas',
                text: "Yakin dihapus ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus !'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(
                        `/api/kelas/${id}`
                    )
                        .then(() => {
                            kelas.value.data.splice(index, 1)
                            Swal.fire({
                                title: 'Berhasil!',
                                text: 'Kelas Berhasil dihapus',
                                icon: 'success',
                                confirmButtonText: 'Lanjut !'
                            }
                            )
                             window.location.reload();
                        }).catch((err) => {
                            console.log(err.response.data);
                            Swal.fire({
                                title: 'Gagal!',
                                text: 'Kelas memiliki relasi dengan tabel lain !',
                                icon: 'error',
                                confirmButtonText: 'Lanjut !'
                            }
                            )
                        });
                }
            })           
        } 

        return {
            jurusan,kelas,destroy,destroyKelas
        }
    }
}
</script>