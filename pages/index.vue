<template>
    <div class="d-flex align-center justify-center" style="height: 100%;">
        <v-card class="mx-auto pa-5" width="600">
            <h1>Login Form</h1>
            <v-form ref="form" v-model="valid">
        
                <v-text-field v-model="data.email" :rules="rules.email" label="E-mail" outlined required></v-text-field>
        
                <v-text-field v-model="data.password" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show4 ? 'text' : 'password'"  @click:append="show4 = !show4" :rules="rules.password" label="Password" outlined required></v-text-field>
        
                <v-card-actions class="justify-center">
                    <v-btn :disabled="!valid" color="primary" @click="login" class="mr-5">
                        Submit
                    </v-btn>
                    <nuxt-link :to="`/register`">
                    <v-btn color="success" >
                       Registration
                    </v-btn>
                </nuxt-link>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    middleware:'auth',
    data() {
        return {
            valid: true,
            show4: false,
            data: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                password: [
                    v => !!v || 'password is required',
                    v => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(v) || 'password must be valid',
                ],
            }
        }
    },
    methods: {
        async login() {
            this.$refs.form.validate()
            await this.$axios.post("/api/login", {
                email: this.data.email,
                password: this.data.password,
            }).then((r) => {
                Swal.fire({
                    title: 'success',
                    icon: 'success',
                }, r).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("token", r.data.token);
                        this.$router.push('/home')
                    }
                });
            }).catch(() => {
                Swal.fire({
                    title: 'invlid email or password',
                    icon: 'error', 
                })    
            })
        }
    }
}
</script>

<style>
h1 {
    text-align: center;
    color: brown;
    padding-bottom: 10px;
}
</style>
