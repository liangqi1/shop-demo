<template>
<van-swipe :autoplay="3000" indicator-color="white" lazy-render>
  <van-swipe-item v-for="image in images" :key="image">
    <img class="banner-img" :src="image" />
  </van-swipe-item>
</van-swipe>
</template>
<script>
import { GetImgUrl } from '@/utils/utils.js'
export default {
    name: 'swipeBanner',
    setup() {
    const images = [
        GetImgUrl('banner/banner-2.jpg'),
        GetImgUrl('banner/banner-3.jpg'),
        GetImgUrl('banner/banner-4.jpg'),
    ];
    return { images };
  },
}
</script>
<style scoped lang="scss">
.banner-img {
    border-radius: 10px;
    width: 100%;
}
</style>