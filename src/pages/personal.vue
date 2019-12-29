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
import img1 from '@/assets/images/icon/heart-active.png'

export default {
  data () {
    return {
      userdata: [{name: '我的收藏', icon: icon2
      },
      {name: '附近的搜索', icon: icon1
      }, {name: '联系我们', icon: icon2
      }

      ]
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    theGetUserInfo () {
      getUserInfo()
    },
    getApi () {
      // var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
    //   console.log(require('baidu-aip-sdk'), '0000s')
      var APP_ID = 'wx4ee8079852e7d6bf'
      var API_KEY = 'iiSMXGQk0KvLx3leMiSQTq7L'
      var SECRET_KEY = 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'

      // 新建一个对象，建议只保存一个对象调用服务接口
      //   var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY)
      var qs = require('querystring')
      const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'iiSMXGQk0KvLx3leMiSQTq7L',
        'client_secret': 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'
      })
      this.$wxhttp.post(
        {
          url: '/oauth/2.0/token?' + param,
          agent: false
        },
        function (res) {
        // 在标准输出中查看运行结果
          console.log(res)
        }
      )
      // var fs = require('fs');

      // var image = img1.toString("base64");
      // // 调用通用物体识别
      // client.plantDetect(image).then(function(result) {
      //     console.log(JSON.stringify(result));
      // }).catch(function(err) {
      //     // 如果发生网络错误
      //     console.log(err);
      // });

      // 如果有可选参数
      // var options = {};
      // options["baike_num"] = "5";

      // // 带参数调用通用物体识别
      // client.plantDetect(image, options).then(function(result) {
      //     console.log(JSON.stringify(result));
      // }).catch(function(err) {
      //     // 如果发生网络错误
      //     console.log(err);
      // });
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
