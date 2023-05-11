<template>
<div>
    <Navbar />
    <h1 class="text-center text-h2 mt-5 mb-5" >View User Details</h1>
    <v-card class="mx-auto pa-5 " width="50%">
    <v-simple-table>
        <template>
            <tr>
                <td class="font-weight-bold">Name</td>
                <td>{{ surname }} {{ name }} {{ middlename }}</td>
            </tr>
            <tr>
                <td class="font-weight-bold">Email</td>
                <td>{{ email }}</td>
            </tr>
            <tr>
                <td class="font-weight-bold">Address</td>
                <td>{{ address_line1 }} , {{ address_line2 }} , {{ city }} , {{ state }} , {{ country }} , {{ zipcode }}</td>
            </tr>
            <tr>
                <td class="font-weight-bold">PhoneNumber</td>
                <td>{{ phone }}</td>
            </tr>
            <tr>
                <td class="font-weight-bold">birth_date</td>
                <td>{{ birth_date }}</td>
            </tr>
            <tr>
                <td class="font-weight-bold">gender</td>
                <td>{{ gender }}</td>
            </tr>
            <tr>
                <td class="font-weight-bold">Hobby</td>
                <td>{{ hobby }}</td>
            </tr>
        </template>
    </v-simple-table>
</v-card>
<nuxt-link :to="`/home/`">
<v-card-actions class="justify-center">
<v-btn color="primary" class="justify-center" >
      Back
    </v-btn>
</v-card-actions>
</nuxt-link>
</div>
</template>

<script>
import Navbar from '../Navbar.vue';
export default {
    middleware: 'guest',
    components:{
        Navbar
    },
    data() {
        return {
            name: '',
            email: '',
            middlename: '',
            surname: '',
            address_line1: '',
            address_line2: '',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            phone: '',
            birth_date: '',
            gender: '',
            hobby: '',
        }
    },
    async mounted() {
        this.userdata();
    },
    methods: {
        async userdata() {
            await this.$axios.get(`/api/users/${this.$route.query.id}`).then((r) => {

                this.name = r.data.name,
                    this.email = r.data.email,
                    this.middlename = r.data.middlename,
                    this.surname = r.data.surname,
                    this.address_line1 = r.data.address_line1,
                    this.address_line2 = r.data.address_line2,
                    this.country = r.data.country,
                    this.state = r.data.state,
                    this.city = r.data.city,
                    this.zipcode = r.data.zipcode,
                    this.phone = r.data.phone,
                    this.birth_date = r.data.birth_date,
                    this.gender = r.data.gender,
                    this.hobby = r.data.hobby
            })
        }
    }
}
</script>
