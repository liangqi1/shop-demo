<template>
    <div class="shop-cart" v-show="!loading">
        <div v-if="lists.length">
            <!-- 购物车列表 -->
            <section class="order-card">
                <van-checkbox-group class="order-list" v-model="checkedList" @change="changeCartsChecked">
                    <ul v-for="(item) in lists" :key="item.id">
                        <van-swipe-cell>
                            <div class="order-info">
                                <li class="check-item">
                                    <van-checkbox :key="item.id" :name="item.id"></van-checkbox>
                                </li>
                                <img :src="item.imgSrc" />
                                <li class="order-detail">
                                    <ul>
                                        <li class="info-one">
                                            <span>{{ item.productName }}</span>
                                        </li>
                                        <li class="info-two">
                                            <span>{{ item.info }}</span>
                                        </li>
                                    </ul>
                                    <div class="info-count">
                                        <span>￥{{ item.price }}</span>
                                        <van-stepper min="1" @change="changeCartNum($event, item.id)"
                                            v-model="numObj[item.id]" />
                                    </div>
                                </li>
                            </div>
                            <template #right>
                                <van-button square text="删除" size="mini" type="danger" class="delete-button"
                                    @click="delOneCart(item.id)" />
                            </template>
                        </van-swipe-cell>
                    </ul>
                </van-checkbox-group>
            </section>
            <!-- 底部结算 -->
            <section class="options-edit">
                <van-submit-bar :price="totalPrice" button-text="结算" @submit="onSubmit">
                    <van-checkbox v-model="isCheckAll" :indeterminate="isIndeterminate"
                        @change="checkAllChange">全选</van-checkbox>
                </van-submit-bar>
            </section>
        </div>
        <!-- 控状态 -->
        <section class="cart-empty" v-else>
            <ul class="empty-content">
                <li class="img-cart">
                    <van-icon name="shopping-cart-o" color="#ee0a24" />
                </li>
                <li class="item-text">
                    <p>您的购物车空空的哦~</p>
                    <p>去看看心仪的商品吧~</p>
                </li>
            </ul>
        </section>

    </div>
</template>
  
<script>
import { onMounted, ref, reactive, toRefs, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router';
import { GetImgUrl, toRound, GetObjStorage } from '@/utils/utils.js'
import { fetchCarts } from '@/http/http.js'
import { showDialog } from 'vant';
export default {
    name: "shopCart",
    setup() {
        const { ctx } = getCurrentInstance();
        const $router = useRouter();
        const cartsTemp = GetObjStorage('carts');

        // 获取缓存中购物车
        const numObjV = {}
        if (cartsTemp.length) {
            cartsTemp.forEach(item => {
                numObjV[item.id] = item.num;
            })
        }
        const numObj = ref(numObjV)
        const loading = ref(true);
        const isIndeterminate = ref(false);
        const isCheckAll = ref(false);
        const checkedList = ref([])
        const totalPrice = ref(0);
        const state = reactive({
            lists: [],
        });

        /** 勾选购物车 */
        const changeCartsChecked = (value) => {
            checkedList.value = value
            const checkedCount = value.length
            isCheckAll.value = checkedCount === state.lists.length
            isIndeterminate.value = checkedCount > 0 && checkedCount < state.lists.length;
            calTotalPrice()
        }

        /** 全选购物车 */
        const checkAllChange = (val) => {
            checkedList.value = val ? state.lists.map(item => item.id) : [];
            isIndeterminate.value = val;
            calTotalPrice()
        }

        /** 结算 */
        const onSubmit = () => {
            const total = totalPrice.value
            // 更新storage
            updateStorage()
            if (total <= 100) return
            showDialog({
                title: `支付成功`,
                message: `支付成功￥${toRound(total / 100, 2)}，即将跳转至我的订单`,
                theme: 'round-button',
            }).then(() => {
                $router.push('/mine/order')
            })
        };

        /** 结算更新storage，订单增加，购物车减少 */
        const updateStorage = () => {
            const ordsTemp = GetObjStorage('ords');
            const cartsTemp = GetObjStorage('carts');
            state.lists.forEach(item => {
                if (!checkedList.value.includes(item.id)) return
                const num = numObj.value[item.id];

                // 更新订单
                ordsTemp.push({ 
                    ordId: String(new Date().valueOf() + item.id), 
                    productId: item.id, 
                    num,
                    status: 1,
                })
                // 更新购物车
                const index = cartsTemp.findIndex(v => v.id == item.id);
                if (index !== -1) cartsTemp.splice(index, 1)
            })
            localStorage.setItem('ords', JSON.stringify(ordsTemp))
            localStorage.setItem('carts', JSON.stringify(cartsTemp))
        }

        /** 计算总价 */
        const calTotalPrice = () => {
            let total = 0;
            state.lists.forEach(item => {
                if (!checkedList.value.includes(item.id)) return
                const num = numObj.value[item.id];
                total += (num * item.price)
            })

            totalPrice.value = total * 100
        }

        /** 删除购物车 */
        const delOneCart = (id) => {
            let _temp = GetObjStorage('carts');
            const index = _temp.findIndex(item => item.id == id);
            if (index !== -1) {
                _temp.splice(index, 1)
                localStorage.setItem('carts', JSON.stringify(_temp));
            }
            init()
            calTotalPrice()
        }

        /** 修改购物车商品数量 */
        const changeCartNum = (val, id) => {
            let _temp = GetObjStorage('carts');
            const index = _temp.findIndex(item => item.id == id);
            if (index !== -1) {
                _temp[index].num = val;
                localStorage.setItem('carts', JSON.stringify(_temp));
            }
            calTotalPrice()
        }

        /** 获取购物车数据 */
        const init = async () => {
            const data = await fetchCarts() || []
            data.map(item => { item.imgSrc = GetImgUrl(item.img) })
            state.lists = data
            loading.value = false;
        }

        onMounted(async () => {
            await init()
        });

        return {
            ...toRefs(state),
            loading,
            totalPrice,
            numObj,

            isIndeterminate,
            isCheckAll,
            checkedList,

            onSubmit,
            changeCartsChecked,
            checkAllChange,
            calTotalPrice,
            delOneCart,
            changeCartNum,

        };
    },
};
</script>
  
<style scoped lang="scss" src="./index.scss"></style>
  