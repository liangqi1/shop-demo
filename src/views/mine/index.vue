<template>
    <div class="mine-layout">
        <section class="mine-header">
            <van-image :src="usrInfo.avatarUrl" round class="header-img" />

            <ul class="user-info">
                <li class="user-name">{{ usrInfo.name }}</li>
            </ul>
        </section>

        <!-- <section class="order-all">
            <router-link to="/mine/order" class="look-orders" tag="span">查看全部订单>></router-link>
            <ul class="order-list">
                <li class="order-item">
                    <svg-icon icon-class="pending-pay"></svg-icon>
                    <span>待付款</span>
                </li>
                <li class="order-item">
                    <svg-icon icon-class="be-delivered"></svg-icon>
                    <span>待发货</span>
                </li>
                <li class="order-item">
                    <svg-icon icon-class="pending-receipt"></svg-icon>
                    <span>待收货</span>
                </li>
                <li class="order-item">
                    <svg-icon icon-class="all-orders"></svg-icon>
                    <span>退换/售后</span>
                </li>
            </ul>
        </section> -->
        <section class="mine-content">
            <ul class="options-list">
                <router-link to="/mine/order" class="option-item" tag="li">
                    <div class="item-info">
                        <span class="text">我的订单</span>
                    </div>
                    <van-icon name="arrow" color="#DBDBDB" />
                </router-link>
                    <!-- <router-link to="/mine/order" class="right-text" tag="span">查看全部订单</router-link> -->
       
            </ul>
        </section>
        <section class="mine-content">
            <ul class="options-list">
                <router-link to="/mine/address" class="option-item" tag="li">
                    <div class="item-info">
                        <span class="text">收货地址</span>
                    </div>
                    <van-icon name="arrow" color="#DBDBDB" />
                </router-link>
            </ul>
        </section>
        <section class="mg-t-md">
            <van-button style="width: 100%;" type="default" @click="loginOut">登出</van-button>
        </section>
    </div>
</template>
  
<script>
import { onMounted, ref, getCurrentInstance } from "vue";
import { useStore, mapGetters } from "vuex";
import { useRouter } from 'vue-router';
import { GetImgUrl, GetObjStorage } from '@/utils/utils.js'
import { fetchUsrInfo } from '@/http/http.js'
import { showDialog } from 'vant';
export default {
    name: "mine",
    setup() {
        const { ctx } = getCurrentInstance();
        const usrInfo = ref({})
        const $store = useStore();

        /** 登出 */
        const loginOut = async () => {
            $store.dispatch('user/loginOut');
        }
        onMounted(async () => {
            const data = await fetchUsrInfo();
            usrInfo.value = data
        });

        return {
            usrInfo,
            loginOut,
         };
    }
};
</script>
  
<style scoped lang="scss" src="./index.scss"></style>