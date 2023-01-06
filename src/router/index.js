import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddCategory from '../views/category/AddCategory.vue'
import Category from '../views/category/Category.vue';
import Admin from '../views/Admin.vue';
import Product from '../views/Product/Product.vue'
import AddProduct from '../views/Product/AddProduct.vue';
import EditCategory from '../views/category/EditCategory.vue';
import EditProduct from '../views/Product/EditProduct.vue';
import ShowDetails from '../views/Product/ShowDetails.vue';
import ListProducts from '../views/category/ListProducts.vue';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import WishList from '../views/Product/WishList.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import Failed from '../views/payment/Failed.vue';
import Success from '../views/payment/Success.vue';
import Checkout from '../views/Checkout/CheckOut.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // catgeory detail page
  {
    path: '/category/show/:id',
    name: 'ListProducts',
    component: ListProducts
  },
  {
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/admin/category',
    name: 'Category',
    component: Category
  },
  // category edit
  {
    path: '/admin/category/:id',
    name: 'EditCategory',
    component: EditCategory
  },
  // admin homepage
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/product',
    name: 'AdminProduct',
    component: Product
  },
  // add product
  {
    path: '/admin/product/add',
    name: 'AddProduct',
    component: AddProduct
  },
  // edit product
  {
    path: '/admin/product/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  // show product details
  {
    path: '/product/show/:id',
    name: 'ShowDetails',
    component: ShowDetails
  },
  // sign up page
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  // sign in page
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  // wishlist page
  {
    path: '/wishlist',
    name: 'WishList',
    component: WishList
  },
  // shopping cart page
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },

  // failed purchase page
  {
    path: '/payment/failed',
    name: 'PaymentFailed',
    component: Failed
  },

  // successful purchase page
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: Success
  },

  // checkout page
  {
    path: '/checkout',
    name: 'CheckOut',
    component: Checkout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
