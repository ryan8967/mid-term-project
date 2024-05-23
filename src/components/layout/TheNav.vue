<template>
  <div class="category-menu">
    <div class="category-menu-container">
      <nav class="category-menu-nav">
        <div
          class="category-menu-item"
          v-for="category in categories"
          :key="category.name"
        >
          <router-link :to="category.path">{{ category.name }}</router-link>
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
      products: [],
      categories: [
        {
          name: "新品",
          path: "/products",
          subcategories: [],
        },
        {
          name: "食品",
          path: "/products/食品",
          subcategories: [
            { name: "泡麵", path: "/products/泡麵" },
            { name: "零食", path: "/products/零食" },
            { name: "熟食", path: "/products/熟食" },
            { name: "飲品", path: "/products/飲品" },
            { name: "罐頭/醬料", path: "/products/罐頭醬料" },
            { name: "冷凍/生鮮", path: "/products/冷凍生鮮" },
          ],
        },
        {
          name: "日常",
          path: "/products/日常",
          props: { query: { sub_category: "日常" } },
          subcategories: [
            { name: "家電", path: "/products/家電" },
            { name: "服飾", path: "/products/服飾" },
            { name: "衛生", path: "/products/衛生" },
            { name: "裝飾", path: "/products/裝飾" },
          ],
        },
        {
          name: "3C",
          path: "/products/3C",
          props: { query: { main_category: "3C" } },
          subcategories: [
            { name: "行動裝置", path: "/products/行動裝置" },
            { name: "電腦", path: "/products/電腦" },
            { name: "周邊", path: "/products/周邊" },
            { name: "耳機", path: "/products/耳機" },
          ],
        },
        {
          name: "書店",
          path: "/products/書店",
          subcategories: [
            { name: "教科書", path: "/products/教科書" },
            { name: "小說", path: "/products/小說" },
            { name: "知識/理財", path: "/products/知識/理財" },
            { name: "文具", path: "/products/文具" },
          ],
        },
        {
          name: "其他",
          path: "/products/其他",
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

  .category-menu-item:hover {
  background-color: #c5bbb237; 
}

.category-menu-item:hover a {
  color: #4e463c;
}

.subcategory-menu a:hover {
  background-color: #c5bbb237;  
}
</style>
