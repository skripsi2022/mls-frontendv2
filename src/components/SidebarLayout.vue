<template>
  <div class="side-nav vertical-menu nav-menu-light scrollable">
                <div class="nav-logo">
                    <div class="w-100 logo">
                        <img class="img-fluid" src="assets/images/logo/logo.png" style="max-height: 70px;" alt="logo">
                    </div>
                    <div class="mobile-close">
                        <i class="icon-arrow-left feather"></i>
                    </div>
                 </div>
                 <br>
                 <ul class="nav-menu">
                     <li class="nav-group-title">Menu Utama</li>
                    <li class="nav-menu-item router-link-active">
                        <router-link :to="{name: 'dashboard.index'}">
                            <i class="feather icon-home"></i>
                            <span class="nav-menu-item-title">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="nav-group-title">Manajemen Sekolah</li>
                    <li class="nav-menu-item ">
                        <router-link :to="{name: 'siswa.index'}">
                            <i class="icon-users feather"></i>
                            <span class="nav-menu-item-title">Siswa</span>
                        </router-link>
                    </li>
                    <li class="nav-menu-item">
                        <router-link :to="{name: 'guru.index'}">
                            <i class="icon-user feather"></i>
                            <span class="nav-menu-item-title">Guru</span>
                        </router-link>
                    </li>
                    <li class="nav-menu-item">
                        <router-link :to="{name: 'jurusan.index'}" >
                            <i class="la-school la"></i>
                            <span class="nav-menu-item-title">Jurusan</span>
                        </router-link>
                    </li>
                    <li class="nav-group-title">Manajemen Soal</li>
                    <li class="nav-menu-item">
                        <router-link :to="{name : 'mapel.index'}">
                            <i class="icon-book-open feather"></i>
                            <span class="nav-menu-item-title">Mata Pelajaran</span>
                        </router-link>
                    </li>
                    <li class="nav-menu-item">
                        <router-link :to="{name: 'ujian.index'}">
                            <i class="icon-alert-triangle feather"></i>
                            <span class="nav-menu-item-title">Ujian</span>
                        </router-link>
                    </li>
                    <li class="nav-menu-item">
                        <router-link :to="{name: 'nilai.index'}">
                            <i class="icon-book feather"></i>
                            <span class="nav-menu-item-title">Nilai</span>
                        </router-link>
                    </li>
                </ul>
            </div>
</template>



