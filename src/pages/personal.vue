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
      <div
        class="fixed bottom0 left0 right0 paddingX40 bgcolor-white"
        style="height: 20vh"
      >
        <p class="padding20X text-align-center color-999">请先登录</p>
        <button
          open-type="getUserInfo"
          @getuserinfo="theGetUserInfo"
          class="width100 border-radius8 color-white"
          style="background-color: #32AE57"
        >
          微信快捷登录
        </button>
      </div>
    </section>
    <section v-else>
      <van-grid :column-num="2">
        <van-grid-item
          v-for="(item, index) in userdata"
          :key="index"
          :icon="item.icon"
          :text="item.name"
          @click="toPage(index)"
        />
      </van-grid>
  <!-- <van-grid :column-num="1" >
        <van-grid-item
        v-if="!show"
          :icon="icon3"
          text="给我评分"
          @click="rate"
        />
        <van-rate v-if="show" v-model="value" @change="change(v)"   class="text-align-center"></van-rate>
      </van-grid> -->
      
    </section>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/business'
import icon1 from '@/assets/images/icon/plant.png'
import icon2 from '@/assets/images/icon/heart-active.png'
import icon3 from '@/assets/images/icon/star.png'
export default {
  data () {
    return {
      userdata: [
        {
          name: '我的收藏',
          icon: icon2
        },
        {
          name: '附近的搜索',
          icon: icon1
        }
        // ,
        // {
        //   name: '给我评分',
        //   icon: icon3
        // }
      ],
      token: '',
      imgBase: '',
      test: '1',
      show: false,
      value: 4,
      icon3
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  mounted () {
  },
  methods: {
    theGetUserInfo () {
      getUserInfo()
    },
    toPage (index) {
      console.log(index, 'dianiji')
      if (index === 0) {
        this.$router.push({
          path: 'favorite'
        })
      } else {
        this.$router.push({
          path: 'otherSearch'
        })
      }
    },
    rate () { this.show = true },
    change (v) {
      console.log(v, '打分')
      wx.showToast({title: '感谢您给我打了' + v + '分', icon: 'none'})
      this.show = false
    }
  }
}
</script>
<style scoped lang="scss">
.user-avatar {
  width: 160rpx;
  height: 160rpx;
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
.myperson {
  border-bottom: 1rpx solid #e2e2e2;
  height: 80rpx;
  line-height: 80rpx;
  margin-left: 20rpx;
}
.icon {
  height: 50rpx;
  width: 50rpx;
  margin-right: 20rpx;
  float: right;
  margin-top: 10rpx;
}
</style>
