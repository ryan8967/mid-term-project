<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit">
        <div class="form-row" v-for="(input, index) in formInputs" :key="index">
          <label :for="input.id">{{ input.label }}</label>
          <input :id="input.id" v-model="input.value" :type="input.type" :placeholder="input.placeholder">
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomForm',
    data() {
      return {
        formInputs: [
          { id: 'name', label: '姓名', value: '', type: 'text', placeholder: '请输入...' },
          { id: 'id_number', label: '证件编号', value: '', type: 'text', placeholder: '请输入...' },
          { id: 'department', label: '部门', value: '', type: 'text', placeholder: '请输入...' },
          { id: 'position', label: '职位', value: '', type: 'text', placeholder: '请输入...(职位类别)' },
          { id: 'phone', label: '联系电话', value: '', type: 'tel', placeholder: '请输入...' },
          { id: 'email', label: '邮箱', value: '', type: 'email', placeholder: '请输入...' },
          { id: 'comments', label: '评论建议', value: '', type: 'textarea', placeholder: '请输入...' }
        ]
      };
    },
    methods: {
      handleSubmit() {
        // Submit form logic
        console.log("Form data:", this.formInputs);
        alert("Form submitted!");
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .form-row {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="tel"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  