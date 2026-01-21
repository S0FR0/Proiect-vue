import localStorageUtil from '../../utils/localStorage';

const state = {
  favoriteRecipeIds: [],
};

const getters = {
  allFavorites(state) {
    return state.favoriteRecipeIds;
  },
  
  isFavorite: (state) => (recipeId) => {
    return state.favoriteRecipeIds.includes(recipeId);
  },
  
  favoritesCount(state) {
    return state.favoriteRecipeIds.length;
  },
};

const mutations = {
  SET_FAVORITES(state, favorites) {
    state.favoriteRecipeIds = favorites;
  },
  
  ADD_FAVORITE(state, recipeId) {
    if (!state.favoriteRecipeIds.includes(recipeId)) {
      state.favoriteRecipeIds.push(recipeId);
      localStorageUtil.saveFavorites(state.favoriteRecipeIds);
    }
  },
  
  REMOVE_FAVORITE(state, recipeId) {
    state.favoriteRecipeIds = state.favoriteRecipeIds.filter(id => id !== recipeId);
    localStorageUtil.saveFavorites(state.favoriteRecipeIds);
  },
  
  CLEAR_FAVORITES(state) {
    state.favoriteRecipeIds = [];
    localStorageUtil.saveFavorites([]);
  },
};

const actions = {
  loadFavoritesFromStorage({ commit }) {
    const savedFavorites = localStorageUtil.getFavorites();
    if (savedFavorites && Array.isArray(savedFavorites)) {
      commit('SET_FAVORITES', savedFavorites);
    }
  },
  
  toggleFavorite({ commit, state }, recipeId) {
    if (state.favoriteRecipeIds.includes(recipeId)) {
      commit('REMOVE_FAVORITE', recipeId);
    } else {
      commit('ADD_FAVORITE', recipeId);
    }
  },
  
  addToFavorites({ commit }, recipeId) {
    commit('ADD_FAVORITE', recipeId);
  },
  
  removeFromFavorites({ commit }, recipeId) {
    commit('REMOVE_FAVORITE', recipeId);
  },
  
  clearAllFavorites({ commit }) {
    if (confirm('Are you sure you want to clear all favorites?')) {
      commit('CLEAR_FAVORITES');
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};