<template>
    <div class="content">
                <div class="main">                    
                    <div class="page-header">
                        <h4 class="page-title">Data Mata Pelajaran</h4>
                        <div class="breadcrumb">
                           <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                           <div class="breadcrumb-item">Home</div>
                           <div class="breadcrumb-item">Mapel</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="card">                            
                                <div class="card-body" style="position: relative;">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3>4 Mapel</h3>
                                            <span class="text-muted fw-semibold">Total</span>
                                        </div>
                                        <div class="text-warning fw-bold font-size-lg"><i class="icon-book-open feather"></i></div>
                                        </div>
                                    <div class="resize-triggers">
                                        <div class="expand-trigger">
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <router-link :to="{name: 'mapel.create'}" class="btn btn-primary me-md-end" type="button"><i class="icon-plus-circle feather"></i>Tambah</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4>Data Mata Pelajaran</h4>
                            <div class="mt-4">
                                <table id="data-table" class="table data-table">
                                    <thead>
                                        <tr>
                                            <th>Mata Pelajaran</th>                                           
                                            <th>Pengajar / Guru</th>                                           
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(mapel, index) in mapel.data" :key="index"> 
                                            <td>{{mapel.nama_mapel}}</td>
                                            <td>{{mapel.guru.nama_guru}}</td>
                                            <td>
                                                <router-link :to="{name: 'mapel.detail',params:{id:mapel.id_mapel}}" class="btn btn-info btn-sm">Detail</router-link>
                                                <button class="btn btn-danger btn-sm" @click.prevent="destroy(mapel.id_mapel, index)">Delete</button>
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
        let mapel = ref([]);

        onMounted(() => {
            //get mapel from api
            axios.get('http://localhost:8000/api/mapel')
            .then((result) => {
                mapel.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });

        function destroy(id,index){
            axios.delete(
                `http://localhost:8000/api/mapel/${id}`
            )
            .then(() => {
                mapel.value.data.splice(index,1)
            }).catch((err) => {
                console.log(err.response.data);
            });
        } 

        return {
            mapel,destroy,
        }
    }
}
</script>