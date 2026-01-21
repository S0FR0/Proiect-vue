import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import RecipeForm from '../views/RecipeForm.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/categories',
        name: 'Categories',
        component: CategoriesPage,
    },
    {
        path: '/recipes/:id',
        name: 'RecipeDetails',
        component: RecipeDetails,
        props: true,
        children: [
            {
                path: 'edit',
                name: 'RecipeEdit',
                component: RecipeForm,
                props: true,
            },
        ],
    },
    {
        path: '/recipes/new',
        name: 'RecipeNew',
        component: RecipeForm,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;