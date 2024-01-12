<template>
    <div class="edit-address-container">
        <van-address-edit
  :area-list="areaList"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @change-detail="onChangeDetail"
/>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { areaList } from '@vant/area-data'
  import { showToast } from 'vant';
  import { useStore } from "vuex";
  export default {
    name: "editAddress",
    setup() {
        const $store = useStore();
        const onSave = (data) => {
            $store.dispatch('adress/addAdress', data);
        };

        const onChangeDetail = (val) => {
        };

    return {
      onSave,

      areaList,
      onChangeDetail,
    };
  },
  };
  </script>
  
  <style scoped lang="scss">
  .edit-address-container {
    height: 100%;
    overflow-x: hidden;
    // padding: 0 16px;
  }
  </style>
  