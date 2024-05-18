import { createRouter, createWebHistory } from "vue-router";

// General Pages
import HomePage from "./components/pages/HomePage.vue";
import NotFound from "./components/pages/NotFound.vue";
import AboutUs from "./components/pages/AboutUs.vue";

// Product Pages
// import ProductsPage from "./components/pages/ProductPages/ProductsPage.vue";
import ProductsPage from "./components/pages/ProductPages/productsPage.vue";
import newProduct from "./components/pages/ProductPages/newProduct.vue";
import ProductDetail from "./components/pages/ProductPages/ProductDetail.vue";

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
    { path: "/products/:id", component: ProductsPage },
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
