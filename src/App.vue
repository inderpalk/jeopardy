<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="container">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
  }
}
</script>

<style lang="scss">
  @import './assets/scss/main.scss';
</style>
