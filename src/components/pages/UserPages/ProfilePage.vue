<template>
  <LoadingSpinner v-if="isLoading"></LoadingSpinner>
  <div v-else class="profile-container">
    <div class="profile-card">
      <div class="info">
        <label>暱稱</label><span>{{ account.nickname }}</span>
      </div>
      <div class="info">
        <label>姓名</label><span>{{ account.chineseName }}</span>
      </div>
      <div class="info">
        <label>學號</label><span>{{ account.studentId }}</span>
      </div>
      <div class="info">
        <label>信箱</label><span>{{ account.email }}</span>
      </div>
      <div class="info">
        <label>電話</label><span>{{ account.mobilePhone }}</span>
      </div>
    </div>
    <div class="menu">
      <div class="actions" @click="showEditNickname = true">修改暱稱</div>
      <router-link :to="{ path: '/records' }"
        ><div class="actions">買賣紀錄/申訴</div></router-link
      >
      <router-link :to="{ path: '/newproduct' }"
        ><div class="actions">上架物品</div></router-link
      >
      <router-link :to="{ path: '/IndivMarket' }"
        ><div class="actions">個人商場</div></router-link
      >
    </div>
    <div v-if="showEditNickname" class="nickname-form">
      <input v-model="editNickname" placeholder="輸入新的暱稱" />
      <div>
        <button @click="showEditNickname = false" class="cancel-button">
          取消
        </button>
        <button @click="updateNickname" class="submit-button">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingSpinner from "@/components/layout/LoadingSpinner.vue";

export default {
  data() {
    return {
      account: {},
      editNickname: "", // 綁定表單的暱稱
      showEditNickname: false, // 控制表單顯示的變量
      isLoading: true,
    };
  },

  components: {
    LoadingSpinner,
  },

  methods: {
    updateNickname() {
      let token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }
      const url = `http://localhost:8000/user`; // 調整為你的 API 端點
      axios
        .put(
          url,
          {
            nickname: this.editNickname,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("暱稱更新成功:", response);
          this.account.nickname = this.editNickname; // 更新本地顯示的暱稱
          this.showEditNickname = false; // 關閉表單
        })
        .catch((error) => {
          console.error("更新暱稱失敗:", error);
        });
    },
    finishLoading() {
      this.isLoading = false;
    },
  },
  mounted() {
    {
      let token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }
      const url = `http://localhost:8000/api/user`;

      console.log("token", token); // Debugging line
      console.log("Request URL:", url); // Debugging line

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.account = response.data; // Extract user_id from the response
          console.log("response", response.data); // Debugging line
          this.finishLoading();
        })
        .catch((error) => {
          console.error(
            "Error fetching user ID:",
            error.response ? error.response.data : "Unknown error"
          );
        });
    }
  },
};
</script>

<style scoped>
.profile-container {
  display: flex; /* 使用flex布局 */
  justify-content: space-between; /* 兩個子元素之間保持距離 */
  align-items: center; /* 讓子元素從頂部開始對齊 */
  width: 70%; /* 調整容器寬度以適應內容 */
  max-width: 1200px; /* 可設定最大寬度 */
  padding: 20px;
  margin: 50px auto;
}

.profile-card {
  padding: 20px;
  justify-content: center;
  background-color: #ebd9b4;
  border-radius: 30px;
}

.info {
  display: flex;
  width: 500px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 25px;
}

.info label {
  font-weight: bold;
}

.menu {
  display: flex; /* 使用 Flexbox 來布局 */
  align-items: center;
  flex-direction: column;
  gap: 16px;
  width: 100%; /* 確保容器寬度適應父元素 */
  padding: 20px;
}

.actions {
  display: flex;
  width: 150px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  font-weight: bold;
  border: 2px solid #c69f76;
  border-radius: 30px;
  padding: 16px 18px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box; /* 包括邊框和內距在內的寬度 */
  box-shadow: 3px 3px 3px gray;
}

.actions:hover {
  background-color: #fbf6f0;
}

.nickname-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* 設定一個適中的寬度 */
}

.nickname-form input {
  padding: 10px;
  width: 80%;
  border: 2px solid #c69f76;
  border-radius: 20px;
  transition: border-color 0.3s;
}

.nickname-form input:focus {
  border-color: #a67358;
}

.cancel-button,
.submit-button {
  font-family: Zen Old Mincho, sans-serif;
  border-radius: 10px;
  border: 2px solid rgba(198, 159, 118, 1);
  background-color: #fff;
  padding: 5px 20px;
  cursor: pointer;
  flex-grow: 1; /* 使兩個按鈕能夠均分容器寬度 */
  margin: 5px; /* 為按鈕之間提供間隔 */
}

a {
  text-decoration: none;
  color: inherit;
  justify-content: center;
  align-items: center;
}
</style>
