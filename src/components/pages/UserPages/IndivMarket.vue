<template>
  <div class="market-information">
    <div class="market-name">{{ userName }}</div>
    <div class="counts">交易次數: {{ rating_count }}</div>
    <div class="rating">
      <div>{{ rating_score }}</div>
      <img src="@/assets/images/Rating.png" alt="rating" />
    </div>
  </div>
  <div class="product-card-row">
    <ProductCard
      class="product"
      v-for="prod in formattedProducts"
      :key="prod._id"
      :id="prod._id"
      :image="prod.image_url"
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
    <router-link :to="{ path: '/newproduct' }">
      <div class="actions">上架物品</div>
    </router-link>
    <router-link :to="{ path: '/RecordsPage' }">
      <div class="actions">交易紀錄/申訴</div>
    </router-link>
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
      userName: null, // Initialize userId to null
      rating_count: null,
      rating_score: null,
      products: [], // Initialize an empty array for products
    };
  },
  computed: {
    formattedProducts() {
      return this.products.map((product) => ({
        ...product,
        image_url: `http://localhost:8000/storage/${product.image_url}`,
      }));
    },
  },
  methods: {
    fetchProducts() {
      let token = localStorage.getItem("jwtToken");
      const url = `http://127.0.0.1:8000/api/myproducts`;
      console.log("Request URL:", url); // Debugging line

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.products = response.data; // Assign fetched products to the products array
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
    this.fetchProducts(); // Fetch user ID when the component is mounted
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
        this.userName = response.data.chineseName; // Extract user_id from the response
        this.rating_count = response.data.rating_count;
        this.rating_score = response.data.rating_score;
      })
      .catch((error) => {
        console.error(
          "Error fetching user ID:",
          error.response ? error.response.data : "Unknown error"
        );
      });
  },
};
</script>

<style scoped>
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

.rating {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating div {
  margin-right: 10px;
  font-family: Zen Old Mincho;
  font-size: 25px;
  font-weight: bold;
}

.rating img {
  width: 80px;
  height: auto;
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
  display: flex;
  width: 150px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 2px solid #c69f76;
  border-radius: 30px;
  padding: 16px 18px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 30px;
  box-sizing: border-box; /* 包括邊框和內距在內的寬度 */
  box-shadow: 3px 3px 3px gray;
  margin: 20px;
}

a {
  text-decoration: none;
  color: inherit;
  justify-content: center;
  align-items: center;
}


</style>
