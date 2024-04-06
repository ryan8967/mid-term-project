<template>
  <li class="product">
    <div class="product-card">
      <div class="product-card__content">
        <img :src="image" :alt="title" class="product-card__image" />
        <div class="product-card__tags">
          <span class="product-card__tag">{{ tag1 }}</span>
          <span class="product-card__tag">{{ tag2 }}</span>
        </div>
        <h3 class="title">{{ title }}</h3>
      </div>
      <!-- <div class="product__text">
        <h3>{{ title }}</h3>
        <base-badge mode="highlight" :no-margin-left="true">
          <h4>${{ price }}</h4>
        </base-badge>
        <p>{{ description }}</p>
      </div> -->
    </div>
    <!-- <div class="product__actions">
      <button @click="addToCart">Add to Cart</button>
    </div> -->
  </li>
</template>

<script>
// import axios from 'axios';
export default {
  props: ["id", "image", "title", "price", "description", "tag1", "tag2"],
  methods: {
    addToCart() {
      // const payload = {
      //   productId: this.id,
      // };
      // axios
      //   .post(`http://localhost:3000/addcart/ryanyang`)
      //   .then((response) => {
      //     this.products = response.data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // Construct the payload to send to the backend
      //   fetch(`http://localhost:3000/addcart/ryanyang`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       // 'Authorization': `Bearer ${token}`
      //     },
      //     body: JSON.stringify(payload),
      //   })
      //     .then(response => {
      //       if (!response.ok) {
      //         throw new Error('Failed to add item to cart');
      //       }
      //       return response.json();
      //     })
      //     .then(data => {
      //       // Handle successful response from the backend if needed
      //       console.log(data);
      //     })
      //     .catch(error => {
      //       // Handle errors if any
      //       console.error('Error adding item to cart:', error);
      //     });
    },
  },
};
</script>

<style scoped>
.product {
  list-style-type: none;
  margin-bottom: 20px;
  margin-right: 10px;
  /* Spacing between cards */
}

.product-card {
  display: flex;
  flex-direction: column;
  width: 286px;
  /* Width of the card */
  height: 286px;
  /* Height to match the width, making it square */
  border-radius: 35px;
  /* Adjust as needed for border-radius */
  overflow: hidden;
  /* Ensures the content doesn't overflow */
  background-color: #fbf6f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.product-card__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

img {
  height: 150px;
}

.product-card__image {
  height: 60%;
  /* Half of the card's height */
  width: 100%;
  /* Full width */
  object-fit: contain, cover;
  /* Cover the area without stretching */
}

.product-card__tags {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px 0;
  /* Padding for visual spacing */
  background-color: transparent;
  /* Background of tags, can be adjusted */
}

.product-card__tag {
  font-family: Zen Old Mincho, sans-serif;
  border-radius: 20px;
  background-color: #c69f76;
  padding: 4px 12px;
  color: #fff;
}

.product:last-child {
  margin-right: 0;
}

.title {
  flex-grow: 1;
  /* Allows the title to fill the remaining space */
  font-family: Zen Old Mincho, sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
