<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="product-details">
    <div class="product-header">
      <div class="product-title">商品名稱</div>
      <div class="product-info">
        <div class="product-seller">商家</div>
        <div class="product-meta">
          <div class="product-quantity">數量</div>
          <div class="product-price">價格</div>
          <div class="product-subtotal">小計</div>
          <div class="product-date">交易日期</div>
        </div>
      </div>
    </div>
    <div class="product-separator"></div>
    <div class="product-item">
      <div class="product-name">最新C語言：程式設計實例入門Ｉ博碩文化出版</div>
      <div class="product-appeal">
        <button class="appeal-button">申訴</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-details {
  font-size: small;
  padding: 8px;
  margin: 16px;
  border-radius: 50px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  color: #000;
  padding: 30px 20px 40px 10px;
}

/* @media (max-width: 991px) {
  .product-details {
    padding: 73px 20px;
  }
} */

.product-header {
  padding-left: 4%;
  display: flex;
  min-width: 100%;
  font-size: 24px;
  font-weight: 400;
}

/* @media (max-width: 991px) {
  .product-header {
    flex-wrap: wrap;
  }
} */

.product-title {
  font-family: Zen Old Mincho, sans-serif;
  flex-grow: 1;
  max-width: 45%;
}

.product-info {
  display: flex;
  gap: 200px;
  padding-right: 8%;
}

@media (max-width: 991px) {
  .product-info {
    flex-wrap: wrap;
  }
}

.product-seller {
  font-family: Zen Old Mincho, sans-serif;
  margin: auto 0;
}

.product-meta {
  display: flex;
  gap: 50px;
  justify-content: space-between;
  text-align: right;
  /* flex-grow: 1; */
}

@media (max-width: 991px) {
  .product-meta {
    flex-wrap: wrap;
  }
}

.product-quantity,
.product-price,
.product-subtotal,
.product-date {
  font-family: Zen Old Mincho, sans-serif;
}

.product-separator {
  border-top: 1px solid #000;
  background-color: #000;
  margin-top: 13px;
  height: 1px;
}

.product-item {
  align-self: center;
  display: flex;
  margin-top: 30px;
  padding: 0 16px;
  width: 100%;
  justify-content: space-between; /* Ensures space is distributed between children */
}

@media (max-width: 991px) {
  .product-item {
    flex-wrap: wrap;
  }
}

.product-name {
  /* flex-grow: 1; */
  font: 400 20px Zen Old Mincho, sans-serif;
}

.product-appeal {
  display: flex;
  font-size: 20px;
  font-weight: 500;
  justify-content: center; /* Centers button within the appeal div */
  align-items: right; /* Vertically centers the content */
}

.appeal-button {
  font-family: Zen Old Mincho, sans-serif;
  border-radius: 30px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 3px solid #c69f76;
  background-color: #fff;
  justify-content: center;
  padding: 10px 20px;
  cursor: pointer;
}

@media (max-width: 991px) {
  .appeal-button {
    padding: 11px 20px;
  }
}

.product-image {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: 19px;
}
</style>
