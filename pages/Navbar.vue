<template>
<div>
    <v-app-bar color="deep-purple" dark>
        <v-icon size="30px" class="mr-5" @click="home">mdi-home</v-icon>
        <v-toolbar-title class="text-h5">Hellow ,{{ me.name }}</v-toolbar-title>
        <v-layout row wrap justify-end>
            <v-icon size="30px">mdi-account</v-icon>
            <nuxt-link :to="`/profile`" class="text-decoration-none white--text">
                <v-toolbar-title class="text-h5 mr-5">Profile</v-toolbar-title>
            </nuxt-link>
        </v-layout>
        <v-btn tile color="success" @click="logout">
            <v-icon left>
                mdi-open-in-new
            </v-icon>
            Logout
        </v-btn>
    </v-app-bar>
</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    middleware: 'guest',
    computed: {
        me() {
            return this.$store.state.user.me
        },
    },
    mounted() {
        this.$store.dispatch('user/me');
    },
    methods: {
        home() {
            this.$router.push('/home')
        },
       async logout() {
            Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, logout!'

                }).then((result) => {
                        if (result.isConfirmed) {
                            this.$axios.post("/api/logout").then((r) => {
                                localStorage.clear(r);
                                this.$router.push({
                                path: '/'
                            });
                            }).catch((e) => {
                                console.log("error", e)
                            });  
                        }

                    })
                },
        }
    }

</script>
