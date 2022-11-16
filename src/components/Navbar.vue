<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!--    Logo-->
    <router-link class="navbar-brand" :to="{ name: 'home' }">
      <img id="logo" src="../assets/logo.png" alt="Logo" />
    </router-link>

    <!--    Burger Button-->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--      Search Bar-->
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input
            size="100"
            type="text"
            class="form-control"
            placeholder="Search Items"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </form>
      <!--      DropDowns-->
      <!-- Dropdown for browse -->
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link text-light dropdown-toggle"
            href="#"
            id="navbarAccount"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Browse
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!--              implement three dropdown items-->
            <!--              1. Home                 -->
            <router-link :to="{name: 'home'}" class="dropdown-item">Home</router-link>
            <!--              1. Products                 -->
            <router-link :to="{name: 'AdminProduct'}" class="dropdown-item">Products</router-link>
            <!--              1. Home                 -->
            <router-link :to="{name: 'Category'}" class="dropdown-item">Category</router-link>
          </div>
        </li>

        <!-- Dropdown for account -->
        <li class="nav-item dropdown">
          <a
            class="nav-link text-light dropdown-toggle"
            href="#"
            id="navbarAccount"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Accounts
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!--              implement three dropdown items-->
            <!--              4. Wish List                  -->
            <router-link v-if="token" :to="{name: 'WishList'}" class="dropdown-item">Wishlist</router-link>
            <!--              1. Log In (if user is not logged in )-->
            <router-link v-if="!token" :to="{name: 'SignUp'}" class="dropdown-item">Sign up</router-link>
            <!--              2. Sign Up (if user is not logged in )-->
            <router-link v-if="!token" :to="{name: 'SignIn'}" class="dropdown-item">Sign in</router-link>
            <!--              3. Log out (only show if user is logged in)-->
            <a class="dropdown-item" v-if="token" href="#" @click="signout">Sign out</a>
          </div>
        </li>

        <!-- Shopping cart icon -->
        <li class="nav-item">
          <div id="cart" style="position:relative">
            <span id="nav-cart-count">{{ cartCount }}</span>
            <router-link class="text-light" :to="{name: 'ShoppingCart'}">
              <i class="fa fa-shopping-cart" style="font-size:36px"></i>
            </router-link>
          </div>
        </li>
      </ul>
      
    </div>
  </nav>
</template>
<!-- eslint-disable -->

<script>
import swal from 'sweetalert';

export default {
  name: "Navbar",
  props: ["cartCount"],
  data() {
    return {
      token: null,
    };
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.token = null;
      swal({
        text: 'Logged you out. Visit again.',
        icon: 'success',
      });
      this.$emit("resetCartCount");
      this.$router.push({name: 'home'});
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>
<style scoped>
#logo {
  width: 150px;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-link {
  color: rgba(255, 255, 255);
}

#search-button-navbar {
  background-color: #febd69;
  border-color: #febd69;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

#nav-cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  font-size: 15px;
  align-items: center;

  display: flex;
  justify-content: center;

  position: absolute;
  margin-left: 12px;
}
</style>