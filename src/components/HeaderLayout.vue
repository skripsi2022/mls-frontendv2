<template>
<div class="header-text-dark header-nav layout-vertical">
                <div class="header-nav-wrap">
                    <div class="header-nav-left">
                        <div class="header-nav-item desktop-toggle">
                            <div class="header-nav-item-select cursor-pointer">
                                <i class="nav-icon feather icon-menu icon-arrow-right"></i>
                            </div>
                        </div>
                        <div class="header-nav-item mobile-toggle">
                            <div class="header-nav-item-select cursor-pointer">
                                <i class="nav-icon feather icon-menu icon-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div class="header-nav-right">
                        <div class="header-nav-item">
                            <div class="header-nav-item-select">
                                <div class="toggle-wrapper" data-bs-toggle="modal" data-bs-target="#quick-view">
                                    <i class="nav-icon feather icon-settings"></i>
                                </div>
                            </div>
                        </div>
                        <div class="header-nav-item">
                            <div class="dropdown header-nav-item-select nav-profile" >
                                <div class="toggle-wrapper" id="nav-profile-dropdown" data-bs-toggle="dropdown">
                                    <div class="avatar avatar-circle avatar-image" style="width: 35px; height: 35px; line-height: 35px;">
                                        <img src="assets/images/avatars/user.png" alt="">
                                    </div>
                                    <span class="fw-bold mx-1">{{ name }}</span>
                                    <i class="feather icon-chevron-down"></i>
                                </div>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <div class="nav-profile-header">
                                       <div class="d-flex align-items-center">
                                            <div class="avatar avatar-circle avatar-image">
                                                <img src="assets/images/avatars/user.png" alt="">
                                            </div>
                                            <div class="d-flex flex-column ms-1">
                                                <span class="fw-bold text-dark">{{ name }}</span>
                                                <span class="font-size-sm">{{ user.email }}</span>
                                            </div>
                                       </div>
                                    </div>
                                    <a href="javascript:void(0)" class="dropdown-item">
                                       <div class="d-flex align-items-center">
                                           <i class="font-size-lg me-2 feather icon-settings"></i>
                                           <span>Settings</span>
                                        </div>
                                    </a>
                                    <a href="javascript:void(0)" class="dropdown-item" @click="logout">
                                       <div class="d-flex align-items-center"><i class="font-size-lg me-2 feather icon-power"></i>
                                        <span>Sign Out</span>
                                    </div>
                                    </a>
                                 </div>
                            </div>
                        </div>     
                    </div>
                </div>
            </div>
</template>
<script>

import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'dashboard.IndexView',

    data() {
        return {
            //state loggedIn with localStorage
            loggedIn: localStorage.getItem('loggedIn'),
            //state token
            token: localStorage.getItem('token'),

            name: localStorage.getItem('name'),
            //state user logged In
            user: []
        }
    },

   

    methods: {
        logout() {
            Swal.fire({
                title: 'Yakin Logout ?',
                text: "huft :( selamat jalan ",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '<i class="icon-log-out feather"></i> Logout'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.get('/api/logout')
                        .then(() => {
                            //remove localStorage
                            localStorage.clear();

                            //redirect
                            return this.$router.push({ name: 'auth.index' })
                        })
                }
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

