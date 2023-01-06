<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="pt-3">
                    Shopping cart
                </h3>
            </div>
        </div>
        <div v-for="cartItem in cartItems" :key="cartItem.id" class="row mt-2 pt-3 justify-content-around">
             <!-- Display cart items -->
             <div class="col-2"></div>
             <div class="col-md-3 embed-responsive embed-responsive-16by9">
                <img :src="cartItem.product.imageURL" alt="" class="w-100 card-image-top embed-responsive-item" style="object-fit: cover">
             </div>

             <!-- Display product name and quantity -->
             <div class="col-md-5 px-3">
                <div class="card-block">
                    <h6 class="card-title">
                        <router-link :to="{ name: 'ShowDetails', params: {id: cartItem.product.id} }">
                            {{ cartItem.product.name }}
                        </router-link>
                    </h6>

                    <p class="mb-0 font-weight-bold" id="item-price">
                        $ {{ cartItem.product.price }} per unit
                    </p>

                    <p class="mb-0" style="float:left">
                        Quantity: {{ cartItem.quantity }}
                    </p>
                </div>
                <p class="mb-0" style="float:right">
                    Total: <span class="font-weight-bold">
                        $ {{ cartItem.product.price * cartItem.quantity }}
                    </span>
                </p>

                <br/>
                <a href="#" class="text-right" @click="deleteItem(cartItem.id)">Remove from cart</a>
                
             </div>

             <div class="col-2"></div>
             <div class="col-12">
                <hr style="height:0.5px;border-width:0;color:gray;background-color:gray" />
             </div>
        </div>
        <!-- Displaying total price -->
        <div class="total-cost pt-2 text-right">
            <h5>Total: ${{ totalCost.toFixed(2) }}</h5>
            <button type="button" class="btn btn-primary confirm" @click="checkout">
                Confirm order
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            cartItems: [],
            token: null,
            totalCost: 0,
        };
    },
    props: ["baseURL"],
    methods: {
        //fetching all item to view in cart
        listCartItems() {
            axios.get(`${this.baseURL}cart/getCartElements/?token=${this.token}`)
            .then((res) => {
                const result = res.data;
                this.cartItems = result.cartItems;
                this.totalCost = result.totalCost;
            }).catch((err) => {
                console.log('err: ', err);
            });
        },

        deleteItem(itemId) {
            axios.delete(`${this.baseURL}cart/delete/${itemId}/?token=${this.token}`)
            .then((res) => {
                if (res.status === 200){
                    this.$router.go(0);
                }
            }).catch((err) => {
                console.log('err: ', err);
            });
        },

        checkout() {
            this.$router.push({name: 'CheckOut'})
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.listCartItems();
    },
};
</script>

<style>
h4, h5 {
    color: #484848;
    font-size: 700;
}
</style>
