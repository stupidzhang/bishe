<template>
    <div>
        <div class="text-align-center font-size12 margin-top30" >介绍</div>
        <div class="text-align-center margin-top30" >{{plant.name}}
         <ul>
            <!-- <li>{{plant.baike_info}}</li> -->
        <!-- <li><img :src="plant.baike_info.image_url"  class="other-plant" /></li> -->
        </ul></div>
        <div class=" text-align-center margin-bototm60">
        <img :src="img" class="plant">
        </div>
        <div>也可能是他们</div>
        <ul class="margin-top30 flex" v-for="(item,index) in data1" :key="index"><li>{{item.name}}
        <li><img :src="item.baike_info.image_url"  class="other-plant" /></li>
        <li>匹配率： {{item.score}}</li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      img: '',
      token: '',
      imgBase: '',
      data1: [],
      plant: []
    }
  },
  created () {
  },
  mounted () {
    this.img = this.$route.query.image
    this.getApi()
    console.log(this.data1, 'data1')
  },

  methods: {
    base64 ({url}) {
      return new Promise((resolve, reject) => {
        wx.getFileSystemManager().readFile({
          filePath: url,
          encoding: 'base64',
          success: res => {
            resolve(res.data)
            console.log(res, 'success')
          },
          fail: res => {
            reject(res.errMsg)
            console.log(res.errMsg, 'fail')
          }
        })
      })
    },
    getApi () {
      var qs = require('querystring')
      const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'iiSMXGQk0KvLx3leMiSQTq7L',
        'client_secret': 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'
      })
      return new Promise((resolve, reject) => {
        this.$wxhttp.get(
          {
            url: '/oauth/2.0/token?' + param,
            agent: false
          }
        ).then(res => {
          this.token = res.access_token
        })
        this.base64({
          url: this.img
        }).then(res => {
          this.imgBase = res
          this.getPlant(res)
        })
      })
    },
    getPlant (url) {
      var qs = require('querystring')
      const param2 = qs.stringify({
        'access_token':
        // this.token
          '24.792949228fc0e1fc90cee6394dfa7882.2592000.1580200418.282335-17735891',
        'baike_num': 5

      })

      const that = this
      return new Promise((resolve, reject) => {
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?' + param2,
          data: { 'image': url
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            resolve(res.data.result)
            that.data1 = res.data.result
            that.plant = that.data1[0]
            console.log(that.plant, that.data1[0])
          }

        })
        console.log(this.plant, that.plant, this, 'wai')
      }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.plant{
    width:200rpx;
    height:200rpx;
}
.other-plant{
width:150rpx;
height:150rpx;
border-radius: 40rpx;
}
</style>