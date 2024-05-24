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
          <!-- <th>庫存量</th> -->
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.product_id">
          <td>{{ item.name }}</td>
          <td>
            <!-- <button
              type="button"
              @click="decrement(item)"
              class="cart-button"
              :disabled="item.quantity <= 1"
            >
              - -->
            <!-- </button> -->
            <span>{{ item.quantity }}</span>
            <!-- <button type="button" @click="increment(item)" class="cart-button">
              +
            </button> -->
          </td>
          <td>{{ item.price }}</td>
          <td>{{ item.price * item.quantity }}</td>
          <!-- <td>{{ item.stock }}</td> -->
          <td>
            <button
              @click="removeFromCart(item.product_id)"
              class="remove-button"
            >
              移除
            </button>
          </td>
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
import axios from "axios";

export default {
  data() {
    return {
      cartItems: [], // 存儲從 API 獲取的購物車項目列表
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    //獲取購物車
    fetchCart() {
      const token = localStorage.getItem("jwtToken"); // 從 localStorage 獲取 token
      axios
        .get("http://127.0.0.1:8000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // 使用 JWT token 認證請求
          },
        })
        .then((response) => {
          if (response.data && Array.isArray(response.data.items)) {
            this.cartItems = response.data.items;
          } else {
            this.cartItems = []; // 若無有效數據，設置為空數組
          }
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
          this.cartItems = []; // 處理異常時也應確保 cartItems 為空數組避免錯誤
        });
    },

    //數量變更
    increment(item) {
      item.quantity++;
    },
    decrement(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },

    //購買商品
    purchaseProduct(productId, quantity) {
      console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
      let url = "http://localhost:8000/api/products/" + productId + "/purchase";
      console.log("Request url:", url);
      axios
        .post(url, { quantity: quantity })
        .then(() => {
          alert("購買成功");
          this.addToOrder(productId, quantity);
        })
        .catch((error) => {
          console.log("購買失敗:", error.response.data);
          alert("購買失敗。" + (error.response.data.message || error.message));
        });
    },

    //更新訂購紀錄
    addToOrder(productId, quantity) {
      let url = "http://localhost:8000/api/orders";
      axios
        .post(url, { product_id: productId, quantity: quantity })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("更新訂單失敗:", error.response.data);
        });
    },

    removeFromCart(productId) {
      console.log(productId);
      axios
        .post(`http://localhost:8000/api/cart/remove`, {
          product_id: productId,
        })
        .then(() => {
          this.cartItems = this.cartItems.filter(
            (item) => item.product_id !== productId
          );
          alert("商品已從購物車移除");
        })
        .catch((error) => {
          alert("移除失敗: " + error.message);
        });
    },

    //清空購物車
    clearCart() {
      axios
        .post(`http://localhost:8000/api/cart/clear`)
        .then(() => {
          this.cartItems = [];
        })
        .catch((error) => {
          alert("清空購物車失敗: " + error.message);
        });
    },

    checkout() {
      //為每一個商品做購買的動作
      this.cartItems.forEach((item) => {
        this.purchaseProduct(item.product_id, item.quantity);
      });
      this.clearCart();
    },
  },
  created() {
    this.fetchCart(); // 在組件創建時獲取購物車資料
  },
};
</script>

<style>
.cart-container {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  font: 25px Zen Old Mincho, sans-serif;
  color: gray;
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.cart-button {
  font: 15px Zen Old Mincho, sans-serif;
  margin: 0 10px; /* 左右邊距為10像素 */
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  border: none;
  border-radius: 50%;
  visibility: hidden; /* 預設隱藏按鈕 */
  transition: visibility 0.1s; /* 平滑過渡效果 */
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
}

tr:hover .cart-button {
  visibility: visible; /* 懸停時顯示按鈕 */
  background-color: #fbf6f0;
}

.remove-button {
  font: 16px Zen Old Mincho, sans-serif;
  padding: 5px 10px;
  border: 1px solid #c69f76;
  border-radius: 30px;
  cursor: pointer; /*將鼠標樣式更改為點擊*/
}

.purchase-button {
  font: 20px Zen Old Mincho, sans-serif;
  padding: 10px 20px;
  border: 1px solid #c69f76;
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
.checkout-button {
  font: 20px Zen Old Mincho, sans-serif;
  padding: 10px 20px;
  border: 2px solid #c69f76;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  cursor: pointer; /*將鼠標樣式更改為點擊*/
}
  
.clear-cart-button:hover ,
.checkout-button:hover {
  background-color: #fbf6f0;
}

.clear-cart-button {
  margin-right: 20px;
  margin-top:20px;
}
</style>
