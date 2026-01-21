import { createStore } from 'vuex';
import recipes from './modules/recipes';
import favorites from './modules/favorites';

export default createStore({
  modules: {
    recipes,
    favorites,
  },
  strict: process.env.NODE_ENV !== 'production',
});