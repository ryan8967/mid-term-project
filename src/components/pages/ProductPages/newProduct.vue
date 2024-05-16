<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="color-block"><strong>商品圖片</strong></div>
      <div class="button-row">
        <button class="add-image-button" type="button" @click="addImageField">新增圖片</button>
      </div>
      <div class="form-row" v-for="(input, index) in formInputs" :key="index">
        <div class="input-title">{{ input.label }}</div>
        <input :id="input.id" v-model="input.value" :type="input.type" :placeholder="input.placeholder">
      </div>
      <div class="button-row">
        <button type="submit">提交</button>
      </div>
      <div class="image-upload-row" v-for="(image, index) in images" :key="'image' + index">
        <label :for="'imageUpload' + index">上傳圖片 {{ index + 1 }}</label>
        <input type="file" :id="'imageUpload' + index" @change="handleFileUpload($event, index)">
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
      formInputs: [
        
        { id: 'id_number', label: '商品名稱', value: '', type: 'text', placeholder: '請輸入...' },
        { id: 'department', label: '類別', value: '', type: 'text', placeholder: '請輸入...' },
        { id: 'position', label: '狀況', value: '', type: 'text', placeholder: '請輸入...(新舊程度)' },
        { id: 'phone', label: '售價', value: '', type: 'text', placeholder: '請輸入...' },
        { id: 'email', label: '數量', value: '', type: 'text', placeholder: '請輸入...' },
        { id: 'comments', label: '詳情描述', value: '', type: 'text', placeholder: '請輸入...' }
      ],
    };
  },
  methods: {
    handleSubmit() {
      // 處理提交邏輯
      console.log(this.formInputs);
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

<style scoped>
.color-block {
  width: 100px;
  height: 35px;
  background-color: #FFF2D7;
  position: absolute;
  top: 31%;
  left: 41.5%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin-bottom: 15px;
}

.add-image-button {
  display: flex;
  justify-content: left;
  margin: auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
}

.form-row, .image-upload-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-title {
  width: 100px;
  padding: 8px;
  background-color: #FFF2D7; /* 可根據需要修改顏色 */
  text-align: center;
  font-weight: bold;
  border: 2px solid #ccc;
  border-radius: 4px 0 0 4px;
}

input[type="text"],
textarea {
  flex: 1;
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 0 4px 4px 0;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.button-row {
  display: flex;
  justify-content: flex-end; /* 按鈕靠右對齊 */
}
</style>


/*{ id: 'name', label: '商品圖片', value: '', type: 'text', placeholder: '請输入...' },
{ id: 'id_number', label: '商品名稱', value: '', type: 'text', placeholder: '请输入...' },
{ id: 'department', label: '類別', value: '', type: 'text', placeholder: '请输入...' },
{ id: 'position', label: '狀況', value: '', type: 'text', placeholder: '请输入...(新舊程度)' },
{ id: 'phone', label: '售價', value: '', type: 'tel', placeholder: '请输入...' },
{ id: 'email', label: '數量', value: '', type: 'email', placeholder: '请输入...' },
{ id: 'comments', label: '詳情描述', value: '', type: 'textarea', placeholder: '请输入...' }*/