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
