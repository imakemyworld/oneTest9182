<template>
  <span class="menuItem">
    <span>{{data.label}}</span>
  </span>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    data: Object,
  },
};
</script>

<style scoped>
 .menuItem{
   display: inline;
 }
</style>

