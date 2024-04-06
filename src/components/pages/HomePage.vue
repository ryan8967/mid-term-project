<template>
  <!-- <h1>Home</h1> -->
  <div class="products-container">
    <img src="@/assets/images/popular.png" alt="Random product" class="product-card" />
    <ProductCard v-for="product in products" :key="product.id" :id="product.id" :title="product.title"
      :image="product.image" :price="product.price" :description="product.description" :tag1="product.tag1"
      :tag2="product.tag2" />
  </div>
</template>

<script>
import ProductCard from "@/components/products/ProductCard.vue";
export default {
  components: {
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
          image: "https://picsum.photos/200/300?random=2",
          price: 299,
          description: "符合人體工學的無線滑鼠，適合長時間操作不易疲勞。",
          tag1: "3C",
          tag2: "滑鼠",
        },
        {
          id: 3,
          title: "多功能運動手環",
          image: "https://picsum.photos/200/300?random=3",
          price: 120,
          description: "隨時監測你的運動數據，輕巧舒適，時尚健康兩不誤。",
          tag1: "穿戴裝置",
          tag2: "智能手環",
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

.products-container {
  padding: 25px;

}

.controls {
  display: flex;
  justify-content: space-between;
}

.product-card {
  padding: 0px;
  display: flex;
  flex-direction: column;

  width: 350px;
  /* 讓寬度彈性 */
  object-fit: scale-down;
  /* 防止圖片變形或裁切 */
  height: auto;
  /* Sets the card height to maintain a square shape */
  /* Applies rounded corners */
  overflow: hidden;
  /* Hides any overflow */

  /* Sets the background color */

  /* Adds shadow for depth */
}
</style>
