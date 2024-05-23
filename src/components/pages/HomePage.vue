<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="slider-container">
    <ImageSlider></ImageSlider>
  </div>
  <div class="banner">
    <div class="banner-left">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a2066ba092df430ed84ed22cd6e4ba0300cb017621607a42c2952aff8a02242?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
        alt="Banner image"
        class="banner-left-image"
      />
      <div class="banner-left-text">
        用不到的舊物? <br />想經營個人賣場?<br />現在登入中大Portal成為賣家!
      </div>
      <button class="banner-left-button">
        <router-link to="/notFound">成為賣家!</router-link>
      </button>
    </div>
    <div class="banner-right">
      <img
        src="@/assets/images/Payment.png"
        alt="Banner image"
        class="banner-right-image"
      />
    </div>
  </div>
  <div class="products-container">
    <img
      src="@/assets/images/popular.png"
      alt="Random product"
      class="product-card"
    />
    <div class="product-card-row">
      <ProductCard
        class="product"
        v-for="prod in products"
        :key="prod._id"
        :id="prod._id"
        :image="prod.image"
        :name="prod.name"
        :main_category="prod.main_category"
        :sub_category="prod.sub_category"
        :price="prod.price"
        :quantity="prod.quantity"
      ></ProductCard>
    </div>
  </div>
</template>

<script>
import ImageSlider from "@/components/ui/ImageSlider.vue";
import ProductCard from "@/components/ui/ProductCard.vue";
// import axios from 'axios';
export default {
  created() {
    console.log("Home component created");
    this.handleToken();
  },
  components: {
    ImageSlider,
    ProductCard,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          image:
            "https://m.media-amazon.com/images/I/51vTJqaNoRL._SX300_SY300_QL70_FMwebp_.jpg",
          name: "辛拉麵 韓國境內版",
          main_category: "食品",
          sub_category: "食品",
          price: 35,
          quantity: 1,
          description: "正宗韓國風味的辛拉麵，麵條彈牙，湯頭鮮辣。",
        },
        {
          id: 2,
          image:
            "https://shoplineimg.com/5a238dc8080f0658ad003280/655184effafd2661c21e462c/800x.jpg?", 
          name: "輕量化無線滑鼠 對稱式高背設計",
          main_category: "3C",
          sub_category: "周邊",
          price: 299,
          quantity: 1,
          description: "符合人體工學的無線滑鼠，適合長時間操作不易疲勞。",
        },
        {
         id: 3,
          image:
            "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/057/68/0010576829.jpg&v=5113823dk&w=1146&h=600",
          name: "最新C語言：程式設計實例入門Ｉ博碩文化出版",
          main_category: "書店",
          sub_category: "教科書",
          price: 120, 
          quantity: 1,
          description: "最新C語言：程式設計實例入門Ｉ博碩文化出版",
        },
        // {
        //   id: 4,
        //   title: "經典皮革長夾",
        //   image: "https://picsum.photos/200/300?random=4",
        //   price: 450,
        //   description:
        //     "經典款式皮革長夾，結合優雅與實用性，是商務人士的最佳選擇。",
        //   tag1: "新品",
        //   tag2: "推薦",
        // },
      ],
    };
  },

  methods: {
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
  padding: 10px;
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
  font: 32px Zen Old Mincho, sans-serif;
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
