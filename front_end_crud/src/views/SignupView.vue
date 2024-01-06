<template>
  <Header />
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <form class="bg-white shadow rounded px-4 py-4">
      <div class="mb-3">
        <label class="form-label" for="username">Name</label>
        <input
          v-model="username"
          :class="{ 'is-invalid': !username && formSubmitted }"
          class="form-control"
          id="username"
          type="text"
          placeholder="Name"
        />
        <div v-if="formSubmitted && !username" class="invalid-feedback">Name is required.</div>
      </div>
      <div class="mb-3">
        <label class="mt-2 form-label" for="email">Email</label>
        <input
          v-model="email"
          :class="{ 'is-invalid': !email && formSubmitted }"
          class="form-control"
          id="email"
          type="email"
          placeholder="Email"
        />
        <div v-if="formSubmitted && !email" class="invalid-feedback">Email is required.</div>
      </div>
      <div class="mb-3">
        <label class="mt-2 form-label" for="password">Password</label>
        <input
          v-model="password"
          :class="{ 'is-invalid': !password && formSubmitted }"
          class="form-control"
          id="password"
          type="password"
          placeholder="Password"
        />
        <div v-if="formSubmitted && !password" class="invalid-feedback">Password is required.</div>
      </div>
      <div class="mb-3">
        <label class="mt-2 form-label" for="confirmPassword">Confirm Password</label>
        <input
          v-model="confirmPassword"
          :class="{ 'is-invalid': !confirmPassword && formSubmitted }"
          class="form-control"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        <div v-if="formSubmitted && !confirmPassword" class="invalid-feedback">Confirm Password is required.</div>
      </div>
      <div class="d-flex justify-content-between">
        <button @click.prevent="signUp" class="mt-2 btn btn-success" type="button">Sign Up</button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/base/Header.vue';
import Footer from '../components/base/Footer.vue';
import { ref } from 'vue';
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
  name: 'SignupView',
  components: {
    Header,
    Footer,
  },
  setup() {
    // Data properties
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const formSubmitted = ref(false);

    // Form validation function
    const signUp = async () => {
      formSubmitted.value = true;
      if (username.value && email.value && password.value && confirmPassword.value) {
        if (password.value !== confirmPassword.value) {
          console.error('Passwords do not match.');
        } else {
          try {
            const csrfToken = await getCsrfToken();
            // Send a POST request with user data for signup
            const response = await axios.post('http://127.0.0.1:8000/signup/', {
              username: username.value,
              email: email.value,
              password: password.value,
            }, {
              headers: {
                'X-CSRFToken': csrfToken,
              },
            });

            // Handle the response, e.g., show a success message
            if (response.status === 201) {
              console.log('User registered successfully!');
              router.push({name: 'signin'})
              // Optionally, you can redirect to another page or perform other actions.
            } else {
              console.error('User registration failed:', response.data);
            }
          } catch (error) {
            console.error('Sign Up Error:', error);
          }
        }
      } else {
        // Invalid form, show validation errors
        console.log('Form is invalid. Please check the inputs.');
      }
    };

    // Return values to be used in the template
    return {
      username,
      email,
      password,
      confirmPassword,
      formSubmitted,
      signUp,
    };
  },
};
</script>
