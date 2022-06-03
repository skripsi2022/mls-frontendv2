<template>
    <div class="content">
                <div class="main">
                    <div class="page-header">
                        <h4 class="page-title">Dashboard</h4>
                        <div class="breadcrumb">
                           <span class="me-1 text-gray"><i class="feather icon-home"></i></span>
                           <div class="breadcrumb-item">Home</div>
                           <div class="breadcrumb-item">Dashboard</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Selamat Datang, {{ user.name }} </h4>
                        </div>
                        <div class="card-body">
                            
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

export default {
    name: 'IndexView',

    data() {
        return {
            //state loggedIn with localStorage
            loggedIn: localStorage.getItem('loggedIn'),
            //state token
            token: localStorage.getItem('token'),
            //state user logged In
            user: []
        }
    },

    created() {
        axios.get('api/user', {headers: {'Authorization': 'Bearer '+this.token}})
        .then(response => {
            console.log(response)
            this.user = response.data // assign response to state user
        })
    },

    methods: {
        logout() {
            axios.get('api/logout')
            .then(() => {
                //remove localStorage
                localStorage.removeItem("loggedIn")    

                //redirect
                return this.$router.push({ name: 'auth.index' })
            })
        }
    },

    //check user logged in or not
    mounted() {
        if(!this.loggedIn) {
            return this.$router.push({ name: 'auth.index' })
        }
        
        
    }
}
</script>