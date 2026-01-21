<template>
  <div style="padding: 30px 0;">
    <div class="container">
      <h1 style="text-align: center;">{{ isEditMode ? 'Edit Recipe' : 'Add New Recipe' }}</h1>
      <p style="text-align: center; color: #666; margin-bottom: 30px;">
        {{ isEditMode ? 'Update recipe details' : 'Create a new recipe' }}
      </p>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-else class="card" style="max-width: 800px; margin: 0 auto;">
        <FormComponent
          :initial-data="formData"
          :submit-button-text="isEditMode ? 'Update' : 'Create'"
          :categories="categories"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormComponent from '../components/FormComponent.vue';

export default {
  name: 'RecipeForm',
  components: {
    FormComponent,
  },
  data() {
    return {
      loading: false,
      formData: {
        title: '',
        category: '',
        difficulty: '',
        prepTime: '',
        servings: '',
        image: '',
        ingredients: [],
        steps: [],
      },
    };
  },
  computed: {
    ...mapGetters('recipes', ['currentRecipe', 'allCategories']),
    isEditMode() {
      return this.$route.name === 'RecipeEdit' && this.$route.params.id;
    },
    categories() {
      return this.allCategories;
    },
  },
  methods: {
    ...mapActions('recipes', ['createRecipe', 'updateRecipe', 'fetchRecipeById', 'fetchCategories']),
    async loadRecipeData() {
      if (this.isEditMode) {
        this.loading = true;
        
        try {
          const recipeId = this.$route.params.id;
          await this.fetchRecipeById(recipeId);
          
          const recipe = this.currentRecipe;
          
          if (recipe) {
            this.formData = { ...recipe };
          } else {
            alert('Recipe not found');
            this.$router.push('/');
          }
        } catch (error) {
          alert('Failed to load recipe');
          this.$router.push('/');
        } finally {
          this.loading = false;
        }
      }
    },
    async handleSubmit(recipeData) {
      try {
        if (this.isEditMode) {
          await this.updateRecipe({
            id: this.$route.params.id,
            recipe: recipeData,
          });
          alert('Recipe updated!');
          this.$router.push(`/recipes/${this.$route.params.id}`);
        } else {
          const newRecipe = await this.createRecipe(recipeData);
          alert('Recipe created!');
          this.$router.push(`/recipes/${newRecipe.id}`);
        }
      } catch (error) {
        alert('Failed to save recipe.');
      }
    },
    handleCancel() {
      if (this.isEditMode) {
        this.$router.push(`/recipes/${this.$route.params.id}`);
      } else {
        this.$router.push('/');
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.loadRecipeData();
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadRecipeData();
      },
    },
  },
};
</script>