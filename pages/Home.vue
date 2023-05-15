<template>
<div>
    <Navbar />
    <div class="mb-10 mr-15">
        <h1 class="text-center text-h2 mt-5 mb-5">USER MANAGEMENT</h1>
    <v-layout row wrap justify-end>
        <nuxt-link :to="`/addnewuser`">
        <v-btn tile color="success">
            <v-icon left>
                mdi-account-plus
            </v-icon>
            ADD New USer
        </v-btn>
    </nuxt-link>
    </v-layout>
</div>
    <v-card class="mx-auto pa-5 " width="90%">
        <v-simple-table>
            <template>
                <thead>
                    <tr>
                        <th class="text-left text-h4">Name</th>
                        <th class="text-left text-h4">Email</th>
                        <th class="text-left text-h4">Address</th>
                        <th class="text-left text-h4">PhoneNumber</th>
                        <th class="text-left text-h4">Gender</th>
                        <th class="text-left text-h4">BirthDate</th>
                        <th class="text-left text-h4">Hobby</th>
                        <th class="text-left text-h4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="users in users" :key="users.id">
                        <td>{{ users.surname }} {{ users.name }} {{ users.middlename }} </td>
                        <td>{{ users.email }}</td>
                        <td>{{ users.address_line1 }} , {{ users.address_line2 }} , {{ users.city }} , {{ users.state }} , {{ users.country }} , {{ users.zipcode }}</td>
                        <td>{{ users.phone }}</td>
                        <td>{{ users.gender }}</td>
                        <td>{{ users.birth_date }}</td>
                        <td>{{ users.hobby }}</td>
                        <td>
                            <v-btn depressed class="mb-3 mt-3 " tile color="error" @click="deleteUser(users.id)" :disabled="me.id == users.id">
                                <v-icon left>
                                    mdi-delete
                                </v-icon>
                                DELETE
                            </v-btn>
                            <nuxt-link :to="`/editusers?id=${users.id}`" :event="me.id == users.id ? '' : 'click'">
                                <v-btn class="mb-3 pr-9" tile color="success" :disabled="me.id == users.id">
                                    <v-icon left>
                                        mdi-pencil
                                    </v-icon>
                                    Edit
                                </v-btn>
                            </nuxt-link>
                            <nuxt-link :to="`/viewusers?id=${users.id}`" :event="me.id == users.id ? '' : 'click'">
                                <v-btn class="mb-3 pr-9" tile color="primary" :disabled="me.id == users.id">
                                    <v-icon left>
                                        mdi-eye
                                    </v-icon>
                                    View
                                </v-btn>
                            </nuxt-link>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
</div>
</template>

<script>
import Navbar from '@/pages/Navbar.vue';
import Swal from 'sweetalert2';

export default {
    middleware: 'guest',
    components: {
        Navbar,
    },
    data() {
        return {
            users: [],
        }
    },
    computed: {
        me() {
            return this.$store.state.user.me
        },
    },

    methods: {
        async userData() {
            await this.$axios.get("/api/users").then((r) => {
                this.users = r.data;
            }).catch((e) => {
                console.log("error", e)
            });
        },
        async deleteUser(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    this.$axios.delete(`/api/users/${id}`).then(() => {
                        this.userData()
                    }).catch(() => {
                        Swal.fire({
                            title: 'Something went wrong',
                            icon: 'error',
                        })
                    });

                }
            })
        },
        getMeId(id) {
            this.meid = id;
        }
    },
    mounted() {
        this.userData();
        this.$store.dispatch('user/me');
    },
}
</script>
