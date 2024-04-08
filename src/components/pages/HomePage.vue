<template>
  <div class="slider-container">
    <ImageSlider></ImageSlider>
  </div>

  <div class="products-container">
    <img
      src="@/assets/images/popular.png"
      alt="Random product"
      class="product-card"
    />
    <div class="product-card-row">
      <ProductCard claee="product"
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
  padding: 10px;
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
  padding: 10px ;
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
.product{
  padding: 0 20px;
}
</style>
