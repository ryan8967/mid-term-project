<!-- eslint-disable vue/no-parsing-error -->
<template>
  <LoadingSpinner v-if="isLoading"></LoadingSpinner>
  <div v-else class="container">
    <div class="product-overview">
      <div class="product-image-wrapper">
        <img :src="products.image_url" :alt="products.name" class="product-image" :class="{ shadowed: products.quantity === 0 }"/>
        <div v-if="products.quantity === 0" class="sold-out-banner">Sold Out!</div>
      </div>
      <section class="product-details">
        <div class="product-header">
          <div class="product-info">
            <h1 class="product-title">{{ products.name }}</h1>
          </div>
          <div class="product-tags">
            <span class="tag">{{ products.main_category }}</span>
            <span class="tag" v-show="products.sub_category !== null">{{ products.sub_category }}</span>
            <span class="product-price">${{ products.price }}</span>
          </div>
        </div>
        <hr class="divider" />
        <div class="product-description">
          <p class="description">商品狀況: {{ products.condition }}</p>
          <p class="description" v-if="products.quantity > 0">庫存量: {{ products.quantity }}</p>
          <p class="description" v-else>庫存已售完</p>
          <p class="description">詳情描述: {{ products.remarks }}</p>
        </div>
      </section>
    </div>
    <div class="actions-container" v-show="!ownProduct">
      <div class="staffInformation">
        <div class="sub-block" @click="goToSeller(products._id)">
          {{ seller.nickname }}
        </div>
        <div class="sub-block" @click="sendEmail">聯絡</div>
      </div>
      <section class="product-actions" v-if="products.quantity > 0">
        <div class="quantity-selector">
          <button @click="decrement" class="quantity-button">-</button>
          <input type="number" v-model="selectedQuantity" class="quantity-input" min="1" />
          <button @click="increment" class="quantity-button">+</button>
        </div>
        <button @click="addToCart(products._id)" class="add-to-cart">
          加入購物車
        </button>
      </section>
      <section class="product-actions" v-else>
        <button class="add-to-cart" disabled>售完</button>
      </section>
    </div>
    <div class="actions-container" v-show="ownProduct">
      <section class="product-actions">
        <button @click="goToUpdateProduct(products._id)" class="add-to-cart">
          更新商品
        </button>
        <button @click="deleteProduct(products._id)" class="add-to-cart">
          刪除商品
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { openEmailClient } from "@/utils/emailUtils.js";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";

export default {
  data() {
    return {
      products: {},
      ownProduct: false,
      selectedQuantity: 1,
      baseUrl: "http://localhost:8000/storage/",
      userId: "",
      userName: null,
      seller: {},
      isLoading: true,
    };
  },
  components: {
    LoadingSpinner,
  },
  methods: {
    sendEmail() {
      // const email = 'haha@gmail.com';
      // const products =
      //   { name: 'Apple', price: '$10' }
      //   ;
      const seller = this.seller;
      const products = this.products;
      openEmailClient(seller, products);
    },

    increment() {
      if (this.selectedQuantity < this.products.quantity) {
        this.selectedQuantity++;
      }
    },

    decrement() {
      if (this.selectedQuantity > 1) {
        this.selectedQuantity--;
      }
    },

    checkPersonalProduct() {
      if (this.products && this.userId) {
        // Ensure both product and user are loaded
        this.ownProduct = this.products.seller_id === this.userId;
      }
      console.log("Own product:", this.ownProduct);
    },

    addToCart(productId) {
      let url = "http://127.0.0.1:8000/api/cart/add";
      console.log("Request url:" + url);
      axios
        .post(url, {
          product_id: productId,
          quantity: this.selectedQuantity,
        })
        .then((response) => {
          alert("產品已加入購物車！");
          console.log("加入購物車:", response.data);
        })
        .catch((error) => {
          console.error("加入購物車失敗:", error.response.data);
          alert(
            "加入購物車失敗: " + (error.response.data.message || error.message)
          );
          window.location.href = "http://127.0.0.1:8000/portal";
        });
    },

    fetchProductDetails() {
      const productId = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/products/?product_id=${productId}`)
        .then((response) => {
          this.products = response.data[0];
          this.products.image_url = this.baseUrl + this.products.image_url;
          this.fetchSellerDetails(this.products._id);
        })
        .catch((error) => {
          console.error("获取产品详情失败:", error);
          this.finishLoading(); // 即使出現錯誤也應結束加載
        });
    },

    fetchUserDetails() {
      let token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }
      const url = `http://localhost:8000/api/user`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.userId = response.data.user_id;
          this.checkPersonalProduct(); // Ensure user details are fetched before checking
        })
        .catch((error) => {
          console.error(
            "Error fetching user ID:",
            error.response ? error.response.data : "Unknown error"
          );
        });
    },

    fetchSellerDetails(productId) {
      const url = `http://localhost:8000/api/products/${productId}/seller`;
      console.log("Request url:", url);
      axios
        .get(url)
        .then((response) => {
          this.seller = response.data.seller;
          console.log("in ", this.seller);
          this.finishLoading();
        })
        .catch((error) => {
          console.error(
            "Error fetching product ID:",
            error.response ? error.response.data : "Unknown error"
          );
          this.finishLoading(); // 即使出現錯誤也應結束加載
        });
    },

    goToUpdateProduct(productId){
      this.$router.push({ name: "update", params: { id: productId } });
    },

    deleteProduct(productId) {
      let token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }
      let url = "http://localhost:8000/api/products/" + productId;
      console.log("Request url:" + url);
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert("成功下架商品");
          console.log("下架商品:", response);
          this.$router.push({ path: "/IndivMarket" });
        })
        .catch((error) => {
          console.error("下架商品失敗:", error.response.data);
        });
    },

    goToSeller(productId) {
      // this.$router.push({ name: "seller", params: { id: productId } });
      this.$router.push({ name: "sellerPage", params: { id: productId } });
    },

    finishLoading() {
      this.isLoading = false;
    },
  },

  created() {
    this.fetchUserDetails();
    this.fetchProductDetails();
    console.log("Product details:", this.products);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  padding-top: 3%;
}

.product-overview {
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 70%;
}

.product-image-wrapper {
  position: relative;
  width: 500px; /* Ensure this matches your image width */
  height: 500px; /* Ensure this matches your image height */
  border-radius: 15px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.product-image.shadowed {
  filter: grayscale(100%) brightness(50%);
  opacity: 0.5;
}

.sold-out-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); /* Darker overlay for better visibility */
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

@media (min-width: 992px) {
  .product-overview {
    flex-direction: row;
    align-items: flex-start;
  }
}

.product-image {
  width: 500px;
  height: 500px;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
}

.product-details {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  width: 40%
}

.product-header {
  display: flex;
  flex-direction: column;
}

.product-info {
  display: flex;
  justify-content: space-between;
  width: 100%; /* Ensure it spans the full width to allow space between elements */
}

.product-title {
  font-family: "Zen Old Mincho", sans-serif;
  font-size: 40px;
  font-weight: 500;
}

.product-tags {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Keeps items spaced out with price at the end */
  gap: 10px; /* Reduced gap specifically for tags, adjust as needed */
  font-size: 20px;
  padding-top: 16px;
  width: 100%; /* Ensures it spans the full width of its parent container */
}

.tag {
  flex-grow: 0; /* Prevents tags from stretching */
  background-color: #cfaf8d;
  padding: 8px 30px;
  border-radius: 30px;
}

.divider {
  border: 2px solid rgba(198, 159, 118, 1);
  background-color: #c69f76;
  height: 2px;
  margin: 14px 0 0 0;
}

.product-price {
  flex-grow: 1; /* Allows the price to push itself to the right */
  font-family: "Zen Old Mincho", sans-serif;
  font-weight: 600;
  font-size: 36px;
  text-align: right; /* Ensures text alignment to the right */
}

.product-description {
  margin-top: 20px;
  font-family: "Zen Old Mincho", sans-serif;
  font-size: 20px;
  font-weight: 400;
}

.description {
  margin-top: 20px;
}

.actions-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 25px;
  width: 80%;
  margin: 0 auto;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding-right: 5%;
}

.quantity-input {
  width: 40px;
  text-align: center;
  justify-content: center;
  margin: 0 10px;
  font-size: 20px;
  border: none;
}

.quantity-button {
  padding: 10px 15px;
  border-radius: 50%;
  background-color: #fff2d7;
  cursor: pointer;
  border: none;
  box-shadow: 1px 1px 1px #e2dbc9;
  font-size: 16px;
}

.staffInformation {
  flex: 1;
  background-color: #e2dbc9;
  border-radius: 25px;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-shadow: 2px 2px 3px #888888;
}

.sub-block {
  flex: 1;
  margin: 0 10px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  font-size: larger;
}

.product-actions {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
}

.add-to-cart {
  width: 30%;
  border: 1px solid #000;
  color: #000;
  text-align: center;
  justify-content: center;
  padding: 18px 26px;
  margin: 10px;
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  font-family: "Zen Old Mincho", sans-serif;
  font-size: 20px;
  font-weight: 550;
  cursor: pointer;
}

.sub-block:hover,
.add-to-cart:hover {
  background-color: #fbf6f0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
