
<template>
  <BackHeader 
  v-if="this.$route.meta.showBackHeader" 
  :title="this.$route.meta.title"
  :bgColor="this.$route.meta.backBarBgColor"
  >
</BackHeader>
  <router-view class="router-view" />
  <Tabbat v-if="this.$route.meta.showTabbar"></Tabbat>
</template>
  
<script>
import Tabbat from "@/components/tabbar/index.vue";
import BackHeader from "@/components/backHeader/index.vue";
export default {
  name: "layout",
  components: {
    Tabbat,
    BackHeader
  },
};
</script>
  
<style lang="scss" scoped>
/*切换样式出错处理*/
.router-view {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>
  