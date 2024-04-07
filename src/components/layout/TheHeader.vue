<!-- eslint-disable vue/no-parsing-error -->
<template>
  <header class="header">
    <div class="logo-container">
      <img src="../../assets/images/Logo.png" alt="Logo" class="logo-icon" />
      <h1 class="logo"><router-link to="/home">NCU二手物交易網</router-link></h1>
    </div>
    <nav class="nav">
      <div class="search">
        <form action="#">
          <input type="text" placeholder=" Search..." name="search" />
        </form>
      </div>
      <router-link to="/cart">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa33fdb5f297f9c803839ca0a548882d3b6d75074bf1b3078a48c91734d1f92?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&" alt="User-profile-icon" class="user-icon" />
      </router-link>
      <router-link to="/profile">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b02d02c05cbc583f199505c45214807fa2daa52f8c6cdf037c9d58ee805f209?apiKey=efd1b77638de4cc186ba2a1a8d649bb8&" alt="Shopping-cart-icon" class="cart-icon" />
      </router-link>
    </nav>
  </header>
</template>

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
</style>
