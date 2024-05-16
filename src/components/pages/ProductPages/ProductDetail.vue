<!--還沒寫完-->
<template>
  <div class="product-card">
    <img :src="product.image" alt="Product Image" class="product-image" style="width: 600px; height: 600px; border-radius: 15px; position: relative;"/>
      <h1 class="product-name" style="top: 70px;">{{ product.name }}</h1>
    <div class="rectangle" style="left: 759px;">
      <span class="text">其他</span>
    </div>
    <div class="rectangle" style="left: calc(759px + 102px + 45px);">
      <span class="text">吉他</span>
    </div>
    <div class="line"></div>
    <div class="product-details">
      <div class="price-container" style="position: absolute; left: calc(759px + 450px);">
        <p class="price">{{ product.price }}</p>
      </div>
      <div class="ratings">
        <!-- Render stars based on rating -->
        <span v-for="n in product.rating" :key="n" class="star">&#9733;</span>
      </div>
      <button @click="addToCart">加入購物車</button>
    </div>
    <div class="item-details" style="width: 610px; margin-top: 30px;">
      <ul style="font-size: 25px; line-height:2.25;">
        <li>商品狀況 : 九成新</li>
        <li>數量: 1</li>
        <li>商品詳情描述 : </li>
        <p class="description" >{{ product.description }}</p>
        
      </ul>
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
        price: "¥87,800",
        description: "Alder body with gloss finish, Three Player Series single-coil Stratocaster pickups, 'Modern C'-shaped neck profile",
        //image: "path_to_image.jpg",
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
  position: relative;
}

.product-image {
  position: relative;
  width: 600px;
  height: 600px;
}

.product-name {
  position: absolute;
  top: 15px;
  left: 755px;
  width: 361px;
  height: 58px;
  font-size: 40px;
}

.product-details {
  margin-top: 10px;
}

.star {
  color: gold;
}

.rectangle {
  width: 102px;
  height: 32px;
  background-color: #d5ba9c;
  border-radius: 30px;
  position: absolute;
  top: 135px;
  text-align: center;
}

.text {
  font-size: 20px;
  line-height: 32px;
}

.price-container {
  position: absolute;
  top: 113px; 
  
}

.price {
  font-size: 40px;
}
.line {
  position: absolute;
  top: 180px; 
  width: 633px;
  height: 2px;
  left: 730px;
  background-color: #C69F76;
}

.item-details {
  position: absolute;
  top: 200px;
  left: 730px;
  font-size: 18px;
}
</style>
