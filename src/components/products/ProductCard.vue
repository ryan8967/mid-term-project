<template>
  <li class="product">
    <div class="product__data">
      <div class="product__image">
        <img :src="image" :alt="title" />
      </div>
      <div class="product__text">
        <h3>{{ title }}</h3>
        <base-badge mode="highlight" :no-margin-left="true">
          <h4>${{ price }}</h4>
        </base-badge>
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="product__actions">
      <button @click="addToCart">Add to Cart</button>
    </div>
  </li>
</template>

<script>
import axios from 'axios';
export default {
  props: ['id', 'image', 'title', 'price', 'description'],
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
li {
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

.product__data {
  display: flex;
}

.product__image {
  margin-right: 1rem;
}

.product__image img {
  height: 10rem;
  width: 10rem;
  object-fit: cover;
}

.product__text h3 {
  margin: 0 0 0.5rem 0;
}

.product__text h4 {
  margin: 0;
}

.product__actions {
  text-align: center;
}

button {
  font: inherit;
  cursor: pointer;
  background-color: #45006d;
  color: white;
  border: 1px solid #45006d;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
}

button:hover,
button:active {
  background-color: #760ab4;
  border-color: #760ab4;
}
</style>
