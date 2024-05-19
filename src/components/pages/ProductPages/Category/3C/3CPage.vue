<template>
  <div class="container">
    <h1>3C 用品都在這</h1>
  </div>
  <div class="products">
    <ProductCard v-for="prod in products" :key="prod._id" :id="prod._id" :image_url="prod.image_url" :name="prod.name"
      :main_category="prod.main_category" :sub_category="prod.sub_category" :condition="prod.condition"
      :price="prod.price" :quantity="prod.quantity" :remarks="prod.remarks" @navigate="goToProductDetails">
    </ProductCard>
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

  created() {
    console.log("ThreeCPage created"); // Debugging line
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      const queryParams = new URLSearchParams(this.$route.query);
      console.log("Query Params:", queryParams);
      let url = `http://127.0.0.1:8000/api/products/?${queryParams}`;
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
      this.$router.push({ name: "ProductDetails", params: { id: productId } });
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
  gap: 20px;
}
</style>
