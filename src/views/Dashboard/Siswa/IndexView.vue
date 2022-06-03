<template>
    <div class="content">
                <div class="main">                    
                    <div class="page-header">
                        <h4 class="page-title">Data Siswa</h4>
                        <div class="breadcrumb">
                           <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                           <div class="breadcrumb-item">Home</div>
                           <div class="breadcrumb-item">Siswa</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
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
                        </div>                        
                        <div class="col-lg-9">
                            <div class="">                            
                                <div class="card-body" style="position: relative;">
                                     <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <router-link :to="{name :'siswa.create'}" class="btn btn-primary me-md-end" type="button"><i class="icon-plus-circle feather"></i>Tambah</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4>Data Siswa</h4>
                            <div class="mt-4">
                                <table id="data-table" class="table data-table">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>NIS</th>
                                            <th>Kelas</th>
                                            <th>Alamat</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(siswa, index) in siswa.data" :key="index">
                                            <td>{{siswa.nama_siswa}}</td>
                                            <td>{{siswa.nis_siswa}}</td>
                                            <td>{{siswa.kelas.nama_kelas}}</td>
                                            <td>{{siswa.alamat_siswa}}</td>
                                            <td>
                                                <router-link :to="{name: 'siswa.detail',params:{id:siswa.id_siswa}}" class="btn btn-info btn-sm">Detail</router-link>
                                                <button class="btn btn-danger btn-sm" @click.prevent="destroy(siswa.id_siswa, index)">Delete</button>
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

export default {
    // 
    setup(){
        let siswa = ref([]);

        onMounted(() => {
            //get siswa from api
            axios.get('/api/siswa')
            .then((result) => {
                siswa.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });

         function destroy(id,index){
            axios.delete(
                `/api/siswa/${id}`
            )
            .then(() => {
                siswa.value.data.splice(index,1)
            }).catch((err) => {
                console.log(err.response.data);
            });
        } 

        return {
            siswa,destroy
        }
    }
}
</script>