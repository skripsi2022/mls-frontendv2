<template>
    <div class="content container">
        <div class="main">
            <div class="row">
                <div class="col-lg-8">
                    <div class="page-header">
                        <h4 class="page-title">Nilai</h4>
                        <div class="breadcrumb">
                            <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                            <div class="breadcrumb-item">Home</div>
                            <div class="breadcrumb-item">Nilai</div>
                            <div class="breadcrumb-item">Detail Nilai</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="d-grid d-md-flex justify-content-md-end">
                        <router-link :to="{name: 'guru.ujian.index'}" class="btn btn-warning me-md-end" type="button"><i
                                class="icon-arrow-left-circle feather"></i>Kembali</router-link>
                    </div>
                </div>
            </div>
            <br>
            <div class="card">
                <div class="card-body">
                    <h4>Detail Nilai</h4>
                    <br>
                    <form class="row g-3" @submit.prevent="update()">
                        <div class="col-md-4">
                            <label for="" class="form-label">Nama</label>
                            <input type="text" class="form-control" v-model="nilai.nama_siswa" disabled="">
                            <div v-if="Validation.nama_siswa" class="text-danger">
                                {{Validation.nama_siswa[0]}}
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="" class="form-label">Ujian</label>
                            <input type="text" class="form-control" v-model="nilai.nama_ujian" disabled="">
                            <div v-if="Validation.nama_ujian" class="text-danger">
                                {{Validation.nama_ujian[0]}}
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="" class="form-label">Nilai</label>
                            <input type="text" class="form-control" v-model="nilai.nilai">
                            <div v-if="Validation.nilai" class="text-danger">
                                {{Validation.nilai[0]}}
                            </div>
                        </div>

                        <div class="col-12">
                            <button class="btn btn-warning" type="submit">Update</button>
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
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //data binding
        const nilai = reactive({
            nama_siswa: '',
            nama_ujian: '',
            nilai: ''
        });

        const Validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios.get(`/api/getNilai/${route.params.id}`)
                .then((result) => {
                    nilai.nama_siswa = result.data.data.siswa.nama_siswa,
                        nilai.nama_ujian = result.data.data.ujian.nama_ujian,
                        nilai.nilai = result.data.data.nilai
                }).catch((err) => {
                    console.log(err.response.data)
                });
        });

        function update() {
            console.log(nilai);
            axios.put(
                `/api/updNilai/${route.params.id}`,
                nilai
            )
                .then(() => {
                    router.push({
                        name: 'guru.nilai.index'
                    })
                }).catch((err) => {
                    Validation.value = err.response.data
                });
        }

        return {
            nilai,
            Validation,
            router,
            update
        }
    }
}
</script>