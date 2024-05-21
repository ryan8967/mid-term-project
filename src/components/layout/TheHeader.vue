<!-- eslint-disable vue/no-parsing-error -->
<template>
  <header class="header">
    <div class="logo-container">
      <img src="../../assets/images/Logo.png" alt="Logo" class="logo-icon" />
      <h1 class="logo">
        <router-link to="/home">NCU二手物交易網</router-link>
      </h1>
    </div>
    <nav class="nav">
      <div class="search">
        <form @submit.prevent="searchProducts">
          <input type="text" placeholder="Search..." v-model="searchQuery" />
          <input type="submit" hidden />
        </form>
      </div>
      <router-link to="/cart">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa33fdb5f297f9c803839ca0a548882d3b6d75074bf1b3078a48c91734d1f92?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
          alt="Shopping-cart-icon"
          class="cart-icon"
        />
      </router-link>
      <div class="profile-dropdown">
        <!-- <a href="http://127.0.0.1:8000/portal">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b02d02c05cbc583f199505c45214807fa2daa52f8c6cdf037c9d58ee805f209?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
            alt="User-profile-icon" class="user-icon" @click="toggleDropdown" />
        </a> -->

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b02d02c05cbc583f199505c45214807fa2daa52f8c6cdf037c9d58ee805f209?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
          alt="User-profile-icon"
          class="user-icon"
          @click="toggleDropdown"
        />

        <div class="dropdown-content" v-show="dropDown">
          <router-link to="/profile">我的帳戶</router-link>
          <router-link to="/IndivMarket">我的賣場</router-link>
          <router-link to="/logout" @click="Logout">登出</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      LoggedIn: false,
      dropDown: false,
      searchQuery: "",
    };
  },
  created() {
    localStorage.setItem("mode", "false");
    this.checkAuthentication();
  },
  methods: {
    isLoggedIn() {
      return localStorage.getItem("mode") === "in";
    },

    toggleDropdown() {
      if (this.isLoggedIn()) {
        // 檢查是否已登入
        this.dropDown = !this.dropDown; // 如果已登入，則切換下拉菜單的顯示狀態
      } else {
        this.Login(); // 如果未登入，則呼叫 Login 方法進行登入
        // window.location.href = "http://127.0.0.1:8000/portal";
      }
    },

    async Login() {
      try {
        // const response = await axios.get("http://127.0.0.1:8000/portal"); // 調用登入 API
        window.location.href = "http://127.0.0.1:8000/portal";
        console.log("Signed in successfully");
        // localStorage.setItem("token", response.data.token);
        localStorage.setItem("mode", "in");
        this.LoggedIn = true; // 更新 LoggedIn 狀態為已登入
      } catch (error) {
        console.error("Signed in failed", error);
      }
    },

    Logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("mode");
      this.LoggedIn = false; // 更新 LoggedIn 狀態為未登入
    },

    checkAuthentication() {
      this.LoggedIn = this.isLoggedIn(); // 初始檢查
      setInterval(() => {
        this.LoggedIn = this.isLoggedIn(); // 每500毫秒檢查一次
      }, 5000); // 注意原始碼寫500應該是錯誤的，這裡調整為5000毫秒
    },

    async searchProducts() {
      const baseUrl = `http://127.0.0.1:8000/api/products/`;
      const query = this.searchQuery.trim()
        ? `?name=${encodeURIComponent(this.searchQuery)}`
        : "";
      const fullUrl = baseUrl + query;

      console.log("Request URL:", fullUrl); // Debugging line

      // Trigger navigation with query parameters
      this.$router.push({ path: "/search", query: { name: this.searchQuery } });
      // axios
      //   .get(fullUrl)
      //   .then((response) => {
      //     this.products = response.data;
      //   })
      //   .catch((error) => {
      //     console.log("Error:", error);
      //   });
    },
  },
};
</script>
<style scoped>
.header {
  background-color: #7b6d64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 90px;
  height: 90px;
  padding: 0;
  margin: 0;
}

.logo {
  color: #fff;
  font: 800 30px Inter, sans-serif;
  margin: 0;
}

.nav {
  display: flex;
  gap: 20px;
}

.user-icon,
.cart-icon {
  width: 50px;
  aspect-ratio: 1;
  object-fit: contain;
  box-shadow: 3px 3px 3px black;
  border-radius: 50%;
}

.search input[type="text"] {
  min-width: 300px;
  min-height: 40px;
  border-radius: 20px;
  border: none;
  padding-left: 16px;
}

.search {
  float: right;
  margin: 7px;
  align-self: center;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

.profile-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style>
