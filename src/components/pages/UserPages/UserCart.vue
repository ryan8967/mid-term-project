<template>
    <!-- <h1>Cart</h1> -->
    <div class="cart-container">
      <table>
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>數量</th>
            <th>價格</th>
            <th>小計</th>
            <th>庫存量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <button @click="decrement(item)" class="cart-button">-</button>
              {{ item.quantity }}
              <button @click="increment(item)" class="cart-button">+</button>
            </td>
            <td>{{ item.prices }}</td>
            <td>{{ item.prices * item.quantity }}</td>
            <td>{{ item.stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="checkout">
      <p>總金額:{{totalPrice}}</p>
      <button @click="checkout" class="checkout-button">結帳</button>
    </div>

</template>

<script>
export default {
  data() {
    return {
      //連接加入購物車功能?
      cartItems: [
        { id: 1, name: '商品A', price: 100, quantity: 1, stock: 10 },
        { id: 2, name: '商品B', price: 200, quantity: 2, stock: 5 },
        { id: 3, name: '商品C', price: 150, quantity: 1, stock: 8 }
      ]
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods:{
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
      alert('結帳金額為：' + this.totalPrice);
      //等待後續後端實現結帳功能
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
  text-align: left;
  border-bottom: 1px solid #eee;
}

.cart-button{
  font: 15px Zen Old Mincho, sans-serif;
  border-radius: 45px;
  transition: background-color 0.3s;
  opacity: 0.5;
}
.cart-button:hover{
  opacity: 1;
}

.checkout {
  font: 40px Zen Old Mincho, sans-serif;
  padding: 10px;
  margin: 20px 20px 0 0;
  text-align: right;
}

.checkout-button{
  font: 20px Zen Old Mincho, sans-serif;
  padding: 10px 20px;
  border-radius: 30px;
  opacity: 0.5;
}

.checkout-button:hover{
  opacity: 1;
}
</style>