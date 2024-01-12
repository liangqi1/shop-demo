<template>
    <van-nav-bar class="fix-bar"
    :style="styleObj"
        :title="title"
        left-arrow
        @click-left="$router.go(-1)"
/>
</template>
<script>
export default {
    name: 'backHeader',
    props: ['bgColor', 'title'],
    data() {
        return {
            styleObj: {
            'background-color': this.bgColor || 'white'
            }
        }
    },
    mounted() {
    }
}
</script>
<style scoped lang="scss">
  .fix-bar {
    ::v-deep .van-nav-bar__arrow {
        font-size: 24px;
        color: #323233;
    }
  }

</style>