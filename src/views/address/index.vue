<template>
    <div class="shipping-address">
  
      <section v-for="(item, index) in stateAdressList" :key="index" class="address-card">
        <ul class="card-content">
      
          <li class="addres-svg">
            <van-icon name="wap-home-o" />

          </li>
          <li class="card-info">
            <div class="info-name">
              <span>{{ item.name}}</span>
            </div>
            <div class="info-address">
              <span>{{ item.province }}{{ item.city }}{{ item.county }}{{ item.addressDetail }}</span>
        
            </div>
            <span class="text-align-l">{{ item.tel }}</span>
          </li>
        </ul>
      </section>
  
      <div class="address-btn">
        <router-link to="/mine/address/new"  tag="span">
            <van-button plain type="danger" icon="plus" size="large">新增地址</van-button>
        </router-link>
        
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  export default {
    name: "address",
    setup() {
      const $store = useStore();
      const stateAdressList = computed(() => $store.state.adress.adressList);

      return {
        stateAdressList
      };
    },
  };
  </script>
  
  <style scoped lang="scss" src="./index.scss"></style>
  