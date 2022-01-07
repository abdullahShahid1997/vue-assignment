<script setup lang="ts">
import AppBar from "./components/shared/AppBar.vue";
</script>

<template>
  <div id="app">
    <AppBar />
    <router-view/>
  </div>
</template>

<style scoped>

</style>

<style lang='scss'>
@import './css/_typography.scss';
@import "./css/variables";
@import "css/styles";

.router-link {
  text-decoration: none;
}

</style>
