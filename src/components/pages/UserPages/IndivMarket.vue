<template>
    <!-- <h1>marketplace</h1> -->
    <div class="market-information">
        <div class="market-name">Cool Stuff</div>
        <div class="counts">交易次數:</div>
        <div class="rating"><img src="@/assets/images/Rating.png" alt="rating"></div>
        <div class="chatroom"><a><img src="@/assets/images/chat.png" alt="Chatting room"/>私訊</a></div>
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
    <div class="market-menu">
        <router-link :to="{ path: '/newProducts' }"><div class="actions">上架物品</div></router-link>
        <router-link :to="{ path: '/RecordsPage' }"><div class="actions">交易紀錄/申訴</div></router-link>
    </div>
</template>

<script>
import axios from 'axios';
import ProductCard from '@/components/ui/ProductCard.vue';
export default {
    components: {
        ProductCard,
    },
    data() {
        return {
            userId: null, // 假設你已知的用戶ID，實際應用中你可能從登入狀態或URL參數中獲得
            products: [] // 初始化空數組，等待數據填充
        }
    },
    methods: {
        //能登入後再測試一次
        fetchUserId() {
            axios.get('/api/user')  // 使用相對路徑調用 API
                .then(response => {
                    this.userId = response.data.user_id;  // 假設後端返回的資訊中包含 id
                    this.fetchProducts();
                })
                .catch(error => {
                    console.error('Error fetching user ID:', error.response.data);
                });
        },
        fetchProducts() {
            if (!this.userId) return;  // 確保有 userId 才發起請求
            axios.get(`http://localhost:8000/api/products/user/${this.userId}`)
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.error('Error fetching products:', error.response.data);
                });
        }
    },
    mounted() {
        this.fetchUserId();  // 在掛載時獲取用戶 ID
        this.fetchProducts();
    }
}
</script>

<style>

.market-information{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    margin: 20px auto; /* 上下保持 0，左右自動 */
    padding: 10px 10px;
    width: 80%;
    height: 80px;
    background-color: #EBD9B4;
    border-radius: 30px;
}

.market-name{
    display: flex;
    align-items: center; /* 添加此行以垂直居中文字 */
    justify-content: center; /* 水平居中文字 */
    width: 25%; /* 調整寬度以適應設計需求 */
    height: 50px;
    background-color: white;
    border-radius: 30px;
    font-family: Inria Serif;
    font-size: 25px;
    font-weight: bold;
}

.counts{
    display: flex;
    align-items: center; /* 添加此行以垂直居中文字 */
    justify-content: center; /* 水平居中文字 */
    width: 25%; /* 調整寬度以適應設計需求 */
    height: 50px;
    border-radius: 30px;
    font-family: Zen Old Mincho;
    font-size: 25px;
    font-weight: bold;
}

.rating img{
    width: 250px;
    height: auto;

}

.chatroom{
    display: flex;
    width: 200px;
    height: 80%;
    background-color: white;
    align-items: center;
    justify-content: center;
    border: 3px solid #C69F76;
    border-radius: 30px;
    font-family: Zen Old Mincho;
    font-size: 28px;
    font-weight: bold;
}

.chatroom img{
    width: 35px;
    height: 80%;
}

.product-card-row {
    display: flex;     /* 啟用 Flexbox */
    flex-wrap: wrap;   /* 允許元素換行 */
    margin: 20px 0 0 120px;
    padding: 10px;     /* 給予一定內距 */
}

.product{
    margin: 20px 20px;
}

.market-menu{
    display: flex;     /* 啟用 Flexbox */
    flex-wrap: wrap;   /* 允許元素換行 */
    justify-content: center; /* 水平居中 */
    padding: 10px;     /* 給予一定內距 */
    flex-direction: row;
}

.market-menu .actions{
    margin: 20px 20px;
}

a {
  text-decoration: none;
  color: inherit;
  justify-content: center;
  align-items: center;
}
</style>