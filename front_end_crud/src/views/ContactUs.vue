<template>
<Header />
<section class="contact" id="contact">
    <div class="max-width">
        <h2 class="title">Contact me</h2>
        <div class="contact-content">
            <div class="column left">
                <div class="text">Get in Touch</div>
                <p>
                    If you have any questions or need additional information, please
                    don't hesitate to contact.
                </p>
                <div class="icons">
                    <div class="row">
                        <i class="fas fa-user"></i>
                        <div class="info">
                            <div class="head">Name</div>
                            <div class="sub-title">{{ contactInfo.name }}</div>
                        </div>
                    </div>
                    <div class="row">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="info">
                            <div class="head">Address</div>
                            <div class="sub-title">{{ contactInfo.address }}</div>
                        </div>
                    </div>
                    <div class="row">
                        <i class="fas fa-envelope"></i>
                        <div class="info">
                            <div class="head">Email</div>
                            <div class="sub-title">{{ contactInfo.email }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column right">
                <div class="text">Message me</div>
                <form @submit.prevent="submitForm">
                    <div class="fields">
                        <div class="field name">
                            <input v-model="formData.name" type="text" placeholder="Name" required />
                        </div>
                        <div class="field email">
                            <input v-model="formData.email" type="email" placeholder="Email" required />
                        </div>
                    </div>
                    <div class="field">
                        <input v-model="formData.subject" type="text" placeholder="Subject" required />
                    </div>
                    <div class="field textarea">
                        <textarea v-model="formData.message" cols="30" rows="10" placeholder="Message.." required></textarea>
                    </div>
                    <div class="button-area">
                        <button type="submit">Send message</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<Footer />
</template>

<script>
import Header from '../components/base/Header.vue';
import Footer from '../components/base/Footer.vue';
export default {
    components:{
        Header,
        Footer,
    },
    data() {
        return {
            contactInfo: {
                name: "Khawar Khan Jahangiri",
                address: "Sindh, Karachi",
                email: "khawarsawati@gmail.com",
            },
            formData: {
                name: "",
                email: "",
                subject: "",
                message: "",
            },
        };
    },
    methods: {
        submitForm() {
            // Handle form submission here
            console.log("Form data submitted:", this.formData);
            // You can add your form submission logic (e.g., sending data to a server) here.
        },
    },
};
</script>

<style scoped>
.contact {
    background-color: #f4f4f4;
    padding: 40px 0;
    text-align: center;
}

.title {
    font-size: 2rem;
    margin-bottom: 20px;
}

.contact-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
}

.column {
    flex: 1;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.left {
    text-align: left;
}

.right {
    text-align: left;
}

.text {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.icons {
    margin-top: 20px;
}

.row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.row i {
    font-size: 24px;
    margin-right: 10px;
    color: #333;
}

.info {
    flex: 1;
}

.head {
    font-weight: bold;
}

.sub-title {
    color: #555;
}

.fields {
    margin-top: 20px;
}

.field {
    margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}
</style>
