import api from '../../services/api';
import localStorageUtil from '../../utils/localStorage';

const state = {
  recipes: [],
  categories: [],
  loading: false,
  error: null,
  currentRecipe: null,
  filters: {
    search: '',
    category: '',
    difficulty: '',
  },
};

const getters = {
  allRecipes(state) {
    return state.recipes;
  },
  
  filteredRecipes(state) {
    let recipes = state.recipes;

    if (state.filters.search) {
      const searchText = state.filters.search.toLowerCase();
      recipes = recipes.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(searchText);
        const ingredientMatch = recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchText)
        );
        return titleMatch || ingredientMatch;
      });
    }

    if (state.filters.category) {
      recipes = recipes.filter(recipe => 
        recipe.category === state.filters.category
      );
    }

    if (state.filters.difficulty) {
      recipes = recipes.filter(recipe => 
        recipe.difficulty === state.filters.difficulty
      );
    }

    return recipes;
  },
  
  recipeById: (state) => (id) => {
    return state.recipes.find(recipe => recipe.id === id);
  },
  
  allCategories(state) {
    return state.categories;
  },
  
  isLoading(state) {
    return state.loading;
  },
  
  getError(state) {
    return state.error;
  },
  
  currentRecipe(state) {
    return state.currentRecipe;
  },
};

const mutations = {
  SET_RECIPES(state, recipes) {
    state.recipes = recipes;
    localStorageUtil.saveRecipes(recipes);
  },
  
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  
  SET_ERROR(state, error) {
    state.error = error;
  },
  
  ADD_RECIPE(state, recipe) {
    state.recipes.push(recipe);
    localStorageUtil.saveRecipes(state.recipes);
  },
  
  UPDATE_RECIPE(state, updatedRecipe) {
    const index = state.recipes.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      state.recipes.splice(index, 1, updatedRecipe);
      localStorageUtil.saveRecipes(state.recipes);
    }
    if (state.currentRecipe && state.currentRecipe.id === updatedRecipe.id) {
      state.currentRecipe = updatedRecipe;
    }
  },
  
  DELETE_RECIPE(state, recipeId) {
    state.recipes = state.recipes.filter(recipe => recipe.id !== recipeId);
    localStorageUtil.saveRecipes(state.recipes);
  },
  
  SET_CURRENT_RECIPE(state, recipe) {
    state.currentRecipe = recipe;
  },
  
  SET_FILTER(state, payload) {
    state.filters[payload.filterType] = payload.value;
  },
  
  CLEAR_FILTERS(state) {
    state.filters.search = '';
    state.filters.category = '';
    state.filters.difficulty = '';
  },
};

const actions = {
  fetchRecipes({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    const cachedRecipes = localStorageUtil.getRecipes();
    if (cachedRecipes && cachedRecipes.length > 0) {
      commit('SET_RECIPES', cachedRecipes);
    }
    
    api.getRecipes()
      .then(recipes => {
        commit('SET_RECIPES', recipes);
        commit('SET_LOADING', false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        commit('SET_ERROR', 'Failed to fetch recipes');
        commit('SET_LOADING', false);
      });
  },
  
  fetchCategories({ commit }) {
    api.getCategories()
      .then(categories => {
        commit('SET_CATEGORIES', categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  },
  
  fetchRecipeById({ commit }, id) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    return api.getRecipeById(id)
      .then(recipe => {
        commit('SET_CURRENT_RECIPE', recipe);
        commit('SET_LOADING', false);
        return recipe;
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
        commit('SET_ERROR', 'Failed to fetch recipe');
        commit('SET_LOADING', false);
        throw error;
      });
  },
  
  createRecipe({ commit }, recipe) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    const newRecipe = {
      ...recipe,
      createdAt: new Date().toISOString(),
    };
    
    return api.createRecipe(newRecipe)
      .then(savedRecipe => {
        commit('ADD_RECIPE', savedRecipe);
        commit('SET_LOADING', false);
        return savedRecipe;
      })
      .catch(error => {
        console.error('Error creating recipe:', error);
        commit('SET_ERROR', 'Failed to create recipe');
        commit('SET_LOADING', false);
        throw error;
      });
  },
  
  updateRecipe({ commit }, payload) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    return api.updateRecipe(payload.id, payload.recipe)
      .then(updatedRecipe => {
        commit('UPDATE_RECIPE', updatedRecipe);
        commit('SET_CURRENT_RECIPE', updatedRecipe);
        commit('SET_LOADING', false);
        return updatedRecipe;
      })
      .catch(error => {
        console.error('Error updating recipe:', error);
        commit('SET_ERROR', 'Failed to update recipe');
        commit('SET_LOADING', false);
        throw error;
      });
  },
  
  deleteRecipe({ commit }, id) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    return api.deleteRecipe(id)
      .then(() => {
        commit('DELETE_RECIPE', id);
        commit('SET_LOADING', false);
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
        commit('SET_ERROR', 'Failed to delete recipe');
        commit('SET_LOADING', false);
        throw error;
      });
  },
  
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
  
  clearFilters({ commit }) {
    commit('CLEAR_FILTERS');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};