<template>
  <div id="app">
    <div class="wrapper">
      <the-header></the-header>
      <the-nav></the-nav>
      <div class="products-container">
        <ProductCard v-for="product in products" :key="product.id" :id="product.id" :title="product.title"
          :image="product.image" :price="product.price" :description="product.description" :tag1="product.tag1"
          :tag2="product.tag2" />
      </div>
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
import TheNav from './components/layout/TheNav.vue';
import ProductCard from '@/components/products/ProductCard.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
    TheNav,
    ProductCard,
  },
  data() {
    return {
      // Expanded sample products array
      products: [
        {
          id: 1,
          title: '辛拉麵 韓國境內版',
          image: 'https://picsum.photos/200/300?random=1',
          price: 35,
          description: '正宗韓國風味的辛拉麵，麵條彈牙，湯頭鮮辣。',
          tag1: '食品',
          tag2: '泡麵'
        },
        {
          id: 2,
          title: '輕量化無線滑鼠 對稱式高背設計',
          image: 'https://picsum.photos/200/300?random=2',
          price: 299,
          description: '符合人體工學的無線滑鼠，適合長時間操作不易疲勞。',
          tag1: '3C',
          tag2: '滑鼠'
        },
        {
          id: 3,
          title: '多功能運動手環',
          image: 'https://picsum.photos/200/300?random=3',
          price: 120,
          description: '隨時監測你的運動數據，輕巧舒適，時尚健康兩不誤。',
          tag1: '穿戴裝置',
          tag2: '智能手環'
        },
        {
          id: 4,
          title: '經典皮革長夾',
          image: 'https://picsum.photos/200/300?random=4',
          price: 450,
          description: '經典款式皮革長夾，結合優雅與實用性，是商務人士的最佳選擇。',
          tag1: '新品',
          tag2: '推薦'
        }
      ]
    }
  }

};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.wrapper {
  flex: 1;
}

the-footer {
  flex-shrink: 0;
  max-height: 25vh;
  margin: 0;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  /* Use this if you want to allow wrapping to a new line on small screens */
  justify-content: space-around;
  /* This spreads out the products evenly across the container */
  gap: 20px;
  /* Optional: Adds space between the products */
}
</style>
