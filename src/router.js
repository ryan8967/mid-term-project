import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./components/pages/HomePage.vue";
import NotFound from "./components/pages/NotFound.vue";
import AboutUs from "./components/pages/AboutUs.vue";
import ProductsPage from "./components/pages/ProductsPage/productsPage.vue";
import ProfilePage from "./components/pages/UserPages/ProfilePage.vue";
import UserCart from "./components/pages/UserPages/UserCart.vue";
import RecordsPage from "./components/pages/UserPages/RecordsPage.vue";
import MarketPlace from "./components/pages/UserPages/MarketPlace.vue";
import ShelfPage from "./components/pages/UserPages/ShelfPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/Home" },
    { path: "/home", component: HomePage },
    { path: "/about", component: AboutUs },
    { path: "/products", component: ProductsPage },
    { path: "/profile", component: ProfilePage },
    { path: "/cart", component: UserCart },
    { path: "/:notFound(.*)", component: NotFound },
    { path: "/records", component: RecordsPage },
    { path: "/marketplace", component: MarketPlace },
    { path: "/shelf", component: ShelfPage },
  ],
});

export default router;
