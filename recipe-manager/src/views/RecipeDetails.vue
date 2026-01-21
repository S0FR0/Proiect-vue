<template>
  <div style="padding: 30px 0;">
    <div class="container">
      <router-view v-if="isEditRoute" />
      
      <div v-else>
        <div v-if="loading" class="loading">Loading...</div>

        <div v-else-if="error" class="alert alert-error">
          {{ error }}
          <router-link to="/" class="btn btn-primary" style="margin-left: 10px;">Back to Home</router-link>
        </div>

        <div v-else-if="recipe">
          <div style="margin-bottom: 20px;">
            <router-link to="/">Back</router-link>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>{{ recipe.title }}</h1>
            <button 
              @click="toggleFavorite" 
              class="btn"
              :class="isFavorite ? 'btn-danger' : 'btn-outline'"
              style="min-width: 120px;"
            >
              {{ isFavorite ? 'Favorited' : 'Add to Favorites' }}
            </button>
          </div>
          
          <div style="margin: 15px 0;">
            <span class="badge" :class="`badge-${recipe.difficulty}`">{{ recipe.difficulty }}</span>
            <span style="margin-left: 15px;">{{ recipe.prepTime }} min</span>
            <span style="margin-left: 15px;">{{ recipe.servings }} servings</span>
            <span style="margin-left: 15px;">{{ recipe.category }}</span>
          </div>

          <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title" 
               style="width: 100%; max-height: 400px; object-fit: cover; margin: 20px 0;" />

          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px; margin: 30px 0;">
            <div class="card">
              <h3>Ingredients</h3>
              <ul>
                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                  {{ ingredient }}
                </li>
              </ul>
            </div>

            <div class="card">
              <h3>Instructions</h3>
              <ol>
                <li v-for="(step, index) in recipe.steps" :key="index" style="margin-bottom: 10px;">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>

          <ActionButtons>
            <button @click="editRecipe" class="btn btn-primary">Edit</button>
            <button @click="handleDeleteRecipe" class="btn btn-danger">Delete</button>
            <button @click="goBack" class="btn btn-outline">Back</button>
          </ActionButtons>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ActionButtons from '../components/ActionButtons.vue';

export default {
  name: 'RecipeDetails',
  components: {
    ActionButtons,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters('recipes', ['currentRecipe']),
    ...mapGetters('favorites', ['isFavorite']),
    recipe() {
      return this.currentRecipe;
    },
    isEditRoute() {
      return this.$route.name === 'RecipeEdit';
    },
    isFavorite() {
      return this.recipe ? this.$store.getters['favorites/isFavorite'](this.recipe.id) : false;
    },
  },
  methods: {
    ...mapActions('recipes', ['fetchRecipeById', 'deleteRecipe']),
    ...mapActions('favorites', ['toggleFavorite']),
    async loadRecipe() {
      this.loading = true;
      this.error = null;
      
      try {
        await this.fetchRecipeById(this.id);
        
        if (!this.recipe) {
          this.error = 'Recipe not found';
        }
      } catch (err) {
        this.error = 'Failed to load recipe';
      } finally {
        this.loading = false;
      }
    },
    editRecipe() {
      this.$router.push(`/recipes/${this.id}/edit`);
    },
    async handleDeleteRecipe() {
      if (confirm('Are you sure you want to delete this recipe?')) {
        try {
          await this.deleteRecipe(this.id);
          this.$router.push('/');
        } catch (error) {
          alert('Failed to delete recipe.');
        }
      }
    },
    toggleFavorite() {
      this.$store.dispatch('favorites/toggleFavorite', this.recipe.id);
    },
    goBack() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.loadRecipe();
  },
  watch: {
    id() {
      this.loadRecipe();
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .recipe-details div[style*="grid-template-columns: 1fr 2fr"] {
    grid-template-columns: 1fr !important;
  }
  
  .recipe-details div[style*="display: flex"] button,
  .recipe-details div[style*="display: flex"] a {
    width: 100%;
  }
}
</style>