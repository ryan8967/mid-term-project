<template>
  <li class="product" @click="navigateToDetails">
    <div class="product-card">
      <div class="product-card__content">
        <div class="product-card__image-wrapper">
          <img
            :src="image"
            :alt="name"
            class="product-card__image"
            :class="{ shadowed: quantity <= 0 }"
          />
          <div v-if="quantity <= 0" class="sold-out-banner">Sold Out!</div>
        </div>
        <div class="product-card__tags">
          <span class="product-card__tag">{{ main_category }}</span>
          <span class="product-card__tag" v-show="sub_category !== null">{{ sub_category }}</span>
          <span class="amount" v-if="quantity > 0">數量:{{ quantity }}</span>
          <span class="amount" v-else>售完</span>
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
  height: 100%;
  width: 100%;
  object-fit: cover; /* Ensures images cover the area fully */
}

.product-card__image-wrapper {
  position: relative;
  height: 60%; /* Adjusted height relative to the card */
  width: 100%;
  overflow: hidden; /* Ensures no part of the image spills out */
  border-radius: 15px; /* Optional, for rounded corners at the image level */
}

.product-card__image.shadowed {
  filter: grayscale(100%) brightness(90%); /* Converts image to grayscale and reduces brightness */
  opacity: 0.9; /* Further reduces the opacity to give a darker look */
}

.product-card__tags {
  display: flex;
  justify-content: space-between;
  /* Adjusts alignment to space between items */
  gap: 5px;
  margin-top: 10px;
  width: 100%;
  /* Ensures tags container spans full width */
}

.sold-out-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.amount {
  margin-left: auto;
  /* Pushes the amount element to the right */
  font-family: Zen Old Mincho, sans-serif;
  /* Ensures consistent font */
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
