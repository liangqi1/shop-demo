<template>
    <router-link class="product-img" tag="div" to="/product">
        <div class="text-align-c">
                <van-image :src="record.img" />
            </div>
    </router-link>
    <div class="product-layout">
        <div class="product-title text-align-l">{{ record.name }}</div>
        <div class="product-desc">
            <span class="product-price">{{ record.price }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'productItem',
    props: {
        record: {},
    },

    mounted() {
    }
}
</script>
<style scoped lang="scss" src="./index.scss"></style>