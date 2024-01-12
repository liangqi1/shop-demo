<template>
    <van-search
    v-model="value"
    shape="round"
    @search="onSearch"
    @clear="onClear"
    background="#e0e2ed"
    placeholder="搜索商品关键词"
    />
</template>
<script>
import { ref } from 'vue';
export default {
  name: "searchBar",
  setup(props, ctx) {
    const value = ref('');
    const onSearch = (val) => {
      ctx.emit('searchValue', val)
    };
    const onClear = (e) => {
      ctx.emit('searchValue', '')
    };
    return {
      value,
      onSearch,
      onClear,
    };
  },
}
</script>