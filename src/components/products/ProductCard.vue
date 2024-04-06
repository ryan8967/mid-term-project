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

<!-- <style scoped>
li.product {
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  width: 250px;
  /* Fixed width */
  min-height: 350px;
  /* Minimum height to maintain consistency */
  display: flex;
  flex-direction: column;
  /* Stack image and text vertically */
  justify-content: space-between;
  /* Distribute space */
}

.product__data {
  /* If you're using flexbox for layout, ensure it aligns items as intended */
}

.product__image img {
  height: 10rem;
  width: 10rem;
  object-fit: cover;
  margin-bottom: 1rem;
  /* Ensure some space between the image and text */
}

.product__text {
  /* Fixed height for the text container can be set if needed */
  min-height: 100px;
  /* Example: Setting minimum height */
  overflow-y: auto;
  /* Makes content scrollable if it exceeds the container height */
}

.product__actions {
  margin-top: 1rem;
  /* Ensure space between text and buttons */
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
  width: 100%;
  /* Optional: Makes button full width */
}

button:hover,
button:active {
  background-color: #760ab4;
  border-color: #760ab4;
}
</style> -->

<!-- <style scoped>
.product-card {
  display: flex;
  max-width: 286px;
  flex-direction: column;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
}

.product-card__content {
  border-radius: 35px;
  background-color: #fbf6f0;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 15px 26px 23px;
}

.product-card__image {
  aspect-ratio: 1.64;
  object-fit: cover;
  width: 100%;
}

.product-card__tags {
  display: flex;
  margin-top: 12px;
  gap: 5px;
  color: #fff;
  white-space: nowrap;
  text-align: center;
}

.product-card__tag {
  font-family: Zen Old Mincho, sans-serif;
  border-radius: 20px;
  background-color: #c69f76;
  padding: 4px 12px;
}

.product-card__title {
  color: #000;
  font-family: Zen Old Mincho, sans-serif;
  margin-top: 17px;
}
</style> -->

<!-- <style scoped>
.product {
  list-style-type: none;
  margin-bottom: 20px;
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

.product-card__image {
  height: 60%;
  /* Half of the card's height */
  width: 100%;
  /* Full width */
  object-fit: cover;
  border-radius: 35px;
  padding: 8%;
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
</style> -->

<style scoped>
.product {
  list-style-type: none;
  margin-bottom: 20px;
  /* Adds spacing between cards */
}

.product-card {
  display: flex;
  flex-direction: column;
  width: 286px;
  /* Sets the card width */
  height: 286px;
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
  margin-top: 10px;
  /* Adds space above the title */
  padding: 0;
  /* Adjusts padding */
  width: 100%;
  /* Ensures title spans full width */
}
</style>
