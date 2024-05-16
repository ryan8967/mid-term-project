<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <label class="input-label">商品圖片</label>
        <button type="button" @click="addImageField">新增圖片</button>
      </div>
      <div class="form-row" v-for="(input, index) in formInputs" :key="index">
        <label class="input-label" :for="input.id">{{ input.label }}</label>
        <input :id="input.id" v-model="input.value" :type="input.type" :placeholder="input.placeholder">
      </div>
      <div class="form-row">
        <label class="input-label" for="description">詳情描述</label>
        <textarea id="description" v-model="description" placeholder="請輸入..."></textarea>
      </div>
      <div class="image-upload-row" v-for="(image, index) in images" :key="'image' + index">
        <label class="input-label" :for="'imageUpload' + index">上傳圖片 {{ index + 1 }}</label>
        <input type="file" :id="'imageUpload' + index" @change="handleFileUpload($event, index)">
      </div>
      <div class="button-row">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CustomForm',
  data() {
    return {
      images: [],
      description: '',
      formInputs: [
        { id: 'product-name', label: '商品名稱', value: '', type: 'text', placeholder: '請輸入...' },
        { id: 'category', label: '類別', value: '', type: 'text', placeholder: '請選擇...' },
        { id: 'condition', label: '狀況', value: '', type: 'text', placeholder: '請輸入...(新舊程度)' },
        { id: 'price', label: '售價', value: '', type: 'text', placeholder: '請輸入...' },
        { id: 'quantity', label: '數量', value: '', type: 'text', placeholder: '請輸入...' },
      ],
    };
  },
  methods: {
    handleSubmit() {
      // 處理提交邏輯
      console.log(this.formInputs);
      console.log(this.description);
      console.log(this.images);
    },
    handleFileUpload(event, index) {
      const file = event.target.files[0];
      this.$set(this.images, index, file);
    },
    addImageField() {
      this.images.push(null);  // 推入一個新的空位置到 images 陣列
    }
  }
};
</script>


<!-- css -->
<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-row,
.image-upload-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-label {
  width: 100px; /* 你可以根据需要调整宽度 */
  margin-right: 10px;
  font-weight: bold;
}

input[type="text"],
input[type="file"],
textarea,
button {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  height: 80px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 20px;
}

button:hover {
  background-color: #0056b3;
}

.button-row {
  display: flex;
  justify-content: flex-end;
}
</style>


/*{ id: 'name', label: '商品圖片', value: '', type: 'text', placeholder:
'請输入...' }, { id: 'id_number', label: '商品名稱', value: '', type: 'text',
placeholder: '请输入...' }, { id: 'department', label: '類別', value: '', type:
'text', placeholder: '请输入...' }, { id: 'position', label: '狀況', value: '',
type: 'text', placeholder: '请输入...(新舊程度)' }, { id: 'phone', label:
'售價', value: '', type: 'tel', placeholder: '请输入...' }, { id: 'email',
label: '數量', value: '', type: 'email', placeholder: '请输入...' }, { id:
'comments', label: '詳情描述', value: '', type: 'textarea', placeholder:
'请输入...' }*/
