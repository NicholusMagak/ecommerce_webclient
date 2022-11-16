<template>
    <div class="container">
        <div class="row">
            <div class="col-12 justify-content-center d-flex pt-5">
                <div id="signin" class="flex-item border">
                    <h2 class="pt-4">Sign-In</h2>

                    <form @submit="signin" class="form-group pt-4 pl-4 pr-4">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" v-model="email" class="form-control" required/>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" v-model="password" class="form-control" required/>
                        </div>
                        <button class="btn btn-primary mt-2 py-0">Continue</button>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
    props: ["baseURL"],
    data() {
        return {
            email: null,
            password: null
        };
    },
    methods: {
        async signin(e) {
            e.preventDefault();
            const body = {
                email: this.email,
                password: this.password
            };

            console.log(body);
            await axios.post(`${this.baseURL}user/signIn`, body)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                swal({
                    text: 'Login successful',
                    icon: 'success',
                });
                this.$emit("fetchData");
                this.$router.push({name: 'home'});
            })
            .catch((err) => console.log('err ', err));
        }
    },
}
</script>
<style scoped>
.btn-primary {
    background-color: #f0c14b;
    color: #000;
}

@media screen {
    #signin {
        width: 40%;
    }
}
</style>


