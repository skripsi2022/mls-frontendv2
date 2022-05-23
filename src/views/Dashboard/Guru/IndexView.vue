<template>
    <div class="content">
                <div class="main">                    
                    <div class="page-header">
                        <h4 class="page-title">Data Guru</h4>
                        <div class="breadcrumb">
                           <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                           <div class="breadcrumb-item">Home</div>
                           <div class="breadcrumb-item">Guru</div>
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
                                        <router-link :to="{name :'guru.create'}" class="btn btn-primary me-md-end" type="button"><i class="icon-plus-circle feather"></i>Tambah</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4>Data Guru</h4>
                            <div class="mt-4">
                                <table id="data-table" class="table data-table">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Email</th>
                                            <th>No. Telp</th>
                                            <th>Alamat</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(guru, index) in guru.data" :key="index">
                                            <td>{{guru.nama_guru}}</td>
                                            <td>{{guru.email_guru}}</td>
                                            <td>{{guru.notelp_guru}}</td>
                                            <td>{{guru.alamat_guru}}</td>
                                            <td>
                                                <router-link :to="{name: 'guru.detail',params:{id:guru.id_guru}}" class="btn btn-info btn-sm">Detail</router-link>
                                                <button class="btn btn-danger btn-sm" @click.prevent="destroy(guru.id_guru, index)">Delete</button>
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
        let guru = ref([]);

        onMounted(() => {
            //get guru from api
            axios.get('http://localhost:8000/api/guru')
            .then((result) => {
                guru.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });

         function destroy(id,index){
            axios.delete(
                `http://localhost:8000/api/guru/${id}`
            )
            .then(() => {
                guru.value.data.splice(index,1)
            }).catch((err) => {
                console.log(err.response.data);
            });
        } 

        return {
            guru,destroy
        }
    }
}
</script>