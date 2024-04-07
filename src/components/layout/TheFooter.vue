<!-- eslint-disable vue/no-parsing-error -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-heading">
        <h1 class="footer-title">NCU二手物交易網</h1>
      </div>
      <div class="footer-contact-info">
        <h2 class="footer-contact-title">CONTACT</h2>
        <ul class="footer-contact-list">
          <li class="footer-contact-item">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f95762a4e7d37198484c659652ff4e525201cf18471c243f3027a34cc07ff24?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
              alt="Location icon"
              class="footer-icon"
            />
            <p class="footer-text">
              No. 300, Zhongda Rd<br />Zhongli District <br />Taoyuan City
            </p>
          </li>
          <li class="footer-contact-item">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc0c71f45c31a3e13b2c6058b1c501cfe67ff85c20e4924d654ec0693eadee28?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
              alt="Phone icon"
              class="footer-icon"
            />
            <p class="footer-text">03-4227151</p>
          </li>
          <li class="footer-contact-item">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/246712bd1e4b0cc92902ff221eedeee7a73bb20a8170dcfea8deaa8f45394412?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&"
              alt="Email icon"
              class="footer-icon"
            />
            <p class="footer-text">NoCareYou404@cc.edu.gmail.com</p>
          </li>
        </ul>
      </div>
      <!-- Menu -->
      <nav class="footer-navigation">
        <h2 class="footer-menu-title">MENU</h2>
        <ul class="footer-menu-list">
          <router-link to="/home"
            ><li class="footer-menu-item">Home</li></router-link
          >
          <router-link to="/personal"
            ><li class="footer-menu-item">Profile</li></router-link
          >
          <router-link to="/notFound"
            ><li class="footer-menu-item">Help</li></router-link
          >
          <router-link to="/notFound"
            ><li class="footer-menu-item">About Us</li></router-link
          >
        </ul>
      </nav>
    </div>
    <hr/>
    <div class="footer-copyright">@2023 No Rights Reserved</div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #ebd9b4;
  color: #000;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  height: 300px;
}

.footer-content {
  padding-left: 50px;
  width: 75%;
  display: flex;
  /* justify-content: space-around;
  align-items: flex-start; */
}

.footer-heading {
  margin: 0 20px;
  text-align: left;
  padding-right: 50px;
}
.footer-contact-info {
  flex: 1;
  margin: 0 20px;
  text-align: left;
  padding-left: 200px;
}

.footer-navigation {
  flex: 1;
  margin: 0 20px;
  text-align: left;
  padding-left: 50px;
}

.footer-contact-title,
.footer-menu-title {
  font-size: 20px;
  text-align: left;
}

.footer-contact-list,
.footer-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: flex-start;

  height: 180px;
}

.footer-contact-item,
.footer-menu-item {
  display: flex;
  align-items: center;
  margin: 20px 0;
  text-decoration: none;
}

.footer-menu-item {
  margin-top: 25px;
  margin-bottom: 24px;
}

.footer-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.footer-text {
  font-size: 14px;
}

hr {
  width: 75%;
  border: none;
  height: 2px;
  background-color: black;
  margin: auto;
}

a:hover {
  text-decoration: none;
}

a {
  text-decoration: none;
  position: relative;
  color: inherit;
}
.footer-copyright {

  font-size: 14px;
  margin: 20px 0;
}
</style>
