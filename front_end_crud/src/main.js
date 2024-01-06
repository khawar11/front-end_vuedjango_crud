import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)

app.use(router)
app.use(VueToast);
app.mount('#app')