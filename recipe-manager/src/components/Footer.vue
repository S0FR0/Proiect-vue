<template>
  <footer class="footer">
    <div class="container">
      <p>{{ currentYear }} Chef Notes</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: white;
  border-top: 1px solid #ddd;
  padding: 20px 0;
  margin-top: 40px;
  text-align: center;
  color: #666;
}
</style>