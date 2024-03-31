<template>
  <div class="category-menu">
    <div class="category-menu-container">
      <nav class="category-menu-nav">
        <router-link to="/home">主頁</router-link>
        <router-link to="/newProducts">新品</router-link>
        <router-link to="/clothes">服飾</router-link>
        <router-link to="/books">書籍</router-link>
        <router-link to="/others">其他</router-link>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.category-menu {
  display: flex;
  flex-direction: column;
  font-size: 26px;
  color: #7b6d64;
  font-weight: 400;
  white-space: nowrap;
  justify-content: center;
}

.category-menu-container {
  background-color: #fbf6f0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px 50px;
}

@media (max-width: 991px) {
  .category-menu-container {
    max-width: 100%;
    white-space: initial;
    padding: 0 20px;
  }
}

.category-menu-nav {
  background-color: #fbf6f0;
  display: flex;
  width: 80%;
  max-width: 1029px;
  gap: 16px;
  justify-content: space-between;
}

@media (max-width: 991px) {
  .category-menu-nav {
    max-width: 100%;
    flex-wrap: wrap;
    white-space: initial;
  }
}

.category-menu-item {
  font-family: Inter, sans-serif;
  padding: 18px 38px 10px;
}

@media (max-width: 991px) {
  .category-menu-item {
    white-space: initial;
    padding: 0 20px;
  }
}

a {
  text-decoration: none;
  position: relative;
}
</style>