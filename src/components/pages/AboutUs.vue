<!--我覺得有點小空，有什麼想到的美編拜託告訴我，有要改的也可以跟我說-->
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

      <div class="content-section-right">
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

      <div class="content-section-right">
        <div class="image">
          <img src="@/assets/images/aboutus-4.jpg" alt="Image for 學生團隊打造">
        </div>
        <div class="text-right">
          <h2>學生團隊打造</h2>
          <p>理解並關心用戶需求，致力打造更便利的交易平台</p>
        </div>
      </div>
    </div>
    <h1><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Our team</a></h1>
    <div class="team-container">
      <div class="team-images">
        <div class="team-image">
          <img src="@/assets/images/team-1.jpg" alt="Team member 1">
          <div class="image-description">
            <p>"中央大學學生團隊"</p>
            <p>兄弟 余欣鴻</p>
          </div>
        </div>
        <div class="team-image">
          <img src="@\assets\images\16-1.png" alt="Team member 2">
          <div class="image-description">
            <p>"中央大學學生團隊"</p>
            <p>兄弟 劉芊餘</p>
          </div>
        </div>
        <div class="team-image">
          <img src="@/assets/images/team-3.jpg" alt="Team member 3">
          <div class="image-description">
            <p>"中央大學學生團隊"</p>
            <p>兄弟 戴宇偵</p>
          </div>
         </div>
        <div class="team-image">
          <img src="@/assets/images/team-4.gif" alt="Team member 4">
          <div class="image-description">
            <p>"中央大學學生團隊"</p>
            <p>兄弟 楊鮪文</p>
          </div>
         </div>
        <div class="team-image">
          <img src="@/assets/images/team-5.jpg" alt="Team member 5">
          <div class="image-description">
            <p>"中央大學學生團隊"</p>
            <p>兄弟 謝方瑋</p>
          </div>
         </div>
        <div class="team-image">
          <img src="@/assets/images/team-6.jpg" alt="Team member 6">
          <div class="image-description">
            <p>"中央大學學生團隊"</p>
            <p>兄弟 林成髒</p>
          </div>
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
  height: 300px;
  aspect-ratio: 4 / 3;
  height: auto;
  display: block;
  max-width: 100%;
  margin: 0 auto;
  padding: 10px;
}

h1 {
  display: flex;
  align-items: center; 
  justify-content: center; 
  font-size: 50px;
  margin: 5%;
  /* margin-bottom: 10%; */
  border-bottom: 4px solid #7b6d64;
  width:auto;
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
  background-color: #f7eac369;
  /*border: 2.5px solid #7b6d644b;*/
  animation: slideFromLeft 3s ease forwards;
}
.content-section-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
  padding: 20px;
  background-color: #b1927243;
  /*border: 2.5px solid #7b6d644b;*/
  animation: slideFromRight 3s ease forwards;
}

.text {
  flex: 1;
  margin: 10%;
}

.text-right {
  flex: 1;
  margin: 10% 10% 10% 5%;
  text-align: right;
}

.image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.team-container {
  display: flex;
  justify-content: center;
  align-items: center; 
}


.team-images {
  display: flex;
  align-items: center; 
  flex-wrap: wrap;
  justify-content: center;
  /*align-items: flex-start; */ 
  height: auto;
  width: 950px;
  background-color: #eee;
  /*margin: auto;*/
  padding: 20px;
  margin-bottom: 5%;
}

.team-image img {
  flex: 1;
  width: 250px;
  height: 300px;
  margin: 3%;
}
.image-description {
  text-align: center;
}

h2 {
  font-size: 30px;
  margin-bottom: 10px;
}

p {
  font-size: 22px;
  line-height: 1.5;
}
@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(200%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
