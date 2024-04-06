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

.products-container {
  display: flex;
  flex-wrap: wrap;
  /* Use this if you want to allow wrapping to a new line on small screens */
  justify-content: space-around;
  /* This spreads out the products evenly across the container */
  gap: 20px;
  /* Optional: Adds space between the products */
}
</style>
