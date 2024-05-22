<template>
  <div class="container">
    <h1>服裝</h1>
  </div>
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
      return this.products.map(product => ({
        ...product,
        image_url: `http://localhost:8000/storage/${product.image_url}`
      }));
    }
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      console.log("Route Query:", this.$route.query); // Debugging line

      const queryParams = new URLSearchParams(this.$route.query).toString();
      console.log("Query Params:", queryParams); // Debugging line

      let url = "http://127.0.0.1:8000/api/products/?sub_category=服裝";
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
  flex-wrap: wrap; /* Allows wrapping to the next row if there's not enough space */
  gap: 20px; /* Adds space between product cards */
}
</style>
