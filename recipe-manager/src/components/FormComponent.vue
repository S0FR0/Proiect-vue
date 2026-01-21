<template>
  <form class="recipe-form">
    <div class="form-group">
      <label for="title">Title *</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="form-control"
        :class="{ error: errors.title }"
        @blur="validateField('title')"
      />
      <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="category">Category *</label>
      <select
        id="category"
        v-model="formData.category"
        class="form-control"
        :class="{ error: errors.category }"
        @blur="validateField('category')"
      >
        <option value="">Select category</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
      </select>
      <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
    </div>

    <div class="form-group">
      <label for="difficulty">Difficulty *</label>
      <select
        id="difficulty"
        v-model="formData.difficulty"
        class="form-control"
        :class="{ error: errors.difficulty }"
        @blur="validateField('difficulty')"
      >
        <option value="">Select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <span v-if="errors.difficulty" class="error-message">{{ errors.difficulty }}</span>
    </div>

    <div class="form-group">
      <label for="prepTime">Prep Time (minutes) *</label>
      <input
        id="prepTime"
        v-model="formData.prepTime"
        type="text"
        class="form-control"
        :class="{ error: errors.prepTime }"
        @blur="validateField('prepTime')"
      />
      <span v-if="errors.prepTime" class="error-message">{{ errors.prepTime }}</span>
    </div>

    <div class="form-group">
      <label for="servings">Servings *</label>
      <input
        id="servings"
        v-model="formData.servings"
        type="number"
        class="form-control"
        :class="{ error: errors.servings }"
        min="1"
        @blur="validateField('servings')"
      />
      <span v-if="errors.servings" class="error-message">{{ errors.servings }}</span>
    </div>

    <div class="form-group">
      <label for="image">Image URL</label>
      <input
        id="image"
        v-model="formData.image"
        type="text"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="ingredients">Ingredients * (one per line)</label>
      <textarea
        id="ingredients"
        v-model="ingredientsText"
        class="form-control"
        :class="{ error: errors.ingredients }"
        rows="6"
        @blur="validateField('ingredients')"
      ></textarea>
      <span v-if="errors.ingredients" class="error-message">{{ errors.ingredients }}</span>
    </div>

    <div class="form-group">
      <label for="steps">Steps * (one per line)</label>
      <textarea
        id="steps"
        v-model="stepsText"
        class="form-control"
        :class="{ error: errors.steps }"
        rows="8"
        @blur="validateField('steps')"
      ></textarea>
      <span v-if="errors.steps" class="error-message">{{ errors.steps }}</span>
    </div>

    <div style="display: flex; gap: 10px;">
      <button type="button" class="btn btn-primary" :disabled="isSubmitting || !isFormValid" @click="handleSubmit">
        {{ isSubmitting ? 'Saving...' : submitButtonText }}
      </button>
      <button type="button" class="btn btn-outline" @click="handleCancel">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormComponent',
  props: {
    initialData: {
      type: Object,
      default: () => ({
        title: '',
        category: '',
        difficulty: '',
        prepTime: '',
        servings: '',
        image: '',
        ingredients: [],
        steps: [],
      }),
    },
    submitButtonText: {
      type: String,
      default: 'Save',
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: { ...this.initialData },
      ingredientsText: this.initialData.ingredients?.join('\n') || '',
      stepsText: this.initialData.steps?.join('\n') || '',
      errors: {},
      isSubmitting: false,
    };
  },
  computed: {
    isFormValid() {
      return this.formData.title &&
             this.formData.category &&
             this.formData.difficulty &&
             this.formData.prepTime &&
             this.formData.servings &&
             this.ingredientsText &&
             this.stepsText;
    },
  },
  watch: {
    initialData: {
      handler(newVal) {
        this.formData = { ...newVal };
        this.ingredientsText = newVal.ingredients?.join('\n') || '';
        this.stepsText = newVal.steps?.join('\n') || '';
      },
      deep: true,
    },
  },
  methods: {
    validateField(fieldName) {
      this.errors = { ...this.errors };
      delete this.errors[fieldName];

      switch (fieldName) {
        case 'title':
          if (!this.formData.title.trim()) {
            this.errors.title = 'Required';
          }
          break;
        case 'category':
          if (!this.formData.category) {
            this.errors.category = 'Required';
          }
          break;
        case 'difficulty':
          if (!this.formData.difficulty) {
            this.errors.difficulty = 'Required';
          }
          break;
        case 'prepTime':
          if (!this.formData.prepTime) {
            this.errors.prepTime = 'Required';
          } else if (!/^\d+$/.test(this.formData.prepTime)) {
            this.errors.prepTime = 'Must be a number';
          }
          break;
        case 'servings':
          if (!this.formData.servings) {
            this.errors.servings = 'Required';
          } else if (this.formData.servings < 1) {
            this.errors.servings = 'Must be at least 1';
          }
          break;
        case 'ingredients':
          if (!this.ingredientsText.trim()) {
            this.errors.ingredients = 'Required';
          }
          break;
        case 'steps':
          if (!this.stepsText.trim()) {
            this.errors.steps = 'Required';
          }
          break;
      }
    },
    validateForm() {
      const fields = ['title', 'category', 'difficulty', 'prepTime', 'servings', 'ingredients', 'steps'];
      fields.forEach(field => this.validateField(field));
      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      const ingredients = this.ingredientsText
        .split('\n')
        .map(i => i.trim())
        .filter(i => i);

      const steps = this.stepsText
        .split('\n')
        .map(s => s.trim())
        .filter(s => s);

      const recipeData = {
        title: this.formData.title,
        category: this.formData.category,
        difficulty: this.formData.difficulty,
        prepTime: this.formData.prepTime,
        servings: this.formData.servings,
        image: this.formData.image,
        ingredients: ingredients,
        steps: steps,
      };

      this.$emit('submit', recipeData);

      setTimeout(() => {
        this.isSubmitting = false;
      }, 500);
    },
    handleCancel() {
      this.$emit('cancel');
    },
  },
};
</script>