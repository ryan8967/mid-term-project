<template>
    <div class="product-card">
      <img :src="product.image" alt="Product Image" class="product-image"/>
      <div class="product-details">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price }}</p>
        <p class="description">{{ product.description }}</p>
        <div class="ratings">
          <!-- Render stars based on rating -->
          <span v-for="n in product.rating" :key="n" class="star">&#9733;</span>
        </div>
        <button @click="addToCart">加入购物车</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    data() {
      return {
        product: {
          name: "Fender Stratocaster",
          price: "¥27,800",
          description: "Alder body with gloss finish, Three Player Series single-coil Stratocaster pickups, 'Modern C'-shaped neck profile",
          image: "path_to_image.jpg",
          rating: 5
        }
      }
    },
    methods: {
      addToCart() {
        // Add to cart logic
        alert('Added to cart!');
      }
    }
  }
  </script>
  
  <style scoped>
  .product-card {
    width: 300px;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
  }
  
  .product-image {
    width: 100%;
    height: auto;
  }
  
  .product-details {
    margin-top: 10px;
  }
  
  .star {
    color: gold;
  }
  </style>
  