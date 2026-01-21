<template>
  <div class="action-buttons">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>