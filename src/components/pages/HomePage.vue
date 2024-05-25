<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="slider-container">
    <ImageSlider></ImageSlider>
  </div>
  <div class="banner">
    <div class="banner-left">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a2066ba092df430ed84ed22cd6e4ba0300cb017621607a42c2952aff8a02242?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
        alt="Banner image" class="banner-left-image" />
      <div class="banner-left-text">
        用不到的舊物? <br />想經營個人賣場?<br />現在登入中大Portal成為賣家!
      </div>
      <button class="banner-left-button">
        <!-- <router-link to="/newproduct">成為賣家!</router-link> -->
        <router-link to="studentcard">成為賣家!</router-link>
      </button>
    </div>
    <div class="banner-right">
      <img src="@/assets/images/Payment.png" alt="Banner image" class="banner-right-image" />
    </div>
  </div>
  <div class="products-container">
    <img src="@/assets/images/popular.png" alt="Random product" class="product-card" />
    <div class="product-card-row">
      <ProductCard v-for="prod in formattedProducts" :key="prod._id" :id="prod._id" :image="prod.image_url"
        :name="prod.name" :main_category="prod.main_category" :sub_category="prod.sub_category"
        :condition="prod.condition" :price="prod.price" :quantity="prod.quantity" :remarks="prod.remarks"
        @navigate="goToProductDetails"></ProductCard>
    </div>
  </div>
</template>

<script>
import ImageSlider from "@/components/ui/ImageSlider.vue";
import ProductCard from "@/components/ui/ProductCard.vue";
import axios from "axios";

export default {
  created() {
    console.log("Home component created");
    this.handleToken();
    this.fetchProducts();
  },
  computed: {
    formattedProducts() {
      return this.products.map(product => ({
        ...product,
        image_url: `http://localhost:8000/storage/${product.image_url}`
      }));
    }
  },
  components: {
    ImageSlider,
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },

  methods: {
    fetchProducts() {
      const url = `http://localhost:8000/api/products`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          // Check if the returned data has more than 10 items
          if (data.length > 3) {
            // Slice the last 10 items
            this.products = data.slice(-4);
          } else {
            // If there are 10 or fewer items, use all of them
            this.products = data;
          }
        })
        .catch((error) => {
          console.log("Error fetching products:", error);
        });
    },
    goToProductDetails(productId) {
      this.$router.push({ name: "productdetail", params: { id: productId } });
    },
    handleToken() {
      // 使用 URLSearchParams 解析当前页面 URL 中的查询参数

      console.log("jwt:", localStorage.getItem("jwtToken"));
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        console.log("JWT Token:", token);
        // 储存 token 到 localStorage 或进行其他操作
        localStorage.setItem("jwtToken", token);
        // 可能还需要设置 axios 的 headers 或进行其他 API 调用
        this.setupAxiosHeaders(token);
      } else {
        console.log("No token found in URL.");
      }
    },
    setupAxiosHeaders(token) {
      // 设置 axios 全局 Authorization 头部，使用 Bearer Token
      this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
  },
};
</script>

<style scoped>
* {
  font-family: Open Sans;
}

.slider-container {
  height: 650px;
  padding: 30px;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-left {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 700px;
  padding: 46px 80px 16px 40px;
  overflow: hidden;
  font-weight: 700;
  border-radius: 30px;
}

.banner-left-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.banner-right-image {
  width: auto;
  height: 310px;
  padding-left: 25px;
}

.banner-left-text {
  position: relative;
  align-self: start;
  color: #fff;
  font-size: 32px;
  
}

.banner-left-button {
  position: relative;
  align-self: center;
  margin-top: 31px;
  padding: 12px 26px;
  border-radius: 50px;
  background-color: #ebf8fa;
  color: #000;
  font: 24px Zen Old Mincho, sans-serif;
  text-align: center;
  white-space: nowrap;
}

.products-container {
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.product-card-row {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.product-card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 350px;
  /* 讓寬度彈性 */
  object-fit: scale-down;
  /* 防止圖片變形或裁切 */
  height: auto;
  /* Sets the card height to maintain a square shape */
  /* Applies rounded corners */
  overflow: hidden;
}

.product {
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
