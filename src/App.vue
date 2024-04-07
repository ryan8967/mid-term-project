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
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheNav from "./components/layout/TheNav.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    TheNav,
  },
  data() {
    return {
      // Expanded sample products array
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
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
  min-height: calc(100vh - 25vh); /* Adjusted to account for footer height */
}

the-footer {
  flex-shrink: 0;
  max-height: 25vh;
}
</style>
