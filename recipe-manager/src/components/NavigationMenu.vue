<template>
  <nav class="navigation">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="logo">Chef Notes</router-link>
        
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/categories" class="nav-link">Categories</router-link>
          <router-link to="/recipes/new" class="nav-link">Add Recipe</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationMenu',
};
</script>

<style scoped>
.navigation {
  background-color: white;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 8px 12px;
}

.nav-link:hover {
  color: #666;
}

.nav-link.router-link-active {
  font-weight: bold;
}

@media (max-width: 768px) {
  .logo {
    font-size: 1.2rem;
  }
  
  .nav-links {
    gap: 10px;
  }
  
  .nav-link {
    font-size: 0.9rem;
    padding: 6px 8px;
  }
}
</style>