<template>
  <li class="product" @click="navigateToDetails">
    <div class="product-card">
      <div class="product-card__content">
        <img :src="image" :alt="name" class="product-card__image" />
        <div class="product-card__tags">
          <span class="product-card__tag">{{ main_category }}</span>
          <span class="product-card__tag">{{ sub_category }}</span>
          <p class="amount">數量:{{ quantity }}</p>
        </div>
        <h3 class="title">{{ name }}</h3>
        <h3 class="price">${{ price }}</h3>
      </div>
    </div>
  </li>
</template>

<script>
// import axios from "axios";
export default {
  props: [
    "id",
    "image",
    "name",
    "main_category",
    "sub_category",
    "condition",
    "price",
    "quantity",
    "remarks",
  ],
  methods: {
    navigateToDetails() {
      this.$emit("navigate", this.id);
    },
  },
};
</script>

<style scoped>
.product {
  list-style-type: none;
  margin-bottom: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 350px;
  border-radius: 35px;
  overflow: hidden;
  background-color: #fbf6f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.product-card__content {
  display: flex;
  flex-direction: column;
  padding: 15px 26px 23px;
  height: 100%;
  position: relative;
}

.product-card__image {
  height: 60%;
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
}

.product-card__tags {
  display: flex;
  justify-content: space-between; /* Adjusts alignment to space between items */
  gap: 5px;
  margin-top: 10px;
  width: 100%; /* Ensures tags container spans full width */
}

.amount {
  margin-left: auto; /* Pushes the amount element to the right */
  font-family: Zen Old Mincho, sans-serif; /* Ensures consistent font */
}

.product-card__tag {
  font-family: Zen Old Mincho, sans-serif;
  border-radius: 20px;
  background-color: #c69f76;
  padding: 4px 12px;
  color: #fff;
}

.title {
  font-family: Zen Old Mincho, sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  text-align: left;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: normal;
  margin-top: 5px;
  padding: 0;
  width: 100%;
}

.price {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-family: Zen Old Mincho, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #7b6d64;
  text-align: right;
  white-space: nowrap;
  margin-top: 0px;
  padding: 0;
  width: 100%;
}
</style>
