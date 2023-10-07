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
        <MDBBtn @click="confirmDelete" color="danger">Delete</MDBBtn>
        <MDBBtn @click="cancelDelete" color="secondary">Cancel</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </template>
  
  <script>
  import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-vue-ui-kit';
  
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
      customerToDelete: Object, // Pass the customer data to be deleted
    },
    data() {
      return {
        deleteModal: false,
      };
    },
    methods: {
      openDeleteModal() {
        this.deleteModal = true;
      },
      confirmDelete() {
        this.deleteModal = false;
        this.$emit('delete-customer');
      },
      cancelDelete() {
        this.deleteModal = false;
      },
    },
  };
  </script>
  