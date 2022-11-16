<template>
  <div id="nav">
      <Navbar :cartCount="cartCount" @resetCartCount="resetCartCount" />
  </div>
  <!--
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/admin/category">Category</router-link> |
    <router-link to="/admin/product">Product</router-link> | 
    <router-link to="/about">About</router-link>
  </nav>
  -->
  <router-view v-if="products && categories" style="min-height: 60vh"
  :baseURL="baseURL"
  :categories="categories"
  :products="products"
  @fetchData="fetchData"
  >
  </router-view>
  <!--   Footer    -->
  <Footer />
</template>

<script>
import axios from 'axios';
import Navbar from './components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {Navbar, Footer},
  data() {
    return{
      baseURL: "https://limitless-lake-55070.herokuapp.com/",
      products: [],
      categories: null,
      cartCount: 0,
    }
  },
  methods: {
    async fetchData() {

      // api call for the categories
      await axios.get(this.baseURL + "category/")
      .then(res => {
        this.categories = res.data
      }).catch((err) => console.log('err', err));

      // api call for the products
      await axios.get(this.baseURL + "product/")
      .then(res => {
        this.products = res.data
      }).catch((err) => console.log('err', err));

      // api call for the cart items if person is logged in
      if(this.token) {
        axios.get(`${this.baseURL}cart/?token=${this.token}`)
            .then((res) => {
                const result = res.data;
                this.cartCount = result.cartItems.length;
            }).catch((err) => {
                console.log('err: ', err);
            });
      }
    },
    resetCartCount() {
      this.cartCount = 0;
    }
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchData();
  }
};
</script>


<style>
html {
  overflow-y: scroll;
}
</style>
