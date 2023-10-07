<template>
<div class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h4>About Us</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in turpis vel nulla vehicula aliquet.</p>
            </div>
            <div class="col-md-6">
                <h4>Contact Us</h4>
                <ul>
                    <li>Email: contact@example.com</li>
                    <li>Phone: +123 456 7890</li>
                    <li>Address: 123 Main Street, City, Country</li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="text-center mt-3">
    &copy; {{ currentYear }} Your Company Name. All Rights Reserved.
</div>
</template>

<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear(),
        };
    },
};
</script>

<style scoped>
/* Footer-specific styles */
.footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
}

.footer h4 {
    color: #fff;
}

.footer ul {
    list-style-type: none;
    padding: 0;
}

.footer li {
    margin-bottom: 8px;
}

.footer a {
    color: #fff;
}

.footer a:hover {
    text-decoration: underline;
}
</style>
