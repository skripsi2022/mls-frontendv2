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
                                <div class="text-success fw-bold font-size-lg">+18%</div>
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
                        <div class="card-body" style="position: relative;">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <router-link :to="{name :'guru.ujian.index'}" class="btn btn-warning me-md-end"
                                    type="button"><i class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                            </div>
                        </div>
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
                                <tr v-for="(nilaisiswa, index) in nilaisiswa.data" :key="index">
                                    <td>{{++index}}</td>
                                    <td>{{nilaisiswa.siswa.nama_siswa}}</td>
                                    <td>{{nilaisiswa.ujian.nama_ujian}}</td>
                                    <td>{{nilaisiswa.nilai}}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm"
                                            @click.prevent="destroy(nilaisiswa.id_nilai, index)">Delete</button>
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
import { useRoute} from 'vue-router'


export default {
    // 
    setup(){
            let nilaisiswa = ref([]);

            const route = useRoute();
            //  const router = useRouter();

            onMounted(() => {
                //get data-nilaisiswa from api
                axios.get(`/api/getNilaiUjian/${route.params.id}`)
                .then((result) => {
                    nilaisiswa.value = result.data
                }).catch((err) => {
                    console.log(err.response)
                });
            });

         function destroy(id,index){
            axios.delete(
                `/api/nilai/${id}`
            )
            .then(() => {
                nilaisiswa.value.data.splice(index,1)
                window.location.reload();
            }).catch((err) => {
                console.log(err.response.data);
            });
        } 

        return {
            nilaisiswa,destroy
        }
    }
}
</script>