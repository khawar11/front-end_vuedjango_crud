<template>
<Header />
<main>
    <div class="row m-0">
        <div class="col-md-6 p-0">
            <div class="card filter-card m-2 text-center">
                <h6 class="p-4">Total Customers</h6>
                <h4><strong class="m-4">4</strong></h4>
            </div>
        </div>
        <div class="col-md-6 p-0">
            <div class="card filter-card m-2 text-center">
                <h6 class="p-4">Active Customer</h6>
                <h4><strong class="m-4">4</strong></h4>
            </div>
        </div>
    </div>
    <AddCustomer />
    <CustomerList />
</main>
<Footer />
</template>
<script>
import Header from '../components/base/Header.vue';
import Footer from '../components/base/Footer.vue';
import CustomerList from '../components/Customer/CustomerList.vue'
import AddCustomer from '../components/Customer/AddCustomer.vue'
export default {
    components: {   
        Header,
        CustomerList,
        AddCustomer,
        Footer,
    }
}
</script>

<style scoped>
    </style>
