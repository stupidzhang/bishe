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
            <ul class=" font-size10 margin-bottom35 margin-left20" ><li @click="getApi">{{item.name}}<img class="icon" :src="item.icon"></li></ul></div>
    </section>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/business'
import icon1 from '@/assets/images/icon/plant.png'
import icon2 from '@/assets/images/icon/heart-active.png'
// import img1 from '../../static/img/film.png'
export default {
  data () {
    return {
      userdata: [{name: '我的收藏', icon: icon2
      },
      {name: '附近的搜索', icon: icon1
      }, {name: '联系我们', icon: icon2
      }

      ],
      token: '',
      imgBase: '',
      test: '1'
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  mounted () {
    console.log(this.token, this.imgBase, 'wai')
  },
  methods: {
    theGetUserInfo () {
      getUserInfo()
    }
    // base64 ({url, type}) {
    //   return new Promise((resolve, reject) => {
    //     wx.getFileSystemManager().readFile({
    //       filePath: url, // 选择图片返回的相对路径
    //       encoding: 'base64', // 编码格式
    //       success: res => {
    //         //   'data:image/' + type.toLocaleLowerCase() + ';base64,' +
    //         resolve(res.data)

    //         console.log(res, 'success')
    //       },
    //       fail: res => {
    //         reject(res.errMsg)
    //         console.log(res.errMsg, 'fail')
    //       }
    //     })
    //   })
    // },

    // getApi () {
    //   var qs = require('querystring')
    //   const param = qs.stringify({
    //     'grant_type': 'client_credentials',
    //     'client_id': 'iiSMXGQk0KvLx3leMiSQTq7L',
    //     'client_secret': 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'
    //   })
    //   this.$wxhttp.post(
    //     {
    //       url: '/oauth/2.0/token?' + param,
    //       agent: false
    //     }
    //   ).then(res => {
    //     this.token = JSON.stringify(res.access_token)
    //     console.log(this.token, 'li')
    //   })

    //   this.base64({
    //     url: img1,
    //     type: 'png'
    //   }).then(res => {
    //     this.imgBase = res
    //     console.log('ljlj', this.imgBase, 'ddd', res)// res是base64路径
    //   })

    //   const param2 = qs.stringify({
    //     'access_token': this.token,
    //     // '24.792949228fc0e1fc90cee6394dfa7882.2592000.1580200418.282335-17735891',
    //     'image': this.imgBase

    //   })
    //   this.$wxhttp.post(
    //     {
    //       url: '/rest/2.0/image-classify/v1/plant?' + param2
    //     }
    //   ).then(res => {
    //     console.log(res)
    //   })
    // }
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
    border-bottom:1rpx solid #e2e2e2;
    height:80rpx;
    line-height: 80rpx;
    margin-left:20rpx;
 
}
.icon{
    height:50rpx;
    width:50rpx;
    margin-right:20rpx;
    float:right;
    margin-top:10rpx;
}
</style>
