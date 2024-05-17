<!--有問題或要改告訴我-->
<template>
    <div class="spacer"></div>
    <div class="staffInformation">
      <button class="sub-block left">COOL STUFF</button>
      <button class="sub-block right"><img src="@/assets/images/chat.png" alt="Chatting room"/>私訊</button>
      <p class="transactionTimes">交易次數：{{ transactionCount }}</p>
      <div class="rating">
        <span v-for="n in Math.floor(rating)" :key="n" class="stars">★</span>
        <span class="rating-number">{{ rating.toFixed(1) }}</span>
      </div>
    </div>
    
    <div class="market-menu">
        <router-link :to="{ path: '/newProducts' }"><div class="actions">申訴</div></router-link>
    </div>
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
</template>

<script>
  import ProductCard from '@/components/ui/ProductCard.vue';
  export default {
    components: {
        ProductCard,
    },
    data() {
      return {
        transactionCount: 6,
        rating:5,
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
            ]
      };
    },
  };
</script>
  
<style scoped>
  .spacer {
    height: 200px; /* 調整高度 */
    background-color: transparent; 
  }
  
  .product-card {
    width: 100%;
    position: relative;
    height: auto; 
    display: inline-block;
  }

  .staffInformation {
    position: absolute;
    top: 230px;
    left: 50%;
    transform: translateX(-50%);
    width: 1000px;
    height: 60px;
    border-radius: 25px;
    background-color: rgba(235, 217, 180, 0.5);
  }
  
  .sub-block {
  position: absolute;
  bottom: 10px; 
  height: 40px;
  border-radius: 25px;
  justify-content: center;
  font-size: 23px;
  text-align: center;
  line-height: 42px;
  border: none; 
}
  .left {
  width: 240px;
  left: 10px; 
  background-color: #ffffff; 
}
  .right {
  width: 180px;
  right: 15px;
  background-color: #ffffff;
}
  .transactionTimes {
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  font-size: 23px;
  }
  .rating {
  position: absolute;  
  transform: translateX(-50%); 
  top: 5%;
  left: 62%;
  font-size: 23px;
  }

  .stars {
    color: #FFF384;
    -webkit-text-stroke: 2.5px #d1b596;
    font-size: 35px;
    z-index: 1; 

  }
  .rating-number {
  position: absolute;
  left: calc(100% + 13px); /* on the right of star */
  top: 55%;
  transform: translateY(-50%);
  font-size: 28px;
  color:#C69F76;
  }
  .market-menu{
    position: absolute; 
    display: flex;     /* 啟用 Flexbox */
    padding: 10px;     /* 給予一定內距 */
    flex-direction: row;
    bottom: -160px; 
    left: 13%; 

  }
  .market-menu .actions{
    margin: 20px 20px;
    font-size: 20px;
    white-space: nowrap;
  }
  .product-card-row {
    display: flex;   
    padding: 10px;   
    margin: -60px 30px 130px 185px;
  }
  .product{
    margin: 20px 20px;
  }
  .right img {
  width: 30px;
  height: auto;
  margin-right: 5px; 
  }

</style>
  
