<!--還沒寫完，美編還在思考中，下面也還會再加點東西-->
<template>
  <div>
    <h1>About us</h1>
    <div class="container">
      <div class="content-section">
        <div class="text">
          <h2>中大師生專屬</h2>
          <p>提供更實惠的購買選擇，同時推動舊物的循環利用，減少浪費</p>
        </div>
        <div class="image">
          <img src="@/assets/images/aboutus-1.jpg" alt="Image for 中大師生專屬">
        </div>
      </div>

      <div class="content-section">
        <div class="image">
          <img src="@/assets/images/aboutus-2.jpg" alt="Image for 保障交易安全">
        </div>
        <div class="text-right">
          <h2>保障交易安全</h2>
          <p>設置身份驗證功能，保障用戶的交易安全</p>
        </div>
      </div>

      <div class="content-section">
        <div class="text">
          <h2>優化交易體驗</h2>
          <p>交易進展即時更新，提升個人資料保密性</p>
        </div>
        <div class="image">
          <img src="@/assets/images/aboutus-3.jpg" alt="Image for 優化交易體驗">
        </div>
      </div>

      <div class="content-section">
        <div class="image">
          <img src="@/assets/images/aboutus-4.jpg" alt="Image for 學生團隊打造">
        </div>
        <div class="text-right">
          <h2>學生團隊打造</h2>
          <p>理解並關心用戶需求，致力打造更便利的交易平台</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomComponent'
};
</script>

<style scoped>
* {
  font-family: Open Sans;
}

img {
  width: 400px;
  height: 400px;
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 10px;
}

h1 {
  text-align: center;
  font-size: 40px;
  margin:5%;
  /*margin-bottom: 10%;*/
}

.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.content-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
  padding: 20px;
  background-color: #f4f2ec;
}

.text {
  flex: 1;
  margin: 10%;
}

.text-right {
  flex: 1;
  margin: 10%;
  text-align: right;
}

.image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

p {
  font-size: 20px;
  line-height: 1.5;
}
</style>
