<template>
    <div class="div_class">
        <h3>You will be redirected to payment page</h3>
        <div class="alert alert-primary">
            While making payment use card number 4242 4242 4242 4242 and enter random date and cvv(3 digit)
        </div>

        <button class="btn btn-primary" @click="goToCheckout">Make Payment</button>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'CheckOut',
    data() {
        return {
            stripeAPIToken: 'pk_test_51M0ONbK85hTPRwzGBJuZAnKUmvtEWrDM0KrcGv4400N4ppxSNQZSMqpRtIyHLEi9Z03kmIwzpDXDbBrxn7vC4vKL00WNDN9Ll7',
            stripe: '',
            token: null,
            checkoutBodyArray: [],
        };
        
    },

    props: ["baseURL"],

    methods: {
        getAllItems() {
            axios.get(`${this.baseURL}cart/getCartElements/?token=${this.token}`).then((resp) => {
                if (resp.status == 200){
                    let products = resp.data;
                    for(let i=0; i<products.cartItems.length; i++) {
                        this.checkoutBodyArray.push({
                            price: products.cartItems[i].product.price,
                            quantity: products.cartItems[i].quantity,
                            productName: products.cartItems[i].product.name,
                            productId: products.cartItems[i].product.id
                        })
                    }
                }
            }).catch(err => console.log(err));
        },

        goToCheckout() {
            console.log('checkout body', this.checkoutBodyArray);
            axios.post(`${this.baseURL}order/create-checkout-session`, this.checkoutBodyArray)
            .then((resp) => {
                localStorage.setItem('sessionId', resp.data.sessionId);
                console.log('session: ', resp.data);
                //this.stripe.redirectToCheckout({ sessionId: resp.data.sessionId})
            }).catch((err) => console.log(err));
        }
    },

    mounted() {
        this.token = localStorage.getItem('token');
        this.stripe = window.Stripe(this.stripeAPIToken);
        this.getAllItems();

        // go to checkout is called once you click to make payment
    }
};

</script>

<style scoped>
.alert {
    width: 50%
}

.div_class {
    margin-top: 5%;
    margin-left: 30%;
}

.checkout_button {
    background-color: #5d3dec;
    margin: 10px;
}
</style>