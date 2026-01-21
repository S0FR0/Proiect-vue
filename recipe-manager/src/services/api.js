import axios from 'axios';

const API_URL = 'http://localhost:3001';

function getRecipes() {
    return axios.get(`${API_URL}/recipes`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching recipes:', error)
            throw error;
        });
}

function getRecipeById(id) {
    return axios.get(`${API_URL}/recipes/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching recipe:', error)
            throw error;
        })
}

function createRecipe(recipe) {
    return axios.post(`${API_URL}/recipes`, recipe)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error creating recipe:', error);
            throw error;
        })
}

function updateRecipe(id, recipe) {
    return axios.put(`${API_URL}/recipes/${id}`, recipe)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error updating recipe:', error);
            throw error;
        })
}

function deleteRecipe(id) {
    return axios.delete(`${API_URL}/recipes/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error deleting recipe:', error);
            throw error;
        })
}

function getCategories() {
    return axios.get(`${API_URL}/categories`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
            throw error;
        })
}

export default {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getCategories
};