<template>
  <div class="container">
    <h1>新品上市</h1>
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

  computed: {
    formattedProducts() {
      return this.products.map(product => ({
        ...product,
        image_url: `http://localhost:8000/storage/${product.image_url}`
      }));
    }
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
        console.log('Error fetching products:', error);
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
  flex-wrap: wrap;
  /* Allows wrapping to the next row if there's not enough space */
  gap: 20px;
  /* Adds space between product cards */
}
</style>