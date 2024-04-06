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
        <h3 class="price">${{ price }}</h3>
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
import axios from 'axios';
export default {
  props: ['id', 'image', 'title', 'price', 'description', 'tag1', 'tag2'],
  methods: {
    addToCart() {
      const payload = {
        productId: this.id,
      };
      axios
        .post(`http://localhost:3000/addcart/ryanyang`)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      // Construct the payload to send to the backend


      fetch(`http://localhost:3000/addcart/ryanyang`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }
          return response.json();
        })
        .then(data => {
          // Handle successful response from the backend if needed
          console.log(data);
        })
        .catch(error => {
          // Handle errors if any
          console.error('Error adding item to cart:', error);
        });
    },
  },
};
</script>


<style scoped>
.product {
  list-style-type: none;
  margin-bottom: 20px;
  /* Adds spacing between cards */
}

.product-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  /* Sets the card width */
  height: 350px;
  /* Sets the card height to maintain a square shape */
  border-radius: 35px;
  /* Applies rounded corners */
  overflow: hidden;
  /* Hides any overflow */
  background-color: #fbf6f0;
  /* Sets the background color */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  /* Adds shadow for depth */
}

.product-card__content {
  display: flex;
  flex-direction: column;
  padding: 15px 26px 23px;
  /* Adjusts padding */
  height: 100%;
  /* Ensures content uses full height */
}

.product-card__image {
  height: 60%;
  /* Adjusts the image height */
  width: 100%;
  border-radius: 15px;
  /* Ensures image covers the full width */
  object-fit: cover;
  /* Covers the area without stretching */
}

.product-card__tags {
  display: flex;
  justify-content: flex-start;
  /* Aligns tags to the left */
  gap: 5px;
  margin-top: 10px;
  /* Adds space between tags */
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
  /* Adjusts font size */
  font-weight: 500;
  color: #000;
  text-align: left;
  /* Aligns title text to the left */
  overflow: hidden;
  /* Hides overflow */
  text-overflow: ellipsis;
  /* Adds ellipsis for overflow */
  white-space: nowrap;
  /* Ensures text stays on one line */
  margin-top: 5px;
  /* Adds space above the title */
  padding: 0;
  /* Adjusts padding */
  width: 100%;
  /* Ensures title spans full width */
}

.price {
  font-family: Zen Old Mincho, sans-serif;
  font-size: 15px;
  /* Adjusts font size */
  font-weight: 600;
  color: #7B6D64;
  text-align: right;
  /* Aligns title text to the left */


  white-space: nowrap;
  /* Ensures text stays on one line */
  margin-top: 0px;
  /* Adds space above the title */
  padding: 0;
  /* Adjusts padding */
  width: 100%;
  /* Ensures title spans full width */
}
</style>
