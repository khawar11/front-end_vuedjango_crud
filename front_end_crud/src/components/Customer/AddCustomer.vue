<template>
<MDBBtn class="mt-2" color="primary" aria-controls="exampleModalCenteredScrollable" @click="exampleModalCenteredScrollable = true">
    Add Customer
</MDBBtn>
<MDBModal id="exampleModalCenteredScrollable" tabindex="-1" labelledby="exampleModalCenteredScrollableTitle" v-model="exampleModalCenteredScrollable" centered scrollable>
    <MDBModalHeader>
        <MDBModalTitle id="exampleModalCenteredScrollableTitle">
            ADD Customer
        </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
        <div class="modal-body">
            <form @submit.prevent="addCustomer">
                <div class="form-group">
                    <label for="company_name">Company Name</label>
                    <input v-model="companyName" placeholder="VueJs" type="text" class="form-control" id="company_name" required>
                    <div v-if="submitted && !companyName" class="text-danger">Company Name is required</div>
                </div>
                <div class="form-group">
                    <label for="contact_firstname">First Name</label>
                    <input v-model="FirstName" placeholder="John" type="text" class="form-control" id="contact_firstname" required>
                    <div v-if="submitted && !FirstName" class="text-danger">First Name is required</div>
                </div>
                <div class="form-group">
                    <label for="contact_lastname">Last Name</label>
                    <input v-model="LastName" placeholder="Doe" type="text" class="form-control" id="contact_lastname" required>
                    <div v-if="submitted && !LastName" class="text-danger">Last Name is required</div>
                </div>
                <div class="form-group">
                    <label for="contact_email">Contact Email</label>
                    <input v-model="ContactEmail" placeholder="abc@gmail.com" type="email" class="form-control" id="contact_email" required>
                    <div v-if="submitted && !ContactEmail" class="text-danger">Contact Email is required</div>
                </div>
                <div class="form-group">
                    <label for="acquired_on">Acquired On</label>
                    <input v-model="AcquiredOn" placeholder="02-11-2023" type="date" class="form-control" id="acquired_on" required>
                    <div v-if="submitted && !AcquiredOn" class="text-danger">Acquired On is required</div>
                </div>
                <div class="form-group">
                    <label for="customer_status">Customer Status</label>
                    <select v-model="CustomerStatus" class="form-control" id="customer_status" required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <div v-if="submitted && !CustomerStatus" class="text-danger">Customer Status is required</div>
                </div>
            </form>
        </div>
    </MDBModalBody>
    <MDBModalFooter>
        <MDBBtn @click="submitted = true; validateAndAddCustomer()" color="primary"> ADD </MDBBtn>
    </MDBModalFooter>
</MDBModal>
</template>

<script>
import { MDBModal,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,MDBBtn,} from 'mdb-vue-ui-kit';
import { ref} from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            companyName: '',
            FirstName: '',
            LastName: '',
            ContactEmail: '',
            AcquiredOn: '',
            CustomerStatus: '',
            submitted: false,
        };
    },
    components: {
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBBtn,
    },
    setup() {
        const companyName = ref('');
        const FirstName = ref('');
        const LastName = ref('');
        const ContactEmail = ref('');
        const AcquiredOn = ref('');
        const CustomerStatus = ref('');
        const submitted = ref(false);
        const exampleModalCenteredScrollable = ref(false);

        const validateAndAddCustomer = () => {
            if (
                !companyName.value ||
                !FirstName.value ||
                !LastName.value ||
                !ContactEmail.value ||
                !AcquiredOn.value ||
                !CustomerStatus.value
            ) {
                // If any required field is empty, show the error message
                return;
            }

            // If all fields are filled, proceed to add the customer
            // Add your Axios or API request code here
            const customerData = {
                company_name: companyName.value,
                first_name: FirstName.value,
                last_name: LastName.value,
                contact_email: ContactEmail.value,
                acquired_on: AcquiredOn.value,
                customer_status: CustomerStatus.value,
            };
            // Make a POST request to your Django API endpoint
            axios
                .post('http://127.0.0.1:8000/add-customer/', customerData)
                .then((response) => {
                    // Handle the response (e.g., show success message, reset form)
                    console.log('Customer added successfully:', response.data);

                    // You can also close the modal here if needed
                    exampleModalCenteredScrollable.value = false;
                    // Optionally, reset the form fields
                    companyName.value = '';
                    FirstName.value = '';
                    LastName.value = '';
                    ContactEmail.value = '';
                    AcquiredOn.value = '';
                    CustomerStatus.value = '';
                    submitted.value = false;
                })
                .catch((error) => {
                    // Handle any errors (e.g., show an error message)
                    console.error('Error adding customer:', error);
                });
        };
        return {
            companyName,
            FirstName,
            LastName,
            ContactEmail,
            AcquiredOn,
            CustomerStatus,
            submitted,
            exampleModalCenteredScrollable,
            validateAndAddCustomer,
        };
    },
};
</script>
