<template>
  <div class="container">
    <div class="top-section">
      <div class="label-content">
        <div class="label">
          <span>看看新品</span>
        </div>
      </div>
      <svg class="line" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          d="M0,50 C250,150 750,-50 1000,50"
          stroke="#6B4E40"
          stroke-width="2"
          fill="transparent"
        />
      </svg>
      <img src="@/assets/images/logo-img.png" alt="logo img" class="logo-img" />
    </div>
    <div class="devide-line"></div>
    <div class="bottom-section">
      <!-- <div><br><h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;～這～裡～放～商～品～</h2></div> -->
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
import ProductCard from "@/components/ui/ProductCard.vue"; // Ensure this path is correct
import axios from "axios";

export default {
  data() {
    return {
      products: [],
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

  components: {
    ProductCard, // Register the ProductCard component
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      const url = `http://localhost:8000/api/products`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          // Check if the returned data has more than 10 items
          if (data.length > 10) {
            // Slice the last 10 items
            this.products = data.slice(-10);
          } else {
            // If there are 10 or fewer items, use all of them
            this.products = data;
          }
        })
        .catch((error) => {
          console.log("Error fetching products:", error);
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
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: -2.5%;
}
.bottom-section {
  height: auto;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  margin-bottom: 3%;
  background-color: #fbf6f0;
}

.label-content {
  display: flex;
}

.label {
  width: 200px;
  height: 50px;
  clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
  background-color: #7b6d64;
  display: flex;
  align-items: center;
}

.label span {
  font-size: 25px;
  color: white;
  margin-left: 30px;
}

.label2 span {
  font-size: 25px;
  color: white;
  margin-left: 30px;
}

.line {
  justify-content: center;
  align-items: center;
  width: 61.5%;
  height: 50px;
  margin-left: -50px;
}

.logo-img {
  justify-content: center;
  align-items: center;
  width: 13%;
  height: auto;
  margin-left: -60px;

  transform: rotate(10deg);
}

.devide-line {
  width: 90%;
  height: 2.5px;
  background-color: #7b6d64;
  justify-content: center;
  align-items: center;
}

.label2 {
  width: 200px;
  height: 50px;
  clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
  background-color: #7b6d64;
  margin-left: 2.5%;
  margin-top: 2.5%;
  display: flex;
  align-items: center;
}

.car-container {
  display: flex;
  align-items: center;
}

.cuteCar-img {
  width: 100px;
  height: auto;
  margin-left: 2.5%;
}

.dashed-line {
  height: 0px;
  border-top: 2px dashed #7b6d64;
  width: 85%;
  align-items: center;
  margin-top: 30px;
}

.h2 {
  color: black;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Allows wrapping to the next row if there's not enough space */
  gap: 20px;
  /* Adds space between product cards */
  padding: 40px;
}
</style>
