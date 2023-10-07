<template>
<MDBModal id="editModal" tabindex="-1" labelledby="editModalTitle" v-model="editModal" centered scrollable>
    <MDBModalHeader>
        <MDBModalTitle id="editModalTitle">Edit Customer</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
        <div class="modal-body">
            <form @submit.prevent="updateCustomer">
                <div v-for="field in customerFields" :key="field.name" class="form-group">
                    <label :for="field.name">{{ field.label }}</label>
                    <input v-model="editedCustomer[field.name]" :placeholder="field.placeholder" :type="field.type" class="form-control" :id="field.name" :required="field.required">
                    <div v-if="submitted && !editedCustomer[field.name]" class="text-danger">{{ field.label }} is required</div>
                </div>
            </form>
        </div>
    </MDBModalBody>
    <MDBModalFooter>
        <MDBBtn @click="updateCustomer" color="primary">Update</MDBBtn>
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
        customerData: Object,
        customerIdProp: Number, // Add a prop for the customer id
    },
    data() {
        return {
            editModal: false,
            submitted: false,
            editedCustomer: {
                companyName: '', // Initialize with empty value
                firstName: '', // Initialize with empty value
                lastName: '', // Initialize with empty value
                contactEmail: '', // Initialize with empty value
                acquiredOn: '', // Initialize with empty value
                customerStatus: '', // Initialize with empty value
            },
            customerId: null, // Initialize it as null

            customerFields: [{
                    name: 'companyName',
                    label: 'Company Name',
                    placeholder: 'VueJs',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'firstName',
                    label: 'First Name',
                    placeholder: 'John',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'lastName',
                    label: 'Last Name',
                    placeholder: 'Doe',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'contactEmail',
                    label: 'Contact Email',
                    placeholder: 'abc@gmail.com',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'acquiredOn',
                    label: 'Acquired On',
                    placeholder: '02-11-2023',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'customerStatus',
                    label: 'Customer Status',
                    placeholder: '',
                    type: 'select',
                    required: true,
                },
            ],
        };
    },
    methods: {
        openEditModal(customer, customerId) {
            this.customerId = customerId;
            this.editedCustomer = {
                ...customer
            };
            this.editModal = true;
        },
        updateCustomer() {
            axios
                .put(`http://127.0.0.1:8000/add-customer/${this.customerId}/`, {
                    id: this.editedCustomer.id,
                    company_name: this.editedCustomer.companyName,
                    first_name: this.editedCustomer.firstName,
                    last_name: this.editedCustomer.lastName,
                    contact_email: this.editedCustomer.contactEmail,
                    acquired_on: this.editedCustomer.acquiredOn,
                    customer_status: this.editedCustomer.customerStatus,
                })
                .then((response) => {
                    this.$emit('customer-updated', response.data);
                    this.editModal = false;
                })
                .catch((error) => {
                    console.error('Error updating customer:', error);
                });
        },
    },
};
</script>
