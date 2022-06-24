import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/pages/Home.vue'
// import Pokemon from '@/pages/Pokemon.vue'

// Configure the components as Promises for async loading.
const Home = () => import('@/pages/Home.vue')
const Pokemon = () => import('@/pages/Pokemon.vue')

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        { path: '/:identifier', component: Pokemon }
    ]
})