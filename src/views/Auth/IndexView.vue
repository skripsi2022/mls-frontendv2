<template>
    <div class="auth-full-height container d-flex flex-column justify-content-center">
        <div class="row justify-content-center">
            <div class="col-md-9">
                <div class="card row mx-0 flex-row overflow-hidden">
                    <div class="col-md-4 bg-size-cover d-flex align-items-center p-4" style="background-image: url('assets/images/others/bg-2.jpg');">
                        <div>
                            <div class="mb-5">
                                <div class="logo">
                                    <img alt="logo" class="img-fluid" src="assets/images/logo/logo-white.png" style="height: 50px;">
                                </div>
                            </div>
                            <h3 class="text-white">Learning System Management 2.0 </h3>
                            <p class="text-white mt-4 mb-5 o-75">Cloud Based Learning System with Proxmox VE - We Made Simple Cloud Computing Service.</p>
                        </div>
                    </div>
                    <div class="col-md-8 px-0">
                        <div class="card-body">
                            <div class="my-5 mx-auto" style="max-width: 350px;">
                                <div class="mb-3">
                                    <h3>Login</h3>
                                </div>
                                <form @submit.prevent="login">
                                    <div class="form-group mb-3">
                                        <label class="form-label">Email</label>
                                        <input class="form-control" v-model="user.email" />
                                         <div v-if="validation.email" class="text-danger">
                                            Masukkan Email !
                                         </div>
                                    </div>
                                   
                                    <div class="mb-3">
                                        <label class="form-label d-flex justify-content-between">
                                            <span>Password</span>
                                            <a href="" class="text-primary font">Forget Password?</a>
                                        </label>
                                        <div class="form-group input-affix flex-column">
                                            <label class="d-none">Password</label>
                                            <input formcontrolname="password" class="form-control" type="password" v-model="user.password">
                                            <i class="suffix-icon feather cursor-pointer text-dark icon-eye" ng-reflect-ng-class="icon-eye"></i>
                                        </div>
                                         <div v-if="validation.password" class="text-danger">
                                            Masukkan Password !
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">Log In</button>
                                </form>
                               <div v-if="validation.password" class="divider">
                                    <span class="divider-text text-danger">Password atau Email tidak sesuai !</span>
                                </div>
                                 <!-- <div class="row">
                                    <div class="col px-1">
                                        <button class="btn btn-outline-secondary w-100">
                                            <img src="assets/images/thumbs/thumb-1.png" alt="" style="max-width: 20px;">
                                        </button>
                                    </div>
                                    <div class="col px-1">
                                        <button class="btn btn-outline-secondary w-100">
                                            <img src="assets/images/thumbs/thumb-2.png" alt="" style="max-width: 20px;">
                                        </button>
                                    </div>
                                    <div class="col px-1">
                                        <button class="btn btn-outline-secondary w-100">
                                            <img src="assets/images/thumbs/thumb-3.png" alt="" style="max-width: 20px;">
                                        </button>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'Auth.IndexView',

        data() {
            return {
                //state loggedIn with localStorage
                loggedIn: localStorage.getItem('loggedIn'),
                //state token
                token: localStorage.getItem('token'),
                //state user
                user: [],
                //state validation
                validation: [],
                //state login failed
                loginFailed: null
            }
        },
        methods: {

            login() {
                if (this.user.email && this.user.password) {
                    axios.get('/sanctum/csrf-cookie')
                        .then(response => {

                            //debug cookie
                            console.log(response)

                            axios.post('/api/login', {
                                email: this.user.email,
                                password: this.user.password
                            }).then(res => {

                                //debug user login
                                console.log(res)

                                if (res.data.success) {
                                    //set localStorage User
                                    localStorage.setItem('user', JSON.stringify(res.data.user))

                                    //set localStorage
                                    localStorage.setItem("loggedIn", "true")

                                    //set localStorage Token
                                    localStorage.setItem("token", res.data.token)

                                    //set localStorage ID
                                    localStorage.setItem("id", res.data.user.id)

                                    //set localStorage Role
                                    localStorage.setItem("role", res.data.role)
                                    
            

                                    //change state
                                    this.loggedIn = true

                                    let loginType = res.data.user.role
                                    
                                    if(loginType === 'Guru'){
                                        //redirect dashboard
                                        return this.$router.push({ name: 'dashboard.index' })
                                    } else if(loginType === 'Admin'){
                                        //redirect dashboard
                                        return this.$router.push({ name: 'dashboard.index' })
                                    }

                                } else {
                                    //set state login failed
                                    this.loginFailed = true
                                }

                            }).catch(error => {
                                this.loginFailed = true
                                console.log(error)
                            })

                        })
                }

                this.validation = []

                if (!this.user.email) {
                    this.validation.email = true
                }

                if (!this.user.password) {
                    this.validation.password = true
                }

            }
        },

        //check user already logged in
        mounted() {
            if (this.loggedIn) {
                return this.$router.push({ name: 'dashboard.index' })
            }
        }
    }
</script>