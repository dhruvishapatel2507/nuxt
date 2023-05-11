<template>
    <div>
        <Navbar />
    <h1 class="text-center text-h2 mt-5 mb-5" >Change Password</h1>
    <div class="d-flex align-center justify-center" style="height: 100%;">
        <v-card class="mx-auto pa-5" width="600">
            <v-form ref="form" v-model="valid">
        
                <v-text-field v-model="data.current_password" :rules="rules.current_password" label="current_password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show1 ? 'text' : 'password'"  @click:append="show1 = !show1" outlined required></v-text-field>
        
                <v-text-field v-model="data.password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show2 ? 'text' : 'password'"  @click:append="show2 = !show2" :rules="rules.password" label="Password" outlined required></v-text-field>
        
                <v-text-field v-model="data.password_confirmation" :rules="rules.password_confirmation" label="password_confirmation" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show3 ? 'text' : 'password'"  @click:append="show3 = !show3" outlined required></v-text-field>

                <v-card-actions class="justify-center">
                    <v-btn :disabled="!valid" color="primary" @click="changepassword" >
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</div>
</template>
<script>
import Navbar from '../Navbar.vue';
import Swal from 'sweetalert2';

export default{
    middleware: 'guest',
    components:{
        Navbar
    },
    data() {
        return {
            valid: true,
            show1: false,
            show2: false,
            show3: false,
            data: {
                current_password: '',
                password: '',
                password_confirmation:'',
            },
            rules: {
                current_password: [
                    v => !!v || 'current-password is required',
                ],
                password: [
                    v => !!v || 'password is required',
                    v => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(v) || 'password must be valid',
                ],
                password_confirmation: [
                    v => !!v || 'Confirmpassword is required',
                    v => v === this.data.password || 'The password and confirm password does not match.',
                ]
            }
        }
    },
    methods:{
        async changepassword() {
            await this.$axios.put("/api/change-password", {
                current_password: this.data.current_password,
                password: this.data.password,
                password_confirmation: this.data.password_confirmation
            }).then((r) => {
                if (r.data.success == false) {
                    Swal.fire('Error', `${r.data.message}`, 'error')
                } else {
                    Swal.fire({
                        title: 'Password change successfully',
                        icon: 'success',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push({
                                path: '/home',
                            });
                        }
                    });
                }
            }).catch((e) => {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                }, e)
            })

        }
    }
    }

</script>