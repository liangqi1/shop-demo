<template>
    <div class="login-float-container">
        <div class="left">登录后享受更多服务</div>
        <div class="right">
            <router-link to="/login" tag="span">
                <van-button class="btn" round size="small" type="danger">立即登录</van-button>
            </router-link>
          
        </div>

    </div>
</template>
<script>
export default {
  name: "logginFloat",
}
</script>
<style scoped lang="scss" src="./index.scss"></style>