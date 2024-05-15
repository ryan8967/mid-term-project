<template>
  <span class="badge" :class="['badge--' + mode, { nml: noMarginLeft }]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: ['mode', 'noMarginLeft'],
};
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.75rem;
  margin: 0 0.75rem;
  border-radius: 15px;
  border-color: lightseagreen;
  font-size: large;
}

.nml {
  margin-left: 0;
}

.badge--highlight {
  color: black;
  border-color: lightseagreen;
}

.badge--elegant {
  color: rgb(49, 7, 186);
  color: rgb(0, 0, 0);
}
</style>
