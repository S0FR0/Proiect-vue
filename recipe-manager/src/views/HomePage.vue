<template>
  <div style="padding: 30px 0;">
    <div class="container">
      <div class="page-header">
        <h1>All Recipes</h1>
        <div style="display: flex; gap: 10px; align-items: center;">
          <router-link to="/recipes/new" class="btn btn-primary">Add New Recipe</router-link>
        </div>
      </div>

      <div class="card" style="margin-bottom: 30px;">
        <div style="margin-bottom: 15px;">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search recipes..."
            class="form-control"
            @input="updateSearchFilter"
          />
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <select
            v-model="categoryFilter"
            class="form-control"
            @change="updateCategoryFilter"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>

          <select
            v-model="difficultyFilter"
            class="form-control"
            @change="updateDifficultyFilter"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            @click="toggleShowOnlyFavorites"
            class="btn"
            :class="showOnlyFavorites ? 'btn-danger' : 'btn-outline'"
          >
            {{ showOnlyFavorites ? 'Favorites' : 'Show Favorites' }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <div v-else-if="displayedRecipes.length === 0" style="text-align: center; padding: 40px;">
        <p>{{ showOnlyFavorites ? 'No favorite recipes yet' : 'No recipes found' }}</p>
      </div>

      <div v-else style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <div v-for="recipe in displayedRecipes" :key="recipe.id" style="position: relative;">
          <RecipeCard :recipe="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RecipeCard from '../components/RecipeCard.vue';

export default {
  name: 'RecipeList',
  components: {
    RecipeCard,
  },
  data() {
    return {
      searchQuery: '',
      categoryFilter: '',
      difficultyFilter: '',
      showOnlyFavorites: false,
    };
  },
  computed: {
    ...mapGetters('recipes', ['filteredRecipes', 'allCategories', 'isLoading', 'getError']),
    ...mapGetters('favorites', ['isFavorite', 'allFavorites', 'favoritesCount']),
    loading() {
      return this.isLoading;
    },
    error() {
      return this.getError;
    },
    categories() {
      return this.allCategories;
    },
    hasActiveFilters() {
      return this.searchQuery || this.categoryFilter || this.difficultyFilter || this.showOnlyFavorites;
    },
    displayedRecipes() {
      let recipes = this.filteredRecipes;
      
      if (this.showOnlyFavorites) {
        recipes = recipes.filter(recipe => this.isFavorite(recipe.id));
      }
      
      return recipes;
    },
  },
  methods: {
    ...mapActions('recipes', ['fetchRecipes', 'fetchCategories', 'setFilter', 'clearFilters']),
    updateSearchFilter() {
      this.setFilter({ filterType: 'search', value: this.searchQuery });
    },
    updateCategoryFilter() {
      this.setFilter({ filterType: 'category', value: this.categoryFilter });
    },
    updateDifficultyFilter() {
      this.setFilter({ filterType: 'difficulty', value: this.difficultyFilter });
    },
    toggleShowOnlyFavorites() {
      this.showOnlyFavorites = !this.showOnlyFavorites;
    },
    clearAllFilters() {
      this.searchQuery = '';
      this.categoryFilter = '';
      this.difficultyFilter = '';
      this.showOnlyFavorites = false;
      this.clearFilters();
    },
  },
  mounted() {
    this.fetchRecipes();
    this.fetchCategories();
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .page-header > div {
    width: 100%;
    justify-content: space-between;
  }
  
  .page-header .btn {
    padding: 6px 12px;
    font-size: 0.85rem;
    white-space: nowrap;
    width: auto;
    margin-bottom: 0;
  }
  
  .page-header h1 {
    font-size: 1.3rem;
  }
  
  .recipe-list div[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }
}
</style>