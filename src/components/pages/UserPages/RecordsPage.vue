<!-- eslint-disable vue/no-parsing-error -->
<template>
  <section class="product_record">
    <div class="title">買家紀錄</div>
    <div class="product-details">
      <table class="product-table">
        <thead>
          <tr>
            <th class="name">商品名稱</th>
            <th class="seller">商家</th>
            <th class="quantity">數量</th>
            <th class="price">價格</th>
            <th class="total">小計</th>
            <th class="date">完成日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in Bought_records" :key="order._id">
            <td>{{ order.product_name }}</td>
            <td>{{ order.seller_name }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.subtotal }}</td>
            <td>{{ new Date(order.created_at).toLocaleString() }}</td>
            <td>
              <button class="appeal-button" @click="sendEmail(order)">
                聯絡
              </button>
            </td>
            <td>
              <button class="appeal-button" @click="openComplaintForm(order)">
                申訴
              </button>
            </td>
          </tr>
        </tbody>
      </table>

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
              <button class="submit-button" @click="submitComplaint">
                確認
              </button>
            </section>
          </section>
        </div>
      </div>
    </div>
    <div class="title">賣家紀錄</div>
    <div class="product-details">
      <table class="product-table">
        <thead>
          <th class="name">商品名稱</th>
          <th class="seller">商家</th>
          <th class="quantity">數量</th>
          <th class="price">價格</th>
          <th class="total">小計</th>
          <th class="date">完成日期</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="order in Sold_records" :key="order._id">
            <td>{{ order.product_name }}</td>
            <td>{{ order.seller_name }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.subtotal }}</td>
            <td>{{ new Date(order.created_at).toLocaleString() }}</td>
            <td>
              <button class="appeal-button" @click="sendEmail(order)">
                聯絡
              </button>
            </td>
            <td>
              <button class="appeal-button" @click="openComplaintForm(order)">
                申訴
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { openEmailClient } from "@/utils/emailUtils.js";

export default {
  data() {
    return {
      Bought_records: [],
      Sold_records: [],
      showComplaintForm: false,
      complaint: {
        orderId: null,
        product_issue: false,
        attitude_issue: false,
        time_issue: false,
        location_issue: false,
        other: "",
      },
      user: [],
    };
  },
  methods: {
    async sendEmail(product) {
      // let seller = this.fetchSellerDetails(product.product_id);
      const seller = await this.fetchSellerDetails(product.product_id);
      // const user = await this.fetchUserDetails();
      const user = this.user;
      if (!seller) {
        console.error("No seller found for product:", product);
        return;
      }
      if (!user) {
        console.error("No user found for email:", user);
        return;
      }
      openEmailClient(seller, product, user);
    },

    fetchRecords() {
      const token = localStorage.getItem("jwtToken");
      axios
        .get("http://127.0.0.1:8000/api/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Filter orders to include only those with status "訂購"
          this.Bought_records = response.data.buyer_orders;
          this.Sold_records = response.data.seller_orders;
          this.Bought_records.filter(
            (Bought_records) => Bought_records.status === "完成"
          );
          this.Sold_records.filter(
            (Sold_records) => Sold_records.status === "完成"
          );
        })
        .catch((error) => {
          console.error("Error fetching records:", error);
        });
    },

    async fetchUserDetails() {
      let token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }
      const url = `http://localhost:8000/api/user`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.user = response.data;
          // this.checkPersonalProduct(); // Ensure user details are fetched before checking
          console.log("User details:", this.user);
          // return response.data;
          return this.user;
        })
        .catch((error) => {
          console.error(
            "Error fetching user ID:",
            error.response ? error.response.data : "Unknown error"
          );
        });
    },

    async fetchSellerDetails(productId) {
      const url = `http://localhost:8000/api/products/${productId}/seller`;
      console.log("Request url:", url);
      try {
        const response = await axios.get(url);
        const seller = response.data.seller;
        console.log("in ", seller);
        return seller;
      } catch (error) {
        console.error(
          "Error fetching product ID:",
          error.response ? error.response.data : "Unknown error"
        );
        return null;
      }
    },

    openComplaintForm(order) {
      this.complaint.orderId = order._id;
      this.showComplaintForm = true;
    },

    closeComplaintForm() {
      this.showComplaintForm = false;
      this.resetComplaintForm();
    },

    resetComplaintForm() {
      this.complaint = {
        orderId: null,
        product_issue: false,
        attitude_issue: false,
        time_issue: false,
        location_issue: false,
        other: "",
      };
    },

    submitComplaint() {
      const token = localStorage.getItem("jwtToken");
      axios
        .put(
          `http://127.0.0.1:8000/api/orders/${this.complaint.orderId}`,
          {
            complaint: this.complaint,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          alert("申訴提交成功");
          console.log("Complaint submitted:", response.data);
          this.closeComplaintForm();
        })
        .catch((error) => {
          console.error("Error submitting complaint:", error);
          alert("申訴提交失敗");
        });
    },
  },
  created() {
    this.fetchRecords();
    this.fetchUserDetails();
  },
};
</script>

<style scoped>
.product-details {
  font-size: small;
  padding: 8px;
  margin: 16px;
  border-radius: 10px;
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
  width: 100%;
  font-size: 24px;
  font-weight: 400;
  justify-content: space-between;
  align-items: center;
}

.title {
  padding: 10px;
  font-size: 30px;
  font-weight: 600;
}

.product-title {
  font-family: Zen Old Mincho, sans-serif;
  flex: 1;
}

.product-info {
  display: flex;
  flex: 2;
  justify-content: space-between;
  gap: 20px;
}

.product-seller {
  font-family: Zen Old Mincho, sans-serif;
  margin: auto 0;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  text-align: right;
  flex-wrap: wrap;
}

.product-quantity,
.product-price,
.product-subtotal,
.product-date {
  font-family: Zen Old Mincho, sans-serif;
  text-align: center;
}

.product-separator {
  border-top: 1px solid #000;
  background-color: #000;
  margin-top: 13px;
  height: 1px;
  width: 100%;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 0 16px;
  width: 100%;
  flex-wrap: wrap;
}

.product-name {
  font: 400 20px Zen Old Mincho, sans-serif;
  flex: 1;
}

.product-appeal {
  display: flex;
  font-size: 20px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
}

.appeal-button {
  font-family: Zen Old Mincho, sans-serif;
  border-radius: 30px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 3px solid #c69f76;
  background-color: #fff;
  padding: 10px 20px;
  cursor: pointer;
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

/* 表格樣式 */
.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table td,
.product-table th {
  font: 25px Zen Old Mincho, sans-serif;
  color: gray;
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.name{
  width: 25%;
}
.seller{
  width: 20%;
}
.quantity{
  width: 5%;
}
.price{
  width: 5%;
}
.product-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.rating-container {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.confirm-transaction-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  color: white;
  background-color: #4caf50; /* Green background */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-transaction-button:hover {
  background-color: #45a049; /* Darker green */
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
  border-radius: 10px;
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
