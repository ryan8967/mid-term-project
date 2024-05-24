<template>
  <div class="container">
    <div class="top-section">
      <div class="label-content">
        <div class="label"></div>
      </div>
      <svg class="line" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M0,50 C250,150 750,-50 1000,50" stroke="#6B4E40" stroke-width="2" fill="transparent" />
      </svg>
      <img src="@/assets/images/logo-img.png" alt="logo img" class="logo-img"/>
    </div>
    <div class="devide-line"></div>
    <div class="bottom-section">
      <div class="products">
        <ProductCard
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
  </div>
</template>
<script>
import ProductCard from "@/components/ui/ProductCard.vue";
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },

  components: {
    ProductCard,
  },

  computed: {
    formattedProducts() {
      return this.products.map((product) => ({
        ...product,
        image_url: `http://localhost:8000/storage/${product.image_url}`,
      }));
    },
  },

  created() {
    console.log("ThreeCPage created"); // Debugging line
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      const queryParams = new URLSearchParams(this.$route.query);
      console.log("Query Params:", queryParams);
      let url = `http://127.0.0.1:8000/api/products/?main_category=3C`;
      console.log("Request URL:", url); // Debugging line

      axios
        .get(url)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
    goToProductDetails(productId) {
      this.$router.push({ name: "productdetail", params: { id: productId } });
    },
  },

  watch: {
    "$route.query": {
      handler() {
        this.fetchProducts();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  height: 100%;
}

.top-section {
  display: flex;
  height: 40%;
  width: 80%;
  margin-top: 8%;
  margin-left: 10%;
  margin-bottom: -20px;
}
.bottom-section {
  height: 200px;
  width: 80%;
  justify-content: center; 
  align-items: center;
  margin-top: 3%;
  background-color: #FBF6F0;
  /*border: 2px solid black;*/
}
.label-content {
  display: flex;
  justify-content: center;
}
.label {
  justify-content: center; 
  align-items: center; 
  width:200px;
  height:50px;
  clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
  background-color: #7b6d64;
  }

.line{
  justify-content: center; 
  align-items: center; 
  width:800px;
  height:50px;
  margin-left: -50px;
}

.logo-img{
  justify-content: center; 
  align-items: center; 
  width:200px;
  height:auto;
  margin-left: -60px;
  margin-top:-70px;
  margin-bottom:-20px;
}

.devide-line {
  width: 85%; 
  height: 2.5px; 
  background-color: #7b6d64;
  justify-content: center;
  align-items: center; 
}


.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}


</style>

