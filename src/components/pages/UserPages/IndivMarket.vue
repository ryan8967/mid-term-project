<template>
  <div class="market-information">
    <div class="market-name">Cool Stuff</div>
    <div class="counts">交易次數:</div>
    <div class="rating">
      <img src="@/assets/images/Rating.png" alt="rating" />
    </div>
    <div class="chatroom">
      <a><img src="@/assets/images/chat.png" alt="Chatting room" />私訊</a>
    </div>
  </div>
  <div class="product-card-row">
    <ProductCard
      class="product"
      v-for="prod in products"
      :key="prod._id"
      :id="prod._id"
      :image_url="prod.image_url"
      :name="prod.name"
      :main_category="prod.main_category"
      :sub_category="prod.sub_category"
      :condition="prod.condition"
      :price="prod.price"
      :quantity="prod.quantity"
      :remarks="prod.remarks"
      @navigate="goToProductDetails"
    ></ProductCard>
  </div>
  <div class="market-menu">
    <router-link :to="{ path: '/newproduct' }"
      ><div class="actions">上架物品</div></router-link
    >
    <router-link :to="{ path: '/RecordsPage' }"
      ><div class="actions">交易紀錄/申訴</div></router-link
    >
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ui/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      userId: null, // Initialize userId to null
      products: [], // Initialize an empty array for products
    };
  },
  methods: {
    fetchUserId() {
      let token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }
      const url = `http://localhost:8000/user/?token=${encodeURIComponent(
        token
      )}`;
      console.log("Request URL:", token); // Debugging line

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.userId = response.data.user_id; // Extract user_id from the response
          console.log("response", response.data); // Debugging line
          console.log("User ID:", this.userId); // Debugging line
          this.fetchProducts();
        })
        .catch((error) => {
          console.error(
            "Error fetching user ID:",
            error.response ? error.response.data : "Unknown error"
          );
        });
    },

    fetchProducts() {
      if (!this.userId) return; // Ensure userId is available before making the request

      const url = `http://127.0.0.1:8000/api/products/?user_id=${this.userId}`;
      console.log("Request URL:", url); // Debugging line
      axios
        .get(url)
        .then((response) => {
          this.products = response.data; // Assign fetched products to the products array
          console.log("Products:", this.products); // Debugging line
        })
        .catch((error) => {
          console.error(
            "Error fetching products:",
            error.response ? error.response.data : "Unknown error"
          );
        });
    },

    goToProductDetails(productId) {
      this.$router.push({ name: "productdetail", params: { id: productId } });
    },
  },
  mounted() {
    this.fetchUserId(); // Fetch user ID when the component is mounted
  },
};
</script>

<style>
.market-information {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin: 20px auto;
  padding: 10px 10px;
  width: 80%;
  height: 80px;
  background-color: #ebd9b4;
  border-radius: 30px;
}

.market-name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  font-family: Inria Serif;
  font-size: 25px;
  font-weight: bold;
}

.counts {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 50px;
  border-radius: 30px;
  font-family: Zen Old Mincho;
  font-size: 25px;
  font-weight: bold;
}

.rating img {
  width: 250px;
  height: auto;
}

.chatroom {
  display: flex;
  width: 200px;
  height: 80%;
  background-color: white;
  align-items: center;
  justify-content: center;
  border: 3px solid #c69f76;
  border-radius: 30px;
  font-family: Zen Old Mincho;
  font-size: 28px;
  font-weight: bold;
}

.chatroom img {
  width: 35px;
  height: 80%;
}

.product-card-row {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  padding: 10px;
}

.product {
  margin: auto;
}

.market-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  flex-direction: row;
}

.market-menu .actions {
  margin: 20px 20px;
}

a {
  text-decoration: none;
  color: inherit;
  justify-content: center;
  align-items: center;
}
</style>
