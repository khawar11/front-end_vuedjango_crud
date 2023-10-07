<template>
<div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
<div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
<div>
    <table class="table table-striped mt-5 br-soid-2px">
        <thead>
            <tr>
                <th>Sno</th>
                <th>Company Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact Email</th>
                <th>Acquired On</th>
                <th>Customer Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(customer, index) in customerList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ customer.company_name }}</td>
                <td>{{ customer.first_name }}</td>
                <td>{{ customer.last_name }}</td>
                <td>{{ customer.contact_email }}</td>
                <td>{{ customer.acquired_on }}</td>
                <td>{{ customer.customer_status }}</td>
                <td>
                    <i class="fa fa-pencil fa-lg cursor-pointer" @click="openEditModal(customer)"></i>
                    <!-- <i class="fa fa-trash fa-lg cursor-pointer" @click="console.log('Delete button clicked', customer.id); deleteCustomer(customer.id)"></i> -->
                    <i class="fa fa-trash fa-lg cursor-pointer" @click="openDeleteModal(customer)"></i>
                </td>
            </tr>
        </tbody>
    </table>
    <DeleteCustomer ref="deleteCustomer" :customerToDelete="customerToDelete" @delete-customer="deleteCustomer"></DeleteCustomer>
    <!-- Include the EditCustomer component for editing customers -->
    <EditCustomer ref="editCustomer" :customerData="editedCustomer" @customer-updated="updateCustomerList" @update-customer-data="updateEditedCustomer"></EditCustomer>
</div>
</template>

<script>
import EditCustomer from './EditCustomer.vue';
import DeleteCustomer from './DeleteCustomer.vue';
import axios from 'axios';
import {
    format
} from 'date-fns';

export default {
    components: {
        EditCustomer, // Register the EditCustomer component
        DeleteCustomer,
    },
    data() {
        return {
            customerList: [],
            editedCustomer: {
                companyName: '',
                firstName: '',
                lastName: '',
                contactEmail: '',
                acquiredOn: '',
                customerStatus: '',
            },
            customerToDelete: null,
            successMessage: '',
            errorMessage: '',
            // deleteModal: false, // Add this showModal variable to control the modal
        };
    },
    methods: {
        async getCsrfToken() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/get-csrf-token/');
                // const csrfToken = response.data.csrfToken;
                const csrfToken = response.data.csrf_token;
                // console.log('CSRF token received:', csrfToken);
                return csrfToken;
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                return null;
            }
        },
        // Other methods...
        openDeleteModal(customer) {
            this.customerToDelete = customer;
            this.$refs.deleteCustomer.openDeleteModal();
            // this.deleteModal = true;
        },
        deleteCustomer() {
            const customerId = this.customerToDelete.id;
            this.getCsrfToken().then((csrfToken) => {
                if (csrfToken) {
                    this.$refs.deleteCustomer.cancelDelete();
                    // console.log('Deleting customer with ID:', customerId);
                    // console.log('Customer List before deletion:', this.customerList);

                    axios
                        .delete(`http://127.0.0.1:8000/delete-customer/${customerId}/`, {
                            headers: {
                                "X-CSRFToken": csrfToken,
                            },
                        })
                        .then(() => {
                            console.log('Customer deleted successfully:', customerId);
                            this.customerList = this.customerList.filter(
                                (customer) => customer.id !== customerId
                            );

                            // Set the success message
                            this.successMessage = 'Customer deleted successfully';
                            this.errorMessage = ''; // Clear any previous error message

                            console.log('Updated customerList:', this.customerList);
                            console.log('Customer List after deletion:', this.customerList);
                        })
                        .catch((error) => {
                            console.error('Error deleting customer:', error);
                        });
                } else {
                    console.error(
                        'CSRF token not found. Please check your CSRF token setup.'
                    );
                }
            });
        },
        openEditModal(customer) {
            this.editedCustomer = {
                id: customer.id,
                companyName: customer.company_name,
                firstName: customer.first_name,
                lastName: customer.last_name,
                contactEmail: customer.contact_email,
                acquiredOn: format(new Date(customer.acquired_on), 'yyyy-MM-dd'), // Format the date
                customerStatus: customer.customer_status,
            };
            this.$refs.editCustomer.openEditModal(this.editedCustomer, customer.id);
        },
        updateCustomerList(updatedCustomer) {
            // Update the customer list with the edited customer data
            const index = this.customerList.findIndex((customer) => customer.id === updatedCustomer.id);
            if (index !== -1) {
                this.customerList[index] = updatedCustomer;
            }
        },
        updateEditedCustomer(customer) {
            this.editedCustomer = {
                ...customer
            };
        },
    },
    mounted() {
        // Fetch customer data from Django API when the component is mounted
        axios
            .get('http://127.0.0.1:8000/add-customer/')
            .then((response) => {
                // Update the customerList data with the fetched data
                this.customerList = response.data;
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    },
};
</script>

<style scoped>
/**
 * Vue class for '.cursor-pointer'.
 *
 * Summary:
 * The '.cursor-pointer' class is used to change the cursor to a pointer when hovering over an element.
 *
 * Example Usage:
 * <i class="fa fa-pencil fa-lg cursor-pointer"></i>
 *
 * Code Analysis:
 * The main functionality of the '.cursor-pointer' class is to change the cursor style to a pointer when hovering over an element.
 * This provides a visual indication to the user that the element is clickable or interactive.
 */
.cursor-pointer {
    cursor: pointer;
}

.fa.fa-pencil.fa-lg {
    margin: -60px;
}
</style>
