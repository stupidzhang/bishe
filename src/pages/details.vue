<template>
    <div>
        <div class="text-align-center font-size12 margin-top30" >介绍</div>
        <div class="text-align-center margin-top30" v-for="(item,index) in result" :key="index">{{item.name}}<div>{{item.score}}</div></div>
        <div class=" text-align-center margin-bototm60">
        <img :src="img" class="plant">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      img: '',
      token: '',
      imgBase: '',
      result: []
    }
  },
  mounted () {
    this.img = this.$route.query.image
    this.getApi()
  },

  methods: {
    base64 ({url}) {
      return new Promise((resolve, reject) => {
        wx.getFileSystemManager().readFile({
          filePath: url, // 选择图片返回的相对路径
          encoding: 'base64', // 编码格式
          success: res => {
            //   'data:image/' + type.toLocaleLowerCase() + ';base64,' +
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
      this.$wxhttp.get(
        {
          url: '/oauth/2.0/token?' + param,
          agent: false
        }
      ).then(res => {
        this.token = res.access_token
        console.log(this, 'li')
      })
      //   console.log(this.token, this.img, 'wat')
      this.base64({
        url: this.img
        // type: 'png'
      }).then(res => {
        this.imgBase = res
        // res是base64路径
        const param2 = qs.stringify({
          'access_token':
          //   this.token,
          '24.792949228fc0e1fc90cee6394dfa7882.2592000.1580200418.282335-17735891',
          'image': encodeURI(res),
          'baike_num': 1

        })
        console.log(this.$wxhttp, '---')
        const that = this
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?' + param2,

          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            that.result = res.data.result
            console.log(res, that.result)
          }
        }).then(res => {
          that.result = res.result
          console.log(that.result, '22')
        })
      })
      console.log('ljlj', this.imgBase, 'ddd')
    }
  }
}
</script>
<style lang="scss" scoped>
.plant{
    width:200rpx;
    height:200rpx;
}
</style>