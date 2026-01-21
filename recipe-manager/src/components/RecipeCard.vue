<template>
  <div class="recipe-card">
    <router-link :to="`/recipes/${recipe.id}`" style="text-decoration: none; color: inherit;">
      <div v-if="recipe.image" style="width: 100%; height: 200px; overflow: hidden;">
        <img :src="recipe.image" :alt="recipe.title" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div style="padding: 15px;">
        <h3>{{ recipe.title }}</h3>
        <div style="margin: 10px 0;">
          <span class="badge" :class="`badge-${recipe.difficulty}`">{{ recipe.difficulty }}</span>
          <span style="margin-left: 10px;">{{ recipe.prepTime }} min</span>
          <span style="margin-left: 10px;">{{ recipe.servings }} servings</span>
        </div>
        <p style="color: #666; margin: 0;">{{ recipe.category }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-card {
  background-color: white;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.recipe-card:hover {
  border-color: #999;
}
</style>