<template>
  <div>
    <section class="bgcolor-green color-white font-size12" style="height: 30vh">
      <div v-if="isLogin" class="height100 flex-column flex-align-justify">
        <open-data type="userAvatarUrl" class="user-avatar"></open-data>
        <open-data type="userNickName" class="margin-top20"></open-data>
      </div>
      <div v-else class="height100 flex-align-justify">
        <div class="icon-search default-avatar"></div>
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
    </section>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/business'
export default {
  data () {
    return {
      userdata: [
        {
          name: '我的收藏',
          icon: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/heart-active.png'
        },
        {
          name: '我搜索的区域',
          icon: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/earth.png'
        },

        {
          name: '最热植物',
          icon: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/hot.png'
        }
      ],
      token: '',
      imgBase: '',
      test: '1',
      show: false,
      value: 4,
      prov: [],
      prov1: []
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  onLoad () {
    this.getArea()
  },
  methods: {
    theGetUserInfo () {
      getUserInfo()
      setTimeout(() => { this.getArea() }, 2000)
    },
    getArea () {
      wx.cloud
        .callFunction({
          name: 'area',
          data: {
            openId: this.$store.state.openId
          }
        })

        .then(res => {
          console.log(res.result.data, 'res')
          this.$store.commit(this.$types.SET_PROVLIST, res.result.data)
          this.prov = res.result.data
        })
      wx.cloud
        .callFunction({
          name: 'area'
        })

        .then(res => {
          console.log(res.result.data, 'res')
          this.$store.commit(this.$types.SET_PROVLISTALL, res.result.data)
          this.prov1 = res.result.data
        })
    },
    toPage (index) {
      console.log(index, 'dianiji')
      if (index === 0) {
        this.$router.push({
          path: 'favorite'
        })
      } else if (index === 1) {
        this.$router.push({
          path: 'otherSearch',
          query: {
            sear: this.prov
          }
        })
      } else {
        this.$router.push({
          path: 'mostSearch'
        })
      }
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

</style>
