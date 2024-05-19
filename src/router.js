import { createRouter, createWebHistory } from "vue-router";

// General Pages
import HomePage from "./components/pages/HomePage.vue";
import NotFound from "./components/pages/NotFound.vue";
import AboutUs from "./components/pages/AboutUs.vue";

// Product Pages
import newProduct from "./components/pages/ProductPages/newProduct.vue";
import ProductDetail from "./components/pages/ProductPages/ProductDetail.vue";

import NewPage from "./components/pages/ProductPages/Category/NewPage.vue";
import OtherPage from "./components/pages/ProductPages/Category/OtherPage.vue";

import ThreeCPage from "./components/pages/ProductPages/Category/3C/3CPage.vue";
// import AcessPage from "./components/pages/ProductPages/Category/3C/AcessPage.vue";
import ComputerPage from "./components/pages/ProductPages/Category/3C/ComputerPage.vue";
import EarPage from "./components/pages/ProductPages/Category/3C/EarPage.vue";
import MobilePage from "./components/pages/ProductPages/Category/3C/MobilePage.vue";

import BookPage from "./components/pages/ProductPages/Category/Book/BookPage.vue";
import FictionPage from "./components/pages/ProductPages/Category/Book/FictionBook.vue";
import KnowPage from "./components/pages/ProductPages/Category/Book/KnowBook.vue";
import StaplePage from "./components/pages/ProductPages/Category/Book/StapleBook.vue";
import TextPage from "./components/pages/ProductPages/Category/Book/TextBook.vue";

import AppliancePage from "./components/pages/ProductPages/Category/Essential/AppliancePage.vue";
import ClothPage from "./components/pages/ProductPages/Category/Essential/ClothPage.vue";
import DecorPage from "./components/pages/ProductPages/Category/Essential/DecorPage.vue";
import EssentialPage from "./components/pages/ProductPages/Category/Essential/EssentialPage.vue";
import HygeinePage from "./components/pages/ProductPages/Category/Essential/HygeinePage.vue";

import FoodPage from "./components/pages/ProductPages/Category/Food/FoodPage.vue";
import DrinkPage from "./components/pages/ProductPages/Category/Food/DrinkPage.vue";
import FreshPage from "./components/pages/ProductPages/Category/Food/FreshPage.vue";
import HotPage from "./components/pages/ProductPages/Category/Food/HotPage.vue";
import RamyunPage from "./components/pages/ProductPages/Category/Food/RamyunPage.vue";
import SnackPage from "./components/pages/ProductPages/Category/Food/SnackPage.vue";

// User Pages
import UserCart from "./components/pages/UserPages/UserCart.vue";
import ProfilePage from "./components/pages/UserPages/ProfilePage.vue";
import RecordsPage from "./components/pages/UserPages/RecordsPage.vue";
import IndivMarket from "./components/pages/UserPages/IndivMarket.vue";
import SellerPage from "./components/pages/UserPages/SellerPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // General Pages
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/:notFound(.*)", component: NotFound },
    { path: "/about", component: AboutUs },

    // User Pages
    {
      path: "/cart",
      component: UserCart,
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: "/IndivMarket",
      component: IndivMarket,
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: "/records",
      component: RecordsPage,
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: "/profile",
      component: ProfilePage,
      // meta: {
      //   requiresAuth: true,
      // },
    },
    { path: "/seller", component: SellerPage },

    // Product Pages
    {
      path: "/products",
      component: NewPage,
      // children: [
      //   { path: "其他", component: OtherPage },

      //   { path: "3C", component: ThreeCPage },
      //   { path: "周邊", component: HomePage },
      //   { path: "電腦", component: ComputerPage },
      //   { path: "耳機", component: EarPage },
      //   { path: "行動裝置", component: MobilePage },

      //   { path: "書店", component: BookPage },
      //   { path: "小說", component: FictionPage },
      //   { path: "知識/理財", component: KnowPage },
      //   { path: "文具", component: StaplePage },
      //   { path: "教科書", component: TextPage },

      //   { path: "家電", component: AppliancePage },
      //   { path: "服裝", component: ClothPage },
      //   { path: "裝飾", component: DecorPage },
      //   { path: "日常", component: EssentialPage },
      //   { path: "衛生用品", component: HygeinePage },

      //   { path: "食品", component: FoodPage },
      //   { path: "飲品", component: DrinkPage },
      //   { path: "生鮮/冷凍", component: FreshPage },
      //   { path: "熟食", component: HotPage },
      //   { path: "泡麵", component: RamyunPage },
      //   { path: "零食", component: SnackPage },
      // ],
    },
    { path: "/products/其他", component: OtherPage },
    { path: "/products/3C", component: ThreeCPage },
    { path: "/products/周邊", component: HomePage },
    { path: "/products/電腦", component: ComputerPage },
    { path: "/products/耳機", component: EarPage },
    { path: "/products/行動裝置", component: MobilePage },

    { path: "/products/書店", component: BookPage },
    { path: "/products/小說", component: FictionPage },
    { path: "/products/知識/理財", component: KnowPage },
    { path: "/products/文具", component: StaplePage },
    { path: "/products/教科書", component: TextPage },

    { path: "/products/家電", component: AppliancePage },
    { path: "/products/服飾", component: ClothPage },
    { path: "/products/裝飾", component: DecorPage },
    { path: "/products/日常", component: EssentialPage },
    { path: "/products/衛生", component: HygeinePage },

    { path: "/products/食品", component: FoodPage },
    { path: "/products/飲品", component: DrinkPage },
    { path: "/products/冷凍生鮮", component: FreshPage },
    { path: "/products/熟食", component: HotPage },
    { path: "/products/泡麵", component: RamyunPage },
    { path: "/products/零食", component: SnackPage },
    {
      path: "/newproduct",
      component: newProduct,
      // meta: {
      //   requiresAuth: true,
      // },
    },
    { path: "/productdetail/:id", component: ProductDetail },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const user = localStorage.getItem("user");
//     if (user) {
//       next();
//     } else {
//       next("/auth");
//     }
//   } else {
//     next();
//   }
// });

export default router;