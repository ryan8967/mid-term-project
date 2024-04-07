<template>
  <!-- <h1>Home</h1> -->
  <div class="slider-container">
    <ImageSlider></ImageSlider>
  </div>
  
  <div class="products-container">
    <img src="@/assets/images/popular.png" alt="Random product" class="product-card" />
    <ProductCard v-for="product in products" :key="product.id" :id="product.id" :title="product.title"
      :image="product.image" :price="product.price" :description="product.description" :tag1="product.tag1"
      :tag2="product.tag2" />
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
      items: [
        {
          src: 'https://cloud.culture.tw/e_new_upload/task/97b68b43-4653-4595-b7a0-a816818be7c5/587794988cfb0e6362426451c88d970dcaeab92fbed83de272e1f84b444a4791faa943baf8f2f2132c22901c1fed15e150e81853796917ad0d43678fd0bd4959/75f5e3277ba0206c65cc73cdaaa781922e4c3c5a.jpg',
          link: 'https://www.arte.gov.tw/pro1_exh_now.asp?KeyID\u003d3087',
        },
        {
          src: 'https://cloud.culture.tw/e_new_upload/cms/image/A0/B0/C0/D20/E144/F948/ec4f1767-21a6-45b0-9c65-1f1151f2de53.jpg',
          link: 'https://reurl.cc/dGleMq',
        },
        {
          src: 'https://cloud.culture.tw/e_new_upload/cms/image/A0/B0/C0/D22/E186/F1/3962a866-f005-400f-89e7-05799e95efb4.jpg',
          link: 'http://jam.jutfoundation.org.tw/exhibition/3101',
        },
        {
          src: 'https://cloud.culture.tw/e_new_upload/cms/image/A0/B0/C0/D24/E155/F250/0a005484-53de-4382-958c-e71b79b9cc78.jpg',
          link: 'https://mipaliwlandart.com',
        },
      ],
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
          image: "https://shoplineimg.com/5a238dc8080f0658ad003280/655184effafd2661c21e462c/800x.jpg?",
          price: 299,
          description: "符合人體工學的無線滑鼠，適合長時間操作不易疲勞。",
          tag1: "3C",
          tag2: "滑鼠",
        },
        {
          id: 3,
          title: "最新C語言：程式設計實例入門Ｉ博碩文化出版",
          image: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/057/68/0010576829.jpg&v=5113823dk&w=1146&h=600",
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
.slider-container{
  padding:25px;
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
