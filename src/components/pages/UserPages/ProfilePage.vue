<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="info">
        <label>姓名</label><span>{{ account.name }}</span>
      </div>
      <div class="info">
        <label>學號</label><span>{{ account.sid }}</span>
      </div>
      <div class="info">
        <label>信箱</label><span>{{ account.email }}</span>
      </div>
      <div class="info">
        <label>電話</label><span>{{ account.phone }}</span>
      </div>
    </div>
    <div class="menu">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: {
        name: "coolstuff",
        sid: "111432100",
        email: "test@gmail.com",
        phone: "0987654321",
      },
    };
  },
};
</script>

<style>
.profile-container {
  display: flex; /* 使用flex布局 */
  justify-content: space-between; /* 兩個子元素之間保持距離 */
  align-items: flex-start; /* 讓子元素從頂部開始對齊 */
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
  padding-top: 10px;
}

.actions {
  display: flex;
  width: 150px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 2px solid #c69f76;
  border-radius: 30px;
  padding: 16px 18px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 30px;
  box-sizing: border-box; /* 包括邊框和內距在內的寬度 */
  box-shadow: 3px 3px 3px gray;
}

a {
  text-decoration: none;
  color: inherit;
  justify-content: center;
  align-items: center;
}
</style>
