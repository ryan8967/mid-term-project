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
      <button class="banner-left-button">成為賣家!</button>
    </div>
    <div class="banner-right">
      <img
        src="@/assets/images/Capture-removebg-preview.png"
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
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :image="product.image"
        :price="product.price"
        :description="product.description"
        :tag1="product.tag1"
        :tag2="product.tag2"
      />
    </div>
  </div>
</template>

<script>
import ImageSlider from "@/components/ui/ImageSlider.vue";
import ProductCard from "@/components/products/ProductCard.vue";
export default {
  components: {
    ImageSlider,
    ProductCard,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          title: "辛拉麵 韓國境內版",
          image:
            "https://m.media-amazon.com/images/I/51vTJqaNoRL._SX300_SY300_QL70_FMwebp_.jpg",
          price: 35,
          description: "正宗韓國風味的辛拉麵，麵條彈牙，湯頭鮮辣。",
          tag1: "食品",
          tag2: "泡麵",
        },
        {
          id: 2,
          title: "輕量化無線滑鼠 對稱式高背設計",
          image:
            "https://shoplineimg.com/5a238dc8080f0658ad003280/655184effafd2661c21e462c/800x.jpg?",
          price: 299,
          description: "符合人體工學的無線滑鼠，適合長時間操作不易疲勞。",
          tag1: "3C",
          tag2: "滑鼠",
        },
        {
          id: 3,
          title: "最新C語言：程式設計實例入門Ｉ博碩文化出版",
          image:
            "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/057/68/0010576829.jpg&v=5113823dk&w=1146&h=600",
          price: 120,
          description: "最新C語言：程式設計實例入門Ｉ博碩文化出版",
          tag1: "書籍",
          tag2: "文具",
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
</style>
