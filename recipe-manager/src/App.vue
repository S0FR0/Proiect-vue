<template>
  <div id="app">
    <NavigationMenu />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NavigationMenu from './components/NavigationMenu.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavigationMenu,
    Footer,
  },
  methods: {
    ...mapActions('favorites', ['loadFavoritesFromStorage']),
  },
  created() {
    this.loadFavoritesFromStorage();
  },
};
</script>

<style>
@import './assets/styles/main.css';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 20px;
}
</style>