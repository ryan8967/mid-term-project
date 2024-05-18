<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="container">
    <div class="product-overview">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7093d4bda2d68a620b8b4de4502f66d5320e50facc2f4139bd6455a4bc89aeb?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
        alt="Fender Stratocaster"
        class="product-image"
      />
      <section class="product-details">
        <div class="product-header">
          <div class="product-info">
            <h1 class="product-title">{{ product.name }}</h1>
          </div>
          <div class="product-tags">
            <span class="tag">{{ tag1 }}</span>
            <span class="tag">tag2</span>
            <span class="product-price">{{ product.price }}</span>
          </div>
        </div>
        <hr class="divider" />
        <div class="product-description">
          <p class="description">商品狀況: {{ product.condition }}</p>
          <p class="description">數量: {{ product.productNumber }}</p>
          <p class="description">詳情描述: {{ product.description }}</p>
        </div>
      </section>
    </div>
    <div class="actions-container">
      <div class="staffInformation">
        <div class="sub-block">COOL STUFF</div>
        <div class="sub-block">私訊</div>
      </div>
      <section class="product-actions">
        <button class="add-to-cart">加入購物車</button>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: [
    "id",
    "image",
    "title",
    "tag1",
    "tag2",
    "condition",
    "price",
    "quantity",
    "description",
  ],
  data() {
    return {
      product: {
        name: "Fender Stratocaster",
        price: "¥87,800",
        condition: "九成新",
        productNumber: 1,
        description:
          "Alder body with gloss finish, Three Player Series single-coil Stratocaster pickups, 'Modern C'-shaped neck profile",
        rating: 5,
      },
    };
  },
  methods: {
    addToCart() {
      alert("Added to cart!");
    },
    created() {
    const productId = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/products/${productId}`)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding-top: 3%;
}

.product-overview {
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 70%;
}

@media (min-width: 992px) {
  .product-overview {
    flex-direction: row;
    align-items: flex-start;
  }
}

.product-image {
  width: 500px;
  height: 500px;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
}

.product-details {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
}

.product-header {
  display: flex;
  flex-direction: column;
}

.product-info {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.product-title {
  font-family: "Zen Old Mincho", sans-serif;
  font-size: 40px;
  font-weight: 500;
}

.product-tags {
  display: flex;
  margin-top: 25px;
  gap: 20px;
  font-size: 20px;
}

.tag {
  font-family: "Zen Old Mincho", sans-serif;
  border-radius: 30px;
  background-color: #cfaf8d;
  padding: 7px 30px;
}

.divider {
  border: 2px solid rgba(198, 159, 118, 1);
  background-color: #c69f76;
  height: 2px;
  margin: 14px 0 0 0;
}

.product-price {
  font-family: "Zen Old Mincho", sans-serif;
  font-weight: 600;
  font-size: 36px;
}

.product-description {
  margin-top: 23px;
  font-family: "Zen Old Mincho", sans-serif;
  font-size: 25px;
  font-weight: 400;
}
.description{
  margin-top: 16px;

}

.actions-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
}

.staffInformation {
  flex: 1;
  background-color: #e2dbc9;
  border-radius: 25px;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-shadow: 2px 2px 3px #888888;
}

.sub-block {
  flex: 1;
  margin: 0 10px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  font-size: larger;
}

.product-actions {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}

.add-to-cart {
  border: 1px solid #000;
  color: #000;
  text-align: center;
  justify-content: center;
  padding: 18px 26px;
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  font-family: "Zen Old Mincho", sans-serif;
  font-size: 20px;
  font-weight: 550;
}
</style>
