<template>
  <div style="padding: 30px 0;">
    <div class="container">
      <h1>Recipe Categories</h1>
      <p style="color: #666; margin-bottom: 30px;">Browse recipes by category</p>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-else style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
        <div
          v-for="category in categoriesWithCount"
          :key="category.id"
          class="card"
          @click="goToCategory(category.name)"
          style="text-align: center; cursor: pointer;"
        >
          <h3>{{ category.name }}</h3>
          <p style="color: #666; margin: 10px 0 0 0;">{{ category.count }} recipes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Categories',
  computed: {
    ...mapGetters('recipes', ['allCategories', 'allRecipes', 'isLoading']),
    loading() {
      return this.isLoading;
    },
    categoriesWithCount() {
      return this.allCategories.map(category => {
        const count = this.allRecipes.filter(
          recipe => recipe.category === category.name
        ).length;
        return { ...category, count };
      });
    },
  },
  methods: {
    ...mapActions('recipes', ['fetchCategories', 'fetchRecipes', 'setFilter']),
    goToCategory(categoryName) {
      this.setFilter({ filterType: 'category', value: categoryName });
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.card:hover {
  border-color: #999;
}

@media (max-width: 768px) {
  .categories div[style*="grid-template-columns: repeat(4"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>