<template>
  <div class="category-menu">
    <div class="category-menu-container">
      <nav class="category-menu-nav">
        <div
          class="category-menu-item"
          v-for="category in categories"
          :key="category.name"
        >
          <!--主選項-->
          <router-link :to="category.path">{{ category.name }}</router-link>
          <!--子菜單，只有當有子類別時顯示-->
          <div
            class="subcategory-menu"
            v-if="category.subcategories.length > 0"
          >
            <router-link
              v-for="subcategory in category.subcategories"
              :key="subcategory.name"
              :to="subcategory.path"
            >
              {{ subcategory.name }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "新品",
          path: "/newProducts",
          subcategories: [],
        },
        {
          name: "食品",
          path: "/newProducts",
          subcategories: [
            { name: "泡麵", path: "/newProducts" },
            { name: "零食", path: "/newProducts" },
            { name: "生鮮", path: "/newProducts" },
            { name: "熟食", path: "/newProducts" },
            { name: "飲品", path: "/newProducts" },
            { name: "罐頭/醬料", path: "/newProducts" },
            { name: "冷凍食品", path: "/newProducts" },
          ],
        },
        {
          name: "日常",
          path: "/newProducts",
          subcategories: [
            { name: "家電", path: "/newProducts" },
            { name: "服飾", path: "/newProducts" },
            { name: "衛生", path: "/newProducts" },
            { name: "裝飾", path: "/newProducts" },
          ],
        },
        {
          name: "3C",
          path: "/clothes",
          subcategories: [
            { name: "行動裝置", path: "/newProducts" },
            { name: "電腦", path: "/newProducts" },
            { name: "周邊", path: "/newProducts" },
            { name: "相機", path: "/newProducts" },
            { name: "耳機", path: "/newProducts" },
          ],
        },
        {
          name: "書店",
          path: "/books",
          subcategories: [
            { name: "教科書", path: "/newProducts" },
            { name: "小說", path: "/newProducts" },
            { name: "知識/理財", path: "/newProducts" },
            { name: "文具", path: "/newProducts" },
          ],
        },
        {
          name: "其他",
          path: "/others",
          subcategories: [],
        },
      ],
    };
  },
};
</script>

<style scoped>
.category-menu {
  display: flex;
  flex-direction: column;
  font-size: 24px;
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
  padding: 14px 30px;
}

.category-menu-nav {
  background-color: #fbf6f0;
  display: flex;
  width: 80%;
  max-width: 1029px;
  gap: 14px;
  justify-content: space-between;
  align-items: center;
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
  width: calc(100% / 6);
  text-align: center;
  padding: 16px 30px 10px;
  position: relative;
}

@media (max-width: 991px) {
  .category-menu-item {
    white-space: initial;
    padding: 0 20px;
    position: relative;
  }
}

.subcategory-menu {
  display: none; /* This remains the same to keep it hidden until hovered */
  position: absolute;
  left: 0;
  top: 100%;
  width: 300px; /* Adjust width as necessary to fit 4 items per row */
  background-color: #f9f3ec;
  border-bottom: 3px solid #c69f76;
  border-radius: 0 0 8px 8px;
  z-index: 1000;
  grid-template-columns: repeat(2, 1fr); /* 4 columns of equal width */
  grid-gap: 6px; /* Optional: add gap between grid items */
  font-size: smaller;
}

.category-menu-item:hover .subcategory-menu {
  display: grid; /* Changed from flex to grid */
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.subcategory-menu a {
  display: block;
  padding: 10px; /* Adjust padding as needed */
}

a {
  text-decoration: none;
  color: inherit;
  justify-content: center;
  align-items: center;
}
</style>
