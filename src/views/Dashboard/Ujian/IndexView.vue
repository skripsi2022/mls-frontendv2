<template>
    <div class="content">
        <div class="main">
            <div class="page-header">
                <h4 class="page-title">Data Ujian</h4>
                <div class="breadcrumb">
                    <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                    <div class="breadcrumb-item">Home</div>
                    <div class="breadcrumb-item">Ujian</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <!-- <div class="card"> -->
                        <!-- <div class="card-body" style="position: relative;">
                            <div class="d-flex align-items-center justify-content-between">
                                <div>
                                    <h3>4 Ujian</h3>
                                    <span class="text-muted fw-semibold">Total</span>
                                </div>
                                <div class="text-warning fw-bold font-size-lg"><i class="icon-book-open feather"></i>
                                </div>
                            </div>
                            <div class="resize-triggers">
                                <div class="expand-trigger">
                                </div>
                            </div>
                        </div> -->
                    <!-- </div> -->
                </div>
                <!-- <div class="col-lg-3">
                            <div class="card">                            
                                <div class="card-body" style="position: relative;">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3>$168.90</h3>
                                            <span class="text-muted fw-semibold">This Month</span>
                                        </div>
                                        <div class="text-success fw-bold font-size-lg">+18%</div>
                                        </div>
                                    <div class="resize-triggers">
                                        <div class="expand-trigger">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                <div class="col-lg-9">
                    <div class="">
                        <div class="card-body" style="position: relative;">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <router-link :to="{name: 'ujian.create'}" class="btn btn-primary me-md-end"
                                    type="button"><i class="icon-plus-circle feather"></i>Tambah</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4>Data Ujian</h4>
                    <div class="mt-4">
                        <table id="data-table" class="table data-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Nama Ujian</th>
                                    <th>Mata Pelajaran</th>
                                    <th>Kelas</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ujian, index) in ujian.data" :key="index">
                                    <td>{{++index}}</td>
                                    <td>{{ujian.nama_ujian}}</td>
                                    <td>{{ujian.mapel.nama_mapel}}</td>
                                    <td>{{ujian.kelas.nama_kelas}}</td>
                                    <td>
                                        <router-link :to="{name: 'ujian.detail',params:{id:ujian.id_ujian}}" class="btn btn-info btn-sm">Detail</router-link>
                                        <button class="btn btn-danger btn-sm" @click.prevent="destroy(ujian.id_ujian, index)">Delete</button>
                                        <router-link :to="{name: 'soal.index', params:{id:ujian.id_ujian}}" class="btn btn-warning btn-sm"><i class="icon-settings feather"></i>Atur Soal</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

import axios from 'axios'
import {onMounted, ref} from 'vue'
import Swal from 'sweetalert2'

export default {

    setup(){
        let ujian = ref([]);

        onMounted(() => {
            //get ujian from api
               console.log("ujian id : " + localStorage.ujian_id)
            axios.get('/api/ujian')
            .then((result) => {
                ujian.value = result.data

            }).catch((err) => {
                console.log(err.response)
            });
        });

        async function destroy(id,index){
            Swal.fire({
                title: 'Hapus Data Ujian',
                text: "Yakin dihapus ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Hapus !'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(
                        `/api/ujian/${id}`
                    )
                        .then(() => {
                            ujian.value.data.splice(index, 1)
                            Swal.fire({
                                title: 'Berhasil!',
                                text: 'Ujian Berhasil dihapus',
                                icon: 'success',
                                confirmButtonText: 'Lanjut !'
                                 }
                            )
                            window.location.reload();
                        }).catch((err) => {
                            console.log(err.response.data);
                            Swal.fire({
                                title: 'Gagal!',
                                text: 'Kosongkan Soal terlebih dahulu !',
                                icon: 'error',
                                confirmButtonText: 'Lanjut !'
                            }
                            )
                        });
                    
                }
            })
        } 

        return {
            ujian,destroy,
        }
    }
}
</script>