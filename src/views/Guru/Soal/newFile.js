import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default (await import('vue')).defineComponent({
setup() {
//data binding
const ujian = reactive({
nama_ujian: '',
id_ujian: '',
mapel_id: '',
kelas_id: '',
});

const addsoal = reactive({
isi_soal: '',
opsi_a: '',
opsi_b: '',
opsi_c: '',
opsi_d: '',
opsi_benar: '',
ujian_id: ujian.id_ujian,
});

const Validation = ref([]);

const router = useRouter();
const route = useRoute();

onMounted(() => {
axios.get(`/api/ujian/${route.params.id}`)
.then((result) => {
ujian.id_ujian = result.data.data.id_ujian;
ujian.nama_ujian = result.data.data.nama_ujian;
ujian.mapel_id = result.data.data.mapel_id;
ujian.kelas_id = result.data.data.kelas_id;
}).catch((err) => {
console.log(err.response.data);
});
});

let mapel = ref([]);

onMounted(() => {
//get mapel from api
axios.get('/api/mapel')
.then((result) => {
mapel.value = result.data;
}).catch((err) => {
console.log(err.response);
});
});

let soal = ref([]);

onMounted(() => {
//get mapel from api
axios.get(`/api/getSoalByUjian/${route.params.id}`)
.then((result) => {
soal.value = result.data;
}).catch((err) => {
console.log(err.response);
});
});

let kelas = ref([]);

onMounted(() => {
//get mapel from api
axios.get('/api/kelas')
.then((result) => {
kelas.value = result.data;
}).catch((err) => {
console.log(err.response);
});
});

function store() {
axios.post(
'/api/soal',
addsoal
)
.then(() => {
router.push({
name: 'ujian.index'
});
}).catch((err) => {
Validation.value = err.response.data;
});
}


function update() {
axios.put(
`/api/ujian/${route.params.id}`,
ujian
)
.then(() => {
router.push({
name: 'ujian.index'
});
}).catch((err) => {
Validation.value = err.response.data;
});
}

function destroy(id, index) {
axios.delete(
`/api/soal/${id}`
)
.then(() => {
soal.value.data.splice(index, 1);
}).catch((err) => {
console.log(err.response.data);
});
}

return {
ujian,
mapel,
kelas,
soal,
store, destroy, update,
addsoal,
Validation,
router,
};
}
});
