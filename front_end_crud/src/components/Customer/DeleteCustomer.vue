<template>
<MDBModal id="deleteModal" tabindex="-1" v-model="deleteModal" centered scrollable>
    <MDBModalHeader>
        <MDBModalTitle id="deleteModalTitle">Confirm Deletion</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
        <div class="modal-body">
            <p>Are you sure you want to delete this customer?</p>
        </div>
    </MDBModalBody>
    <MDBModalFooter>
        <!-- Include the CSRF token in the form -->
        <form @submit.prevent="confirmDelete">
            <input type="hidden" name="csrfmiddlewaretoken" :value="getCsrfToken()">
            <MDBBtn type="submit" color="danger">Delete</MDBBtn>
        </form>
        <MDBBtn @click="cancelDelete" color="secondary">Cancel</MDBBtn>
    </MDBModalFooter>
</MDBModal>
</template>

    
<script>
import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
} from 'mdb-vue-ui-kit';
import axios from 'axios';

export default {
    components: {
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBBtn,
    },
    props: {
        customerToDelete: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            deleteModal: false,
        };
    },
    methods: {
        async getCsrfToken() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/get-csrf-token/');
                const csrfToken = response.data.csrf_token;
                return csrfToken;
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                return null;
            }
        },
        openDeleteModal() {
            this.deleteModal = true;
        },
        async confirmDelete() {
            this.deleteModal = false;

            try {
                const csrfToken = await this.getCsrfToken();
                const response = await axios.delete(
                    `http://127.0.0.1:8000/delete-customer/${this.customerToDelete.id}/`, {
                        headers: {
                            "X-CSRFToken": csrfToken,
                        },
                    }
                );

                if (response.data.success) {
                    this.$emit('delete-customer-success');
                    // console.log('Event emitted successfully.');
                    this.$toast.success(response.data.message);
                } else {
                    this.$toast.error(response.data.message);
                }
            } catch (error) {
                console.error('Error deleting customer:', error);

                if (error.response) {
                    this.$toast.error(`Server error: ${error.response.status}`);
                } else if (error.request) {
                    this.$toast.error('No response from the server. Please try again.');
                } else {
                    this.$toast.error('An unexpected error occurred. Please try again later.');
                }
            }
        },
        cancelDelete() {
            this.deleteModal = false;
        },
    },
};
</script>
