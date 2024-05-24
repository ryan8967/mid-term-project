<template>
  <div class="container">
    <div class="top-section">
      <div class="label-content">
        <div class="label">
          <span>3C/周邊</span>
        </div>
      </div>
      <svg class="line" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M0,50 C250,150 750,-50 1000,50" stroke="#6B4E40" stroke-width="2" fill="transparent" />
      </svg>
      <img src="@/assets/images/logo-img.png" alt="logo img" class="logo-img"/>
    </div>
    <div class="devide-line"></div>
    <div class="bottom-section">
      <div class="label-content">
        <div class="label2">
          <span>新品特區</span>
        </div>
      </div>
      <div><br><h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;～這～裡～放～商～品～</h2></div>
      <div class="car-container">
        <img src="@/assets/images/cutecar.png" alt="car img" class="cuteCar-img" />
        <div class="dashed-line"></div>
      </div>
      <div><h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;～這～裡～也～放～商～品～</h2><br></div>
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

  components: {
    ProductCard, // Register the ProductCard component
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
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      console.log("Route Query:", this.$route.query); // Debugging line

      const queryParams = new URLSearchParams(this.$route.query).toString();
      console.log("Query Params:", queryParams); // Debugging line

      let url = "http://127.0.0.1:8000/api/products/?sub_category=周邊";
      console.log("Request URL:", url); // Debugging line

      axios
        .get(url)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToProductDetails(productId) {
      this.$router.push({ name: "productdetail", params: { id: productId } });
    },
    generatePath(path, props) {
      if (props && props.query) {
        return {
          path: path,
          query: props.query,
        };
      }
      return path;
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
  width: 85%;
  justify-content: center; 
  align-items: center;
  margin-top: 3%;
  margin-bottom: 3%;
  background-color: #FBF6F0;
}

.label-content {
  display: flex;
}

.label {
  width:200px;
  height:50px;
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

.line{
  justify-content: center; 
  align-items: center; 
  width:61.5%;
  height:50px;
  margin-left: -50px;
}

.logo-img{
  justify-content: center; 
  align-items: center; 
  width:13%;
  height:auto;
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
  width:200px;
  height:50px;
  clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
  background-color: #7b6d64;
  margin-left: 2.5%;
  margin-top:2.5% ;
  display: flex;
  align-items: center; 
  }

  .car-container{
    display: flex;
    align-items: center;
  }

  .cuteCar-img{
    width:100px;
    height:auto;
    margin-left: 2.5%;
  }

  .dashed-line {
    height: 0px;
    border-top: 2px dashed  #7b6d64;
    width: 85%;
    align-items: center; 
    margin-top: 30px;
    }

.h2{
  color: black;
}

.products {
  display: flex;
  flex-wrap: wrap;
  /* Allows wrapping to the next row if there's not enough space */
  gap: 20px;
  /* Adds space between product cards */
}
</style>
