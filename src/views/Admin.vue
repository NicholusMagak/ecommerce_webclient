<!-- eslint-disable -->
<template>
    <div class="container">
        <router-link :to="{name: 'Category'}">
        <button class="btn btn-primary btn-lg">Admin Category</button>
    </router-link>
    <br/> <br/>
    <router-link :to="{name: 'AdminProduct'}">
        <button class="btn btn-primary btn-lg">Admin Product</button>
    </router-link>
    <br/> <br/>
    <router-link :to="{name: 'Category'}">
        <button class="btn btn-primary btn-lg">Admin Category</button>
    </router-link>
    </div>
</template>

<!-- eslint-disable -->
<script>
export default {

}
</script>

<style>
.btn {
    margin-bottom: 20px;
}
</style>
