<template>
  <form class="product-form" @submit.prevent="submitForm">
    <div class="form-group">
      <label>商品圖片</label>
      <!-- <button class="upload-button">新增圖片</button> -->
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          class="upload-button"
          @change="handleFileUpload"
          required
        />
    </div>
    <div class="form-group">
      <label>商品名稱</label>
      <input type="text" v-model="name" placeholder="請輸入..." required />
    </div>
    <div class="form-group">
      <label>主類別</label>
      <select v-model="mainCategory">
        <option>請選擇...</option>
        <option value="食品">食品</option>
        <option value="日常">日常</option>
        <option value="3C">3C</option>
        <option value="書店">書店</option>
      </select>
    </div>
    <div class="form-group" v-if="availableSubCategories.length">
      <label>副類別</label>
      <select v-model="selectedSubCategory">
        <!-- 不可提交空值 -->
        <option disabled value="">請選擇...</option>
        <option
          v-for="subCategory in availableSubCategories"
          :key="subCategory"
          :value="subCategory"
        >
          {{ subCategory }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label>狀況</label>
      <input
        type="text"
        v-model="condition"
        placeholder="請輸入新舊程度..."
        required
      />
    </div>
    <div class="form-group">
      <label>售價</label>
      <input type="number" v-model="price" placeholder="請輸入..." required />
    </div>
    <div class="form-group">
      <label>數量</label>
      <input
        type="number"
        v-model="quantity"
        placeholder="請輸入..."
        required
      />
    </div>
    <div class="form-group">
      <label>詳細描述</label>
      <textarea v-model="remarks" placeholder="請輸入..."></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="submit-button">上架</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
//設置default url
axios.defaults.baseURL = "http://localhost:8000/api";

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default {
  name: "ProductForm",
  data() {
    return {
      // Your data properties here
      imageUpload: null,
      name: "",
      mainCategory: "",
      subCategories: {
        食品: ["泡麵", "零食", "生鮮", "熟食", "飲品", "冷凍食品", "罐頭/醬料", "其他食品",],
        日常: ["家電", "服飾", "衛生", "裝飾", "其他日常"],
        "3C": ["行動裝置", "電腦", "周邊", "相機", "其他3C"],
        書店: ["教科書", "小說", "知識/理財", "文具"],
      },
      selectedSubCategory: "",
      //預設為空，即不會顯示副類別(於主類別未選擇時)
      availableSubCategories: [],
      condition: "",
      price: "",
      quantity: "",
      remarks: "",
      soldStatus: "In stock",
    };
  },
  watch: {
    mainCategory(newVal) {
      this.availableSubCategories = this.subCategories[newVal] || [];
      this.selectedSubCategory = ""; // Reset on main category change
    },
  },
  methods: {
    handleFileUpload(event) {
      this.imageUpload = event.target.files[0];
    },
    submitForm() {
      const formData = new FormData();

      formData.append("image_url", this.imageUpload);
      formData.append("name", this.name);
      formData.append("main_category", this.mainCategory);
      formData.append("sub_category", this.selectedSubCategory);
      formData.append("condition", this.condition);
      formData.append("price", this.price);
      formData.append("quantity", this.quantity);
      formData.append("remarks", this.remarks);
      formData.append("sold_status", this.soldStatus);

      axios.post('/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
          console.log("Product created:", response.data);
          alert("商品成功上架!");
        })
        .catch((error) => {
          console.error("Error creating product:", error.response);
          alert("商品上架失敗。");
        });
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
  /* margin-bottom: 20px; Adds gap between form groups */
  gap: 40px; /* Adds gap between label and input within each form group */
}

.form-group label {
  width: 150px;
  height: 80px;
  padding: 16px;
  font-size: 18px;
  font-weight: 500;
  justify-content: center;
  align-content: center;
  margin-bottom: 5px;
  background-color: #fff2d7;
  border-radius: 20px;
}

.form-group input,
.form-group select,
.form-group textarea {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 14px;
  margin-bottom: 10px;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

.submit-button {
  padding: 16px 20px;
  background-color: #ebd5aa;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 0;
}

.submit-button:hover {
  background-color: #f1d9a6;
}
</style>
