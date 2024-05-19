<template>
    <!-- <h1>Cart</h1> -->
    <form @submit.prevent="submitOrder" class="cart-container">
      <table>
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>數量</th>
            <th>價格</th>
            <th>小計</th>
            <th>庫存量</th>
            <th></th>
            <!-- <th>購買</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <button type="button" @click="decrement(item)" class="cart-button" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button type="button" @click="increment(item)" class="cart-button" :disabled="item.quantity >= item.stock">+</button>
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.price * item.quantity }}</td>
            <td>{{ item.stock }}</td>
            <td>
              <button @click="removeFromCart(item.id)" class="remove-button">移除</button>
            </td>
            <!-- <td>
              <button @click="purchaseProduct(item.id, item.quantity)" class="purchase-button">購買</button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </form>
    <div class="checkout">
      <p>總金額:{{ totalPrice }}</p>
      <button @click="clearCart" class="clear-cart-button">清空購物車</button>
      <button @click="checkout" class="checkout-button">結帳</button>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [
        { id: 1, name: '商品A', price: 100, quantity: 1, stock: 10 },
        // { id: 2, name: '商品B', price: 200, quantity: 2, stock: 5 },
        // { id: 3, name: '商品C', price: 150, quantity: 1, stock: 8 }
      ]
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods:{
    //數量變更
    increment(item) {
      if (item.quantity < item.stock) {
        item.quantity++;
      }
    },
    decrement(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    checkout() {
      //為每一個商品做購買的動作
      this.cartItems.forEach(item =>{
        this.purchaseProduct(item.id, item.quantity);
      });
    },
    //購買商品
    purchaseProduct(productId, quantity) {
    axios.post(`/api/products/${productId}/purchase`, { quantity: quantity })
      .then(response => {
        alert('購買成功');
        console('已成功向賣家下單:', response.data)
      })
      .catch(error => {
        console.log('購買失敗:', error.response.data);
        alert('購買失敗。' + (error.response.data.message || error.message));
      });
    },
    //移除商品
    removeFromCart(productId) {
    axios.post(`/api/cart/remove`, { product_id: productId })
      .then(response => {
        this.cartItems = response.data.items; // 假設後端返回的購物車數據包含在items屬性中
        alert('商品已從購物車移除');
      })
      .catch(error => {
        console.log('移除失敗:', error.response.data);
        alert('移除失敗: ' + (error.response && error.response.data.message ? error.response.data.message : error.message));
      });
    },
    //清空購物車
    clearCart() {
    axios.post(`/api/cart/clear`)
      .then(response => {
        this.cartItems = response.data.items || []; // 使用後端返回的數據確保同步
        alert('購物車已清空');
    })
      .catch(error => {
        console.log('清空購物車失敗:', error.response.data);
        alert('清空購物車失敗: ' + (error.response.data.message || error.message));
      });
    },

  },

}
</script>

<style>
.cart-container{
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  font: 25px Zen Old Mincho, sans-serif;
  color: gray;
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.cart-button{
  font: 15px Zen Old Mincho, sans-serif;
  margin: 0 10px; /* 左右邊距為10像素 */
  background-color:rgba(255, 255, 255, 0.5);
  color: #333;
  border: none;
  border-radius: 50%;
  visibility: hidden; /* 預設隱藏按鈕 */
  transition: visibility 0.1s; /* 平滑過渡效果 */
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
}

tr:hover .cart-button {
    visibility: visible; /* 懸停時顯示按鈕 */
    background-color:  #fbf6f0;
}

.remove-button{
  font: 16px Zen Old Mincho, sans-serif;
  padding: 5px 10px;
  border: 1px solid #C69F76;
  border-radius: 30px;
  cursor: pointer; /*將鼠標樣式更改為點擊*/
}

.purchase-button{
  font: 20px Zen Old Mincho, sans-serif;
  padding: 10px 20px;
  border: 1px solid #C69F76;
  border-radius: 30px;
  cursor: pointer; /*將鼠標樣式更改為點擊*/
}

.checkout {
  font: 40px Zen Old Mincho, sans-serif;
  padding: 10px;
  margin: 20px 20px 0 0;
  text-align: right;
}

.clear-cart-button,
.checkout-button{
  font: 20px Zen Old Mincho, sans-serif;
  padding: 10px 20px;
  border: 1px solid #C69F76;
  border-radius: 30px;
  cursor: pointer; /*將鼠標樣式更改為點擊*/
}

.clear-cart-button{
  margin-right: 20px;
}
</style>