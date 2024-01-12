<template>
    <div class="login-container">
        <div class="header-container">
            <van-icon @click="$router.go(-1)" name="arrow-left" />
        </div>
        <div class="main-container">
            <div class="title">
                欢迎登录
            </div>
            <div class="content">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field
                        v-model="username"
                        name="user"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                        />
                        <van-field
                        v-model="password"
                        type="password"
                        name="pwd"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button class="mg-t-lg" block type="danger" native-type="submit">
                        登录
                        </van-button>
                    </div>
                    </van-form>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { useStore } from "vuex";
export default {
    name: 'login',
    setup() {
    const $store = useStore();
    const username = ref('');
    const password = ref('');
    const onSubmit = (values) => {
        // TODO: 加密待处理
        $store.dispatch('user/login', values);
    };

    return {
      username,
      password,
      onSubmit,
    };
  },

}
</script>
<style scoped lang="scss" src="./index.scss"></style>