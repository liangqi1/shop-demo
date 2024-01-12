<template>
    <div class="product-container">
        <!-- 图片 -->
        <div class="product-img-container">
            <van-swipe :autoplay="3000" indicator-color="white" lazy-render>
                <van-swipe-item v-for="image in images" :key="image">
                    <img class="product-img" :src="image" />
                </van-swipe-item>
            </van-swipe>

        </div>

        <!-- 简介 -->
        <div class="info prodcut-wapper">
            <div class="price">¥100.2</div>
            <div class="name">Bally/巴利女士收纳包 WLO01GVT323I3D7Y1</div>
            <!-- 库存 -->
            <div class="inventory">库存: {{ totalInv }}</div>

        </div>
        <van-divider dashed>商品详情</van-divider>
        <!-- 详情 -->
        <div class="detail prodcut-wapper">
            <div class="text-align-c">
                <van-image :src="requireImgUrl('product/product_1_400x400.jpeg')" />
            </div>

            <section>
                1.保存时内装纸以吸湿气，并将防尘袋罩住，放置通风处。平时保养使用干的柔软的
                布轻轻的擦拭即可。<br>
                2.金属部分，可使用拭银布擦拭即可。<br>
                3.避免包包遇水，以防变硬或褪色，也要避免折叠与重压，以免造成折痕或裂痕。<br>
                4.轻微脏垢局部用柔软的布加少许稀释肥皂水擦拭干净。
            </section>

        </div>
        <!-- 底部结算 -->
        <div class="product-footer">
            <van-action-bar>
                <router-link to="/shopCart" tag="span">
                    <van-action-bar-icon icon="cart-o" :badge="totalCarts" text="购物车" />
                </router-link>
                <van-action-bar-button type="warning" text="加入购物车" :disabled="totalInv < 1"  @click="submitCarts" />
                <van-action-bar-button type="danger" :disabled="totalInv < 1" text="立即购买" @click="submit" />
            </van-action-bar>
        </div>

    </div>
</template>
<script>
import { onMounted, ref, reactive, toRefs, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router';
import { GetImgUrl, GetObjStorage } from '@/utils/utils.js'
import { fetchCarts } from '@/http/http.js'
import { showDialog } from 'vant';
export default {
    name: 'prodcutDetail',
    setup() {
        const { ctx } = getCurrentInstance();
        const $router = useRouter();
        const loading = ref(true);
        const totalCarts = ref('');
        const totalInv = ref(3); // TODO: 库存，后续从接口取，暂时写死

        const images = [
            GetImgUrl('product/product_1_900x900.jpeg'),
        ];
        /** 获取购物车数量 */
        const getTotalCarts = () => {
            // TODO: 路由参数携带productId 传入，暂时写死 0
            const cartsTemp = GetObjStorage('carts')
            if (cartsTemp.length) {
                const cur = cartsTemp.find(item => item.id == '0');
                totalCarts.value = cur ? cur.num : ''
            }
        }
        /** 加入购物车 */
        const submitCarts = () => {
            // TODO: 路由参数携带productId 传入，暂时写死 0
            const cartsTemp = GetObjStorage('carts')
            let temp = [{id: '0', num: 1}]
            const index = cartsTemp.findIndex(item => item.id == '0');
            if (cartsTemp.length) {
                if (index !== -1) {
                    cartsTemp[index].num += 1
                    totalCarts.value = String(cartsTemp[index].num)
                } else {
                    cartsTemp.push({id: '0', num: 1})
                    totalCarts.value = String(1)
                }
            } else {
                cartsTemp.push({id: '0', num: 1})
                totalCarts.value = String(1)
            }
       
            totalInv.value -= 1
            localStorage.setItem('carts', JSON.stringify(cartsTemp))
        }

        /** 购买 */
        const submit = () => {
            totalInv.value -= 1;
            // 订单写入storage
            const ordsTemp = GetObjStorage('ords');
            const newOrd = { ordId: new Date().valueOf() + '0', productId: '0', num: 1, status: 1};
            ordsTemp.push(newOrd)
            localStorage.setItem('ords', JSON.stringify(ordsTemp))
            showDialog({ 
                title: `支付成功`,
                message: `支付成功￥${100.2}，即将跳转至我的订单`,
                theme: 'round-button',
             }).then(() => {
                $router.push('/mine/order')
             })
        }

        onMounted(async () => {
            // TODO: 请求单个商品接口
            getTotalCarts()
            loading.value = false;
        });
        return { 
            images,
            totalCarts,
            totalInv,
            submitCarts,
            submit,
         };
    },
    methods: {
        requireImgUrl(path) {
            return GetImgUrl(path)
        }
    }
}
</script>
<style scoped lang="scss" src="./index.scss"></style>
