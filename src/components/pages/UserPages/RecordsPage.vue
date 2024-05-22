<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="product-details">
    <table class="product-table">
      <thead>
        <tr>
          <th>商品名稱</th>
          <th>商家</th>
          <th>數量</th>
          <th>價格</th>
          <th>小計</th>
          <th>交易日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.product_name }}</td>
          <td>{{ order.seller_name }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.price }}</td>
          <td>{{ order.subtotal }}</td>
          <td>{{ new Date(order.created_at).toLocaleString() }}</td>
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
            <button class="submit-button" @click="submitComplaint">確認</button>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      showComplaintForm: false,
      complaint: {
        orderId: null,
        product_issue: false,
        attitude_issue: false,
        time_issue: false,
        location_issue: false,
        other: "",
      },
    };
  },
  methods: {
    fetchOrders() {
      const token = localStorage.getItem("jwtToken");
      axios
        .get("http://127.0.0.1:8000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
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
    this.fetchOrders();
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
