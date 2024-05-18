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
      type: String,
      required: true,
      default: "", // Provide a default value if needed
    },
  },

  components: {
    ProductCard,
  },

  created() {
    axios
      .get(`http://127.0.0.1:8000/api/products/${this.query}`)
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goToProductDetails(productId) {
      this.$router.push({ name: "ProductDetails", params: { id: productId } });
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
