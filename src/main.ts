import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // Importação da configuração de rotas
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); // Ativação do Vue Router na aplicação

app.mount('#app');