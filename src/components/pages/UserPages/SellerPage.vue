<template>
  <LoadingSpinner v-if="isLoading"></LoadingSpinner>
  <div v-else class="container">
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
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ui/ProductCard.vue";
import LoadingSpinner from "@/components/layout/LoadingSpinner.vue";

export default {
  components: {
    ProductCard,
    LoadingSpinner,
  },
  data() {
    return {
      userName: null,
      rating_count: null,
      rating_score: null,
      products: [], // 初始化空数组
      isLoading: true,
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
      const sellerId = this.$route.params.id; // 获取路由参数中的seller id
      console.log("Seller ID:", sellerId); // 调试信息
      const url = `http://localhost:8000/api/products/${sellerId}/seller/products`;
      console.log("Request URL:", url); // 调试信息

      axios
        .get(url)
        .then((response) => {
          const { seller, products } = response.data;
          this.userName = seller.nickname;
          this.rating_count = seller.rating_count;
          this.rating_score = seller.rating_score;
          this.products = Array.isArray(products) ? products : []; // 确保 products 是数组
          this.finishLoading();
        })
        .catch((error) => {
          console.error(
            "Error fetching products:",
            error.response ? error.response.data : "Unknown error"
          );
          this.products = []; // 在出错时也确保 products 是数组
        });
    },

    goToProductDetails(productId) {
      this.$router.push({ name: "productdetail", params: { id: productId } });
    },

    finishLoading() {
      this.isLoading = false;
    },
  },
  mounted() {
    this.fetchProducts(); // 在组件挂载时获取产品信息
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
  justify-content: space-around;
  width: 80%;
  padding: 10px;
  margin: 0 auto;
}

.product {
  margin: 10px;
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
  box-sizing: border-box;
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
