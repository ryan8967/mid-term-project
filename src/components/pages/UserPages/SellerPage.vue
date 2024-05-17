<template>
    <div class="container">
      <h1>New Products</h1>
      <div class="staffInformation">
        <p class="ratinggg">{{ product.rating.toFixed(1) }}</p>
        <div class="sub-block left">
          COOL STUFF
        </div>
        <div class="sub-block right">
          私訊
        </div>
      </div>
      <div class="ratings">
        <!-- Render stars based on rating -->
        <span v-for="n in product.rating" :key="n" class="star">&#9733;</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          rating: 4.5 // For example
        }
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center; /* To center horizontally */
    justify-content: center; /* To center vertically */
    min-height: 100vh; /* To make sure the container stretches to full viewport height */
  }
  
  .staffInformation {
  position: relative; /* Change position to relative */
  width: 720px;
  height: 60px;
  background-color: #E2DBC9;
  border-radius: 25px;
  font-size: 23px;
  line-height: 42px;
  text-align: center;
  box-shadow: 2px 2px 3px #888888;
  margin-top: 20px; /* Add some top margin */
}

  
  .sub-block {
    height: 40px;
    border-radius: 25px;
    justify-content: center;
    font-size: 23px;
    text-align: center;
    line-height: 42px;
  }
  
  .left {
    width: 240px;
    background-color: #ffffff;
  }
  
  .right {
    width: 180px;
    background-color: #ffffff;
  }
  
  .ratinggg {
    font-size: 27px;
    line-height: 42px;
    color: #C69F76;
  }
  </style>
