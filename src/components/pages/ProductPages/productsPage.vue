<template>
  <div class="container">
    <h1>New Products</h1>
  </div>
  <div class="products">
    <ProductCard
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

  props: {
    query: {
      default: "", // Provide a default value if needed
    },
  },

  components: {
    ProductCard,
  },

  created() {
    this.fetchProducts();
    console.log(this.query);
  },

  methods: {
    fetchProducts() {
      const queryParams = new URLSearchParams(this.$route.query).toString();
      const url = `http://127.0.0.1:8000/api/products/?${queryParams}`;
      console.log(url);
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
      this.$router.push({ name: "ProductDetails", params: { id: productId } });
    },
  },

  watch: {
    // Watch for changes in route query parameters and refetch products
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


<style scoped>
.products {
  display: flex;
  flex-wrap: wrap; /* Allows wrapping to the next row if there's not enough space */
  gap: 20px; /* Adds space between product cards */
}
</style>
