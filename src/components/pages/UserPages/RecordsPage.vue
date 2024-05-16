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
        <button class="appeal-button" @click="showComplaintForm = true">
          申訴
        </button>
      </div>
    </div>

    <div v-if="showComplaintForm" class="complaint-form-container">
      <div class="main-container">
        <section class="complaint-section">
          <header class="complaint-header">
            <h1 class="complaint-title">申訴原因</h1>
          </header>
          <form class="complaint-options">
            <label for="product-issue" class="checkbox-label">
              商品與實際不符
              <input
                type="checkbox"
                id="product-issue"
                name="complaint"
                class="checkbox-input"
              />
            </label>
            <label for="attitude-issue" class="checkbox-label">
              交易態度差
              <input
                type="checkbox"
                id="attitude-issue"
                name="complaint"
                class="checkbox-input"
              />
            </label>
            <label for="time-issue" class="checkbox-label">
              交易時間遲到
              <input
                type="checkbox"
                id="time-issue"
                name="complaint"
                class="checkbox-input"
              />
            </label>
            <label for="location-issue" class="checkbox-label">
              交易地點不符
              <input
                type="checkbox"
                id="location-issue"
                name="complaint"
                class="checkbox-input"
              />
            </label>
            <label for="other" class="checkbox-label">
              其他
              <input type="text" id="other" name="other" class="text-input" />
            </label>
          </form>
          <section class="action-buttons">
            <button class="cancel-button" @click="showComplaintForm = false">
              取消
            </button>
            <button class="submit-button">確認</button>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showComplaintForm: false,
    };
  },
};
</script>

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

.product-header {
  padding-left: 4%;
  display: flex;
  min-width: 100%;
  font-size: 24px;
  font-weight: 400;
}

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
  justify-content: space-between;
}

@media (max-width: 991px) {
  .product-item {
    flex-wrap: wrap;
  }
}

.product-name {
  font: 400 20px Zen Old Mincho, sans-serif;
}

.product-appeal {
  display: flex;
  font-size: 20px;
  font-weight: 500;
  justify-content: center;
  align-items: right;
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

.main-container {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ebd9b4;
  border-radius: 20px;
  padding: 24px;
}

.complaint-section {
  display: flex;
  flex-direction: column;
}

.complaint-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.complaint-title {
  font-family: Zen Old Mincho, sans-serif;
  font-size: 24px;
  color: #000;
  font-weight: 700;
}

.complaint-options {
  display: flex;
  font-size: 20px;
  font-weight: 400;
  flex-direction: column;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Zen Old Mincho, sans-serif;
  color: #000;
}

.text-input {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  width: 50%;
  margin-left: auto;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
}

.cancel-button,
.submit-button {
  font-family: Zen Old Mincho, sans-serif;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid rgba(198, 159, 118, 1);
  background-color: #fff;
  padding: 5px 20px;
}

.complaint-form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  max-height: 600px;
  width: 100%;
}
</style>
