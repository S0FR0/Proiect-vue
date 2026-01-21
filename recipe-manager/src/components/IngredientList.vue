<template>
  <div class="ingredient-list">
    <h3 v-if="title">{{ title }}</h3>
    <ul class="ingredients">
      <li v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-item">
        <span class="ingredient-bullet">•</span>
        <span class="ingredient-text">{{ ingredient }}</span>
      </li>
    </ul>
    <p v-if="!ingredients || ingredients.length === 0" class="no-ingredients">
      No ingredients listed
    </p>
  </div>
</template>

<script>
export default {
  name: 'IngredientList',
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'Ingredients',
    },
  },
};
</script>

<style scoped>
.ingredient-list {
  margin-bottom: 30px;
}

.ingredient-list h3 {
  color: var(--primary-dark);
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.ingredients {
  list-style: none;
  padding: 0;
}

.ingredient-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.ingredient-item:last-child {
  border-bottom: none;
}

.ingredient-item:hover {
  background-color: var(--bg-color);
  padding-left: 10px;
  margin-left: -10px;
  border-radius: 8px;
}

.ingredient-bullet {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-right: 10px;
  line-height: 1;
}

.ingredient-text {
  flex: 1;
  color: var(--text-color);
  font-size: 1rem;
}

.no-ingredients {
  color: var(--text-light);
  font-style: italic;
  padding: 20px;
  text-align: center;
  background-color: var(--bg-color);
  border-radius: 8px;
}

@media (max-width: 768px) {
  .ingredient-list h3 {
    font-size: 1.3rem;
  }
  
  .ingredient-text {
    font-size: 0.95rem;
  }
}
</style>