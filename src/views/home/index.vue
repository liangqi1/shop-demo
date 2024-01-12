<template>
  <div class="home-container" ref="home-container" @scroll="onScroll">
    <!-- 搜索框 -->
    <div class="search-container">
      <SearchBar @searchValue="searchValue"></SearchBar>
    </div>
    <van-pull-refresh v-model="loading" @refresh="refreshProdcutList">

      <!-- 轮播图 -->
      <div class="swipe-container">
        <SwipeBanner></SwipeBanner>
      </div>

      <!-- 商品 -->
      <section class="product-container">
        <ul class="product-content">
          <li v-for="(item, index) in list" :key="index">
            <ProductItem :record="item" :key="index"></ProductItem>
          </li>
        </ul>
      </section>

      <van-divider v-if="list.length > 30">到底了</van-divider>
    </van-pull-refresh>
  </div>

  <LoginFloat v-if="!isLogin"></LoginFloat>
</template>

<script>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, nextTick } from 'vue'
import { mapGetters, mapState } from 'vuex'
import { GetImgUrl, IsEmptyStr, uniqueArray } from '@/utils/utils.js'
import { fetchProductList } from '@/http/http.js'
import LoginFloat from "@/components/loginFloat/index.vue";
import SearchBar from "@/components/home/searchBar.vue";
import SwipeBanner from "@/components/home/swipeBanner.vue";
import ProductItem from "@/components/home/productItem.vue";

// 固定商品
const TEMP_PRODUCT = { id: '0', name: 'Bally/巴利女士收纳包 WLO01GVT323I3D7Y1 夜皇后', currency: '¥', price: 100.2, img: GetImgUrl('product/product_1_400x400.jpeg') }
export default {
  name: "home",
  components: {
    LoginFloat,
    SearchBar,
    SwipeBanner,
    ProductItem,
  },

  setup() {
    const { ctx } = getCurrentInstance();
    const homeContainerRef = ref(null)
    const loading = ref(true);
    let filterV = ''
    const state = reactive({
      list: [TEMP_PRODUCT],
    });

    onMounted(async () => {
      const data = await ctx.getProductList() || []
      state.list = [...state.list, ...data];
      loading.value = false;
    });

    // 监听滚动
    const onScroll = async (e) => {
      if (e && e.srcElement) {
        const { scrollTop, clientHeight, scrollHeight } = e.srcElement;
        if (scrollTop + clientHeight + 10 >= scrollHeight) {
          filterData(filterV)
        }
      } else {
        console.log('获取不到页面高度')
        return
      }
    }

    // 查询商品关键字
    const searchValue = async (v) => {
      filterV = v
      filterData(v)
    }

    /** TODO: 过滤数据，后续修改为后端处理 */
    const filterData = async (v) => {
      const data = await ctx.getProductList() || []
      const totalData = [...state.list, ...data];
      let resultData = []
      if (!IsEmptyStr(v)) {
        const filterData = totalData.filter(item => {
          const reg = new RegExp(v, 'i')
          return reg.test(item.name)
        })
        resultData = [...filterData, TEMP_PRODUCT]
      } else {
        resultData = totalData
      }
      // 设置max max
      if (resultData.length >= 32 ) return
      state.list = [...resultData]
    }

    return {
      ...toRefs(state),
      homeContainerRef,
      loading,
      onScroll,
      searchValue,
    }
  },
  methods: {
    async refreshProdcutList() {
      const res = await fetchProductList()
      this.list = [...res];
      this.loading = false;
    },
    async getProductList() {
      const res = await fetchProductList()
      this.loading = false;
      return res
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  }
}
</script>
<style scoped lang="scss" src="./index.scss"></style>