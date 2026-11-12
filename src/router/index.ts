import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Definição das rotas da aplicação com TypeScript
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'dashboard',
        // Carregamento preguiçoso (lazy-loading) da visualização principal para otimizar a performance
        component: () => import('@/views/DashboardView.vue'),
        meta: {
            title: 'FinVue — Dashboard Financeiro'
        }
    },
    {
        // Rota coringa para tratar páginas não encontradas (404)
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// Guard de navegação global para atualizar dinamicamente o título do documento
router.beforeEach((to, _from, next) => {
    if (to.meta.title) {
        document.title = String(to.meta.title);
    }
    next();
});

export default router;