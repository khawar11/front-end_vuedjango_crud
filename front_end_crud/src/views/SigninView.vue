<template>
<Header />
<form ref="signInForm" novalidate @submit.prevent="checkForm">
    <div class="d-flex justify-content-center align-items-center vh-100">
        <MDBRow class="g-3" ref="signInForm" novalidate @submit.prevent="checkForm">
            <MDBCol md="12">
                <MDBInput label="User name" v-model="username" id="username" invalidFeedback="Please choose a unique and valid username." required />
            </MDBCol>
            <MDBCol md="12">
                <MDBInput label="Email" type="email" id="email" invalidFeedback="Please enter a correct formatt" v-model="email" required />
            </MDBCol>
            <MDBCol md="12">
                <MDBInput label="Password " id="password" type="password" invalidFeedback="Please enter a password" v-model="password" required />
            </MDBCol>
            <MDBCol md="12">
                <MDBCheckbox label="Agree to terms and conditions" v-model="checkbox" invalidFeedback="You must agree before submitting." required />
            </MDBCol>
            <MDBCol md="12">
                <MDBBtn color="primary" type="submit">Sign In</MDBBtn>
            </MDBCol>
        </MDBRow>
    </div>
</form>
<Footer />
</template>
<script>
import Header from '../components/base/Header.vue';
import Footer from '../components/base/Footer.vue';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-vue-ui-kit';
import {
    ref
} from 'vue';
import axios from 'axios';
import router from '@/router'

const csrfAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your Django backend URL
  timeout: 5000, // Adjust the timeout as needed
});

const getCsrfToken = async () => {
  try {
    // Make a GET request to fetch the CSRF token
    const response = await csrfAxios.get('http://127.0.0.1:8000/get-csrf-token/'); // Replace with your CSRF token URL

    // Extract the CSRF token from the response
    const csrfToken = response.data.csrf_token;

    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw error; // You can handle this error appropriately in your component
  }
};
export default {
    name: 'SigninView',
    components: {
        Header,
        Footer,
        MDBRow,
        MDBCol,
        MDBInput,
        MDBCheckbox,
        MDBBtn,
    },
    setup() {
        // Data properties
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const checkbox = ref(false);

        // Form validation function
        const checkForm = async (e) => {
            const form = e.target;
            if (form.checkValidity()) {
                try {
                    const csrfToken = await getCsrfToken();
                    // Send a POST request with user data
                    const response = await axios.post('http://127.0.0.1:8000/signin/', {
                        username: username.value,
                        email: email.value,
                        password: password.value,
                    }, {
                        headers: {
                            'X-CSRFToken': getCsrfToken() // Replace with your function to get the CSRF token
                        }
                    });

                    // Handle the response, e.g., show a success message
                    if (response.status === 200) {
                        console.log("User logged in successfully!");
                        router.push({name: 'customer'})
                        // Optionally, you can redirect to another page or perform other actions.
                    } else {
                        console.error('User not found:', response.data);
                    }
                } catch (error) {
                    console.error('Sign In Error:', error);
                }
            } else {
                // Invalid form, show validation errors
                form.classList.add("was-validated");
                console.log("Form is invalid. Please check the inputs.");
            }
        };

        // Return values to be used in the template
        return {
            username,
            email,
            password,
            checkbox,
            checkForm,
        };
    },
};
</script>
