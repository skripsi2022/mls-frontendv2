<template>
    <div class="content">
        <div class="main">
            <div class="page-header">
                <h4 class="page-title">Daftar Nilai</h4>
                <div class="breadcrumb">
                    <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                    <div class="breadcrumb-item">Home</div>
                    <div class="breadcrumb-item">Nilai</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <!-- <div class="card">
                        <div class="card-body" style="position: relative;">
                            <div class="d-flex align-items-center justify-content-between">
                                <div>
                                    <h3>$168.90</h3>
                                    <span class="text-muted fw-semibold">Total Nilai</span>
                                </div>                              
                            </div>
                            <div class="resize-triggers">
                                <div class="expand-trigger">
                                </div>
                            </div>
                        </div> 
                    </div> -->
                </div>
                <div class="col-lg-9">
                    <div class="">
                        <!-- <div class="card-body" style="position: relative;">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <router-link :to="{name :'nilai.create'}" class="btn btn-primary me-md-end"
                                    type="button"><i class="icon-plus-circle feather"></i>Tambah</router-link>
                            </div>
                        </div> -->
                    </div>
                </div>

            </div>
            <div class="card">
                <div class="card-body">
                    <h4>Daftar Nilai</h4>
                    <div class="mt-4">
                        <table id="data-table" class="table data-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Nama</th>
                                    <th>Mata Pelajaran</th>
                                    <th>Nilai</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(nilai, index) in nilai.data" :key="index">
                                    <td>{{++index}}</td>
                                    <td>{{nilai.siswa.nama_siswa}}</td>
                                    <td>{{nilai.ujian.nama_ujian}}</td>
                                    <td>{{nilai.nilai}}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm"
                                            @click.prevent="destroy(nilai.id_nilai, index)">Delete</button>
                                        <router-link :to="{ name: 'nilai.detail', params: { id: nilai.id_nilai}}"
                                            class="btn btn-info btn-sm">Detail</router-link>
                                    </td>
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

import axios from 'axios'
import {onMounted, ref} from 'vue'
import Swal from 'sweetalert2'

export default {
    // 
    setup(){
            let nilai = ref([]);

            onMounted(() => {
                //get data-nilai from api
                axios.get('/api/nilai')
                .then((result) => {
                    nilai.value = result.data
                }).catch((err) => {
                    console.log(err.response)
                });
            });

         async function destroy(id,index){
             Swal.fire({
                 title: 'Hapus Data Nilai',
                 text: "Yakin dihapus ?",
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Hapus !'
             }).then((result) => {
                 if (result.isConfirmed) {
                     axios.delete(
                         `/api/nilai/${id}`
                     )
                         .then(() => {
                             nilai.value.data.splice(index, 1)
                             Swal.fire({
                                 title: 'Berhasil!',
                                 text: 'Nilai Berhasil dihapus',
                                 icon: 'success',
                                 confirmButtonText: 'Lanjut !'
                             }
                             )
                             //  window.location.reload();
                         }).catch((err) => {
                             console.log(err.response.data);
                             Swal.fire({
                                 title: 'Gagal!',
                                 text: 'Nilai memiliki relasi dengan tabel lain !',
                                 icon: 'error',
                                 confirmButtonText: 'Lanjut !'
                             }
                             )
                         });

                 }
             })
           
        } 

        return {
            nilai,destroy
        }
    }
}
</script>