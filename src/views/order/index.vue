<template>
    <div class="page-order">
        <van-tabs v-model:active="ordStatus" @click-tab="changeordStatus">
            <van-tab v-for="(statusItem) in status" :key="statusItem.key" :title="statusItem.name" :name="statusItem.key">
                <section v-for="(item, index) in ordList.filter(v => {
                    return v.ordStatus == statusItem.key || statusItem.key == -1
                })" :key="item.ordId" class="order-card">
                    <ul class="order-list">
                        <li class="order-item">
                            <div class="store-info">
                                <!-- 店铺名称 -->
                                <span class="store-name text-ellipsis">{{ item.storeName }}</span>
                                <span>订单号:{{ item.ordId }}</span>
                            </div>
                            <span>{{ formatOrdStatus(item.ordStatus) }}</span>
                        </li>
                        <li class="order-info">
                            <van-image :src="item.img" />
                            <div class="order-detail">
                                <p class="info-one">
                                    <!-- 商品名 -->
                                    <span class="order-name text-ellipsis">{{ item.productName }}</span>
                                    <span>${{ item.price }}</span>
                                </p>
                                <p class="info-two">
                                    <span>{{ item.info }}</span>
                                    <span>×{{ item.num }}</span>
                                </p>
                            </div>
                        </li>
                        <li class="order-count">
                            <span>共{{ item.num }}件商品,小计:</span>
                            <i>${{ toRoundNum(item.price*item.num) }}</i>
                        </li>

                    </ul>
                </section>

            </van-tab>
        </van-tabs>
    </div>
</template>
  
<script>
import { onMounted, ref, reactive, toRefs, getCurrentInstance } from "vue";
import { GetImgUrl, OrdStatus, FormatOrdStatus, toRound } from '@/utils/utils.js'
import { fetchAllOrds } from '@/http/http.js'
export default {
    name: "Order",
    components: {

    },
    data() {
        return {
            status: [
                { key: -1, name: '全部' },
                ...OrdStatus,
            ],
        }
    },
    setup() {
        const ordStatus = ref(-1);
        const { ctx } = getCurrentInstance();
        const ordList = ref([
            { ordStatus: 1, storeName: '店铺名称1111111111', ordId: '202401010000000025', productName: '测试商品', prodcutId: 'product1', price: 239.88, num: 2, info: '型号;规格;颜色;', img: GetImgUrl('product/product_1_400x400.jpeg') },
            { ordStatus: 2, storeName: '店铺名称', ordId: '202401010000000026', productName: '测试商品测试商品测试商品测试商品测试商品', prodcutId: 'product1', price: 239.88, num: 2, info: '型号;规格;颜色;', img: GetImgUrl('product/product_1_400x400.jpeg') },
            { ordStatus: 3, storeName: '店铺名称', ordId: '202401010000000027', productName: '测试商品', prodcutId: 'product1', price: 239.88, num: 2, info: '型号;规格;颜色;', img: GetImgUrl('product/product_1_400x400.jpeg') },
        ]);

        /** 切换订单状态*/
        const changeordStatus = ({ name }) => {
            ordStatus.value = parseInt(name)
        }

        /** 格式化订单状态 */
        const formatOrdStatus = (key) => {
            return FormatOrdStatus(key)
        }
        /** 数字格式化 */
        const toRoundNum = (v, x=2) => {
            return toRound(v, x)
        }

        /** 获取订单数据 */
        const getOrdList = async () => {
            const data = await fetchAllOrds()
            ordList.value = [...data, ...ordList.value]
        }

        onMounted(async () => {
            await getOrdList()

        });

        return {
            ordList,
            ordStatus,
            formatOrdStatus,
            toRoundNum,
        };
    },

    filter: {

    }
};
</script>
  
<style scoped lang="scss" src="./index.scss"></style>