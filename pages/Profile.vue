<template>
<div>
    <Navbar />
    <h1 class="text-center text-h2 mt-5 mb-5">User Profile</h1>
    <v-card class="mx-auto pa-5 " width="50%">
        <v-simple-table>
            <template>
                <tr>
                    <td class="font-weight-bold">Name</td>
                    <td>{{ me.surname }} {{ me.name }} {{ me.middlename }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">Email</td>
                    <td>{{ me.email }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">Address</td>
                    <td>{{ me.address_line1 }} , {{ me.address_line2 }} , {{ me.city }} , {{ me.state }} , {{ me.country }} , {{ me.zipcode }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">PhoneNumber</td>
                    <td>{{ me.phone }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">birth_date</td>
                    <td>{{ me.birth_date }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">gender</td>
                    <td>{{ me.gender }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">Hobby</td>
                    <td>{{ me.hobby }}</td>
                </tr>
            </template>
        </v-simple-table>
    </v-card>
    <nuxt-link :to="`/home/`">
        <v-card-actions class="justify-center">
            <v-btn color="primary" class="justify-center">
                Back
            </v-btn>
        </v-card-actions>
    </nuxt-link>
    <nuxt-link :to="`/changeprofile?id=${me.id}`" class="text-decoration-none">
        <v-card-actions class="justify-center">
            <v-btn color="success" class="justify-center">
                Change Profile
            </v-btn>
        </v-card-actions>
    </nuxt-link>
    <nuxt-link :to="`/changepassword?id=${me.id}`" class="text-decoration-none">
        <v-card-actions class="justify-center">
            <v-btn color="warning" class="justify-center">
                Change password
            </v-btn>
        </v-card-actions>
    </nuxt-link>
</div>
</template>

<script>
import Navbar from './Navbar.vue';
export default {
    middleware: 'guest',
    middleware: 'guest',
    components: {
        Navbar
    },
    computed: {
        me() {
            return this.$store.state.user.me
        },
    },
    mounted() {
        this.$store.dispatch('user/me');
    }
}
</script>
