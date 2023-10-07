<template>
<Header />
<h1>this is home page</h1>
<Footer />
</template>

<script>
import Header from '../components/base/header.vue'
import Footer from '../components/base/footer.vue'
export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style scoped>
.fa.fa-pencil.fa-lg {
    margin: -60px;
}
</style>
