<template>
  <div class="container">
    <h1>3C</h1>
  </div>
  <div class="products">
    <ProductCard v-for="prod in products" :key="prod._id" :id="prod._id" :image_url="prod.image_url" :name="prod.name"
      :main_category="prod.main_category" :sub_category="prod.sub_category" :condition="prod.condition"
      :price="prod.price" :quantity="prod.quantity" :remarks="prod.remarks" @navigate="goToProductDetails">
    </ProductCard>
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

  created() {
    // this.fetchProducts();
  },

  mounted() {
    // this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      // const queryParams = new URLSearchParams(this.$route.query);
      // console.log("Query Params:", queryParams);
      // console.log('Query:', this.query);

      // let url = `http://127.0.0.1:8000/api/products/?`+queryParams;
      let url = `http://127.0.0.1:8000/api/products/?main_category=3C`;
      console.log("Request URL:", url); // Debugging line

      axios
        .get(url)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log("Response Data:", this.products.data); // Debugging line
          console.log(error);
        });
    },
    goToProductDetails(productId) {
      this.$router.push({ name: "ProductDetails", params: { id: productId } });
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
.products {
  display: flex;
  flex-wrap: wrap;
  /* Allows wrapping to the next row if there's not enough space */
  gap: 20px;
  /* Adds space between product cards */
}
</style>
