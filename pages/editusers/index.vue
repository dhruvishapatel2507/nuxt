<template>
<div>
    <Navbar />
    <h1 class="text-center text-h2 mt-5 mb-5">Edit User Details</h1>
    <v-card class="mx-auto pa-5 " width="600">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="data.name" :rules="rules.name" label="Name" @keypress="allowOnlyAlphabate()" outlined required></v-text-field>

            <v-text-field v-model="data.email" :rules="rules.email" label="E-mail" outlined required></v-text-field>

            <v-text-field v-model="data.middlename" :rules="rules.middlename" @keypress="allowOnlyAlphabate()" label="MiddleName" outlined required></v-text-field>

            <v-text-field v-model="data.surname" :rules="rules.surname" @keypress="allowOnlyAlphabate()" label="SurName" outlined required></v-text-field>

            <v-text-field v-model="data.address_line1" :rules="rules.address_line1" label="Address Line1" placeholder="Snowy Rock Pl" outlined required></v-text-field>

            <v-text-field v-model="data.address_line2" :rules="rules.address_line2" label="Address Line2" placeholder="street near by" outlined required></v-text-field>

            <v-select v-model="data.country" :items="countries" :rules="rules.country" label="Country" outlined required></v-select>

            <v-text-field v-model="data.state" :rules="rules.state" label="State" outlined required></v-text-field>

            <v-text-field v-model="data.city" :rules="rules.city" label="City" outlined required></v-text-field>

            <v-text-field v-model="data.zipcode" :rules="rules.zipcode" label="ZipCode" @keypress="allowOnlyNumber()" outlined required></v-text-field>

            <v-text-field v-model="data.phone" :rules="rules.phone" label="Phone Number" @keypress="allowOnlyNumber()" outlined required></v-text-field>

            <v-menu v-model="birth_date_model" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="data.birth_date" :rules="rules.birth_date" label="Birth Date" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
                </template>
                <v-date-picker v-model="data.birth_date" @input="birth_date_model = false"></v-date-picker>
            </v-menu>

            <v-label>Gender</v-label>
            <v-radio-group v-model="data.gender" :rules="rules.gender" row>
                <v-radio label="Male" value="Male"></v-radio>
                <v-radio label="Female" value="Female"></v-radio>
            </v-radio-group>

            <v-label>Hobby
                <v-container fluid row>
                    <v-checkbox v-model="data.hobby" :rules="rules.hobby" label="Hockey" value="Hockey"></v-checkbox>
                    <v-checkbox v-model="data.hobby" :rules="rules.hobby" label="Cricket" value="Cricket"></v-checkbox>
                    <v-checkbox v-model="data.hobby" :rules="rules.hobby" label="Badminton" value="Badminton"></v-checkbox>
                </v-container>
            </v-label>

            <v-card-actions class="justify-center">
                <v-btn :disabled="!valid" color="primary" @click="edituser">Submit
                </v-btn>
            </v-card-actions>

        </v-form>
    </v-card>
</div>
</template>

<script>
import Navbar from '../Navbar.vue';
import Swal from 'sweetalert2';

export default {
    middleware: 'guest',
    components: {
        Navbar
    },
    data() {
        return {
            valid: true,
            row: null,
            select: null,
            birth_date_model: false,
            data: {
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
                hobby: [],
            },
            rules: {
                name: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                email: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                middlename: [
                    v => !!v || 'middlename is required'
                ],
                surname: [
                    v => !!v || 'surname is required'
                ],
                address_line1: [
                    v => !!v || 'address field is required',
                    v => !!v && v.length <= 25 || 'Address must be less than 25 characters',
                ],
                address_line2: [
                    v => !!v || 'address field is required'
                ],
                country: [
                    v => !!v || 'country must be selected'
                ],
                state: [
                    v => !!v || 'state field is required'
                ],
                city: [
                    v => !!v || 'city field is required'
                ],
                zipcode: [
                    v => !!v || 'zipcode field is required',
                    v => (v && v.length <= 6) || 'Number must be less than 6 characters',
                    v => (v && v.length >= 6) || 'Number must be greater than 6 characters',
                ],
                phone: [
                    v => !!v || 'PhoneNumber field is required',
                    v => (v && v.length <= 10) || 'Number must be less than 10 characters',
                    v => (v && v.length >= 10) || 'Number must be greater than 10 characters',
                ],
                birth_date: [
                    v => !!v || 'select birthdate',
                ],
                gender: [
                    v => !!v || 'select gender',
                ],
                hobby: [
                    () => this.data.hobby.length > 0 || 'select hobby',
                ]

            },
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
        }
    },
    mounted() {
        this.$axios.get(`/api/users/${this.$route.query.id}`).then((r) => {
            this.data.name = r.data.name,
                this.data.email = r.data.email,
                this.data.middlename = r.data.middlename,
                this.data.surname = r.data.surname,
                this.data.address_line1 = r.data.address_line1,
                this.data.address_line2 = r.data.address_line2,
                this.data.country = r.data.country,
                this.data.state = r.data.state,
                this.data.city = r.data.city,
                this.data.zipcode = r.data.zipcode,
                this.data.phone = r.data.phone,
                this.data.birth_date = r.data.birth_date,
                this.data.gender = r.data.gender,
                this.data.hobby = r.data.hobby.split(',')
        })
    },
    methods: {
        allowOnlyAlphabate(e) {
            let event = (e) ? e : window.event;
            var charCode = event.keyCode;
            if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 123) && charCode != 32) {
                event.preventDefault();
            }
            return true;
        },

        allowOnlyNumber(e) {
            let event = (e) ? e : window.event;
            var charCode = event.keyCode
            if (charCode > 32 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
            return true;
        },
        async edituser() {
            var hobbyStr = this.data.hobby.join(',');
            await this.$axios.put(`/api/users/${this.$route.query.id}`, {
                name: this.data.name,
                email: this.data.email,
                password: this.data.password,
                password_confirmation: this.data.password_confirmation,
                middlename: this.data.middlename,
                surname: this.data.surname,
                address_line1: this.data.address_line1,
                address_line2: this.data.address_line2,
                country: this.data.country,
                state: this.data.state,
                city: this.data.city,
                zipcode: this.data.zipcode,
                phone: this.data.phone,
                birth_date: this.data.birth_date,
                gender: this.data.gender,
                hobby: hobbyStr,
            }).then((r) => {
                Swal.fire({
                    title: 'Update User success',
                    icon: 'success',
                }, r).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push('/home')
                    }
                });
            }).catch((e) => {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                }, e)
            })
        },
    }
}
</script>
