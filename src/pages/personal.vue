<template>
  <div>
    <section class="bgcolor-green color-white font-size12" style="height: 30vh">
        <div v-if="isLogin" class="height100 flex-column flex-align-justify">
            <open-data type="userAvatarUrl" class="user-avatar"></open-data>
            <open-data type="userNickName" class="margin-top20"></open-data>
        </div>
        <div v-else class="height100 flex-align-justify">
            <div class="icon-cat default-avatar"></div>
        </div>
    </section>
    <section v-if="!isLogin" class="the-mask">
        <div class="fixed bottom0 left0 right0 paddingX40 bgcolor-white" style="height: 20vh">
            <p class="padding20X text-align-center color-999">请先登录</p>
            <button open-type="getUserInfo" @getuserinfo="theGetUserInfo" class="width100 border-radius8 color-white" style="background-color: #32AE57">微信快捷登录</button>
        </div>
    </section>
    <section v-else>
        <div v-for="(item,index) in userdata" :key="index" class="myperson">
            <ul class=" font-size10 margin-bottom35 margin-left20" ><li>{{item}}<img class="icon" src="../../static/img/plant.png"></li></ul></div>
    </section>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/business'
export default {
    data(){
        return{
            userdata:["我的收藏","搜索排行","联系我们"]
        }
    },
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },
    methods: {
        theGetUserInfo() {
            getUserInfo()
        }
    }
}
</script>
<style scoped lang="scss">
.user-avatar {
    width: 160rpx;
    height:160rpx;
    border-radius: 50%;
    overflow: hidden;
    border: 2rpx solid #fff;
    box-shadow: 0 0 10rpx gray;
}
.default-avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    font-size: 160rpx;
    border: 2rpx solid #fff;
}
.myperson{
    border-bottom:1rpx solid grey;
    opacity: 0.2;
    height:80rpx;
    line-height: 80rpx;
}
.icon{
    height:40rpx;
    width:40rpx;
    margin-left:20rpx;
}
</style>
