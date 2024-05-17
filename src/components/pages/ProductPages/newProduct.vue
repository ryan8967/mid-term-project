<template>
  <div class="product-form">
    <div class="form-group">
      <label>商品圖片</label>
      <!-- <button class="upload-button">新增圖片</button> -->
      <form>
        <input type="file" id="imageUpload" name="imageUpload" class="upload-button"/>
      </form>
    </div>
    <div class="form-group">
      <label>商品名稱</label>
      <input type="text" placeholder="請輸入..." />
    </div>
    <div class="form-group">
      <label>類別</label>
      <select>
        <option>請選擇...</option>
        <optgroup label="食品">食品</optgroup>
        <option value="泡麵">泡麵</option>
        <option value="零食">零食</option>
        <option value="生鮮">生鮮</option>
        <option value="熟食">熟食</option>
        <option value="飲品">飲品</option>
        <option value="冷凍食品">冷凍食品</option>
        <option value="罐頭/醬料">罐頭/醬料</option>
        <option value="食品">其他食品</option>

        <optgroup label="日常">日常</optgroup>
        <option value="家電">家電</option>
        <option value="服飾">服飾</option>
        <option value="衛生">衛生</option>
        <option value="裝飾">裝飾</option>
        <option value="日常">其他日常</option>

        <optgroup label="3C">3C</optgroup>
        <option value="行動裝置">行動裝置</option>
        <option value="電腦">電腦</option>
        <option value="周邊">周邊</option>
        <option value="相機">相機</option>
        <option value="3C">其他3C</option>

        <optgroup label="書店">書店</optgroup>
        <option value="教科書">教科書</option>
        <option value="小說">小說</option>
        <option value="知識/理財">知識/理財</option>
        <option value="文具">文具</option>
      </select>
    </div>
    <div class="form-group">
      <label>狀況</label>
      <input type="text" placeholder="請輸入新舊程度..." />
    </div>
    <div class="form-group">
      <label>售價</label>
      <input type="text" placeholder="請輸入..." />
    </div>
    <div class="form-group">
      <label>數量</label>
      <input type="text" placeholder="請輸入..." />
    </div>
    <div class="form-group">
      <label>詳細描述</label>
      <textarea placeholder="請輸入..."></textarea>
    </div>
    <div
      class="image-upload-row"
      v-for="(image, index) in images"
      :key="'image' + index"
    >
      <label class="input-label" :for="'imageUpload' + index"
        >上傳圖片 {{ index + 1 }}</label
      >
      <input
        type="file"
        :id="'imageUpload' + index"
        @change="handleFileUpload($event, index)"
      />
    </div>
    <div class="form-group">
      <button class="submit-button" @click="submitForm">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  data() {
    return {
      // Your data properties here
    };
  },
  methods: {
    // handleFileUpload(event, index) {

    // },
    submitForm() {
      console.log("Form submitted!");
    },
  },
};
</script>
<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: auto;
  font-family: Arial, sans-serif;
  padding-top: 30px;
}

.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px; /* Adds gap between form groups */
  gap: 40px; /* Adds gap between label and input within each form group */
}

.form-group label {
  width: 150px;
  padding: 16px;
  font-size: 18px;
  font-weight: 500;
  background-color: #fff2d7;
}

.form-group input,
.form-group select,
.form-group textarea {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 14px;
}

.upload-button {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.upload-button:hover {
  background-color: #e0e0e0;
}

.submit-button {
  padding: 16px 20px;
  background-color: #ebd5aa;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #f1d9a6;
}
</style>
