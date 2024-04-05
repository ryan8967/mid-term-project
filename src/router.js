import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./components/pages/HomePage.vue";
import NotFound from "./components/pages/NotFound.vue";
import AboutUs from "./components/pages/AboutUs.vue";
import BooksProducts from "./components/pages/ProductsPage/BooksProducts.vue";
import NewProducts from "./components/pages/ProductsPage/NewProducts.vue";
import FoodProducts from "./components/pages/ProductsPage/FoodProducts.vue";
import ClothesProducts from "./components/pages/ProductsPage/ClothesProducts.vue";
import ProfilePage from "./components/pages/UserPages/ProfilePage.vue";
import UserCart from "./components/pages/UserPages/UserCart.vue";
import OtherProducts from "./components/pages/ProductsPage/OtherProducts.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/Home" },
    { path: "/home", component: HomePage },
    { path: "/about", component: AboutUs },
    { path: "/books", component: BooksProducts },
    { path: "/newProducts", component: NewProducts },
    { path: "/foods", component: FoodProducts },
    { path: "/clothes", component: ClothesProducts },
    { path: "/profile", component: ProfilePage },
    { path: "/cart", component: UserCart },
    { path: "/others", component: OtherProducts },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
