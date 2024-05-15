<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: rgb(255, 255, 255);
  border: 1px solid lightseagreen;
  color: rgb(0, 0, 0);
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: lightseagreen;
  border-color: lightseagreen;
}

.flat {
  background-color: transparent;
  color: #000000;
  border-color: lightseagreen;
}

.outline {
  background-color: transparent;
  border-color: #ffffff;
  color: #000000;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: lightseagreen;
}
</style>