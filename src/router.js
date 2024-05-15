import { createRouter, createWebHistory } from "vue-router";

// General Pages
import HomePage from "./components/pages/HomePage.vue";
import NotFound from "./components/pages/NotFound.vue";
import AboutUs from "./components/pages/AboutUs.vue";

// User Pages
import UserCart from "./components/pages/UserPages/UserCart.vue";
import ProfilePage from "./components/pages/UserPages/ProfilePage.vue";
import RecordsPage from "./components/pages/UserPages/RecordsPage.vue";
import MarketPlace from "./components/pages/UserPages/MarketPlace.vue";
import newProduct from "./components/products/newProduct.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // General Pages
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/:notFound(.*)", component: NotFound },
    { path: "/about", component: AboutUs },

    // User Pages
    { path: "/cart", component: UserCart },
    { path: "/IndivMarket", component: IndivMarket },
    { path: "/records", component: RecordsPage },
    { path: "/profile", component: ProfilePage },

    // Product Pages
    { path: "/products", component: ProductsPage },
    { path: "/newproduct", component: newProduct },
  ],
});

export default router;
