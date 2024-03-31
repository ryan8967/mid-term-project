<template>
  <div id="app">
    <div class="wrapper">
      <the-header></the-header>
      <the-nav></the-nav>
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
import TheNav from './components/layout/TheNav.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
    TheNav,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.wrapper {
  flex: 1;
}

the-footer {
  flex-shrink: 0;
  max-height: 25vh;
  margin: 0;
}
</style>
