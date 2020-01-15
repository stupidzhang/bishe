<template>
  <div>
    <div class="text-align-center font-size12 margin-top30">介绍</div>
    <ul class="paddingX40 line-height50 font-size4 text-align-center">
      <li v-if="plantDes.description" class="content">
        {{ plantDes.description }}<span class="font-size2 color-blue">地域分布</span>
      </li>
      <li v-else class="margin-top30">
        <div>{{ plant.name }}</div>
        抱歉，百度接口内未提供介绍
      </li>
      <li><img :src="plantDes.image_url" class="plant" /></li>
    </ul>
    <div class=" text-align-center margin-bototm60">
      <img :src="img" class="plant" />
      <!-- <div   v-for="(item,index) in judgeFavorList"
      :key="index"> -->
      <img
    
        class="icon"
        :src="isFavor ? iconActive : icon"
        @click="showFavor"
      />
      <!-- </div> -->
    </div>
    <div class=" text-align-center">也可能是他们</div>
    <div class="flex">
      <ul
        class="other-plant margin-top30"
        v-for="(item, index) in data1"
        :key="index"
      >
        <li>{{ item.name }}</li>
        <li><img :src="item.baike_info.image_url" class="img" /></li>
        <!-- <li>匹配率： {{item.score}}</li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import icon from '../assets/images/icon/heart-empty.png'
import iconActive from '../assets/images/icon/heart-active.png'
import {JUDGEFAVOR_LIST, ADDPLANT_LIST, PLANT_LIST} from '@/mixin'
export default {
  mixins: [JUDGEFAVOR_LIST, ADDPLANT_LIST, PLANT_LIST],
  data () {
    return {
      img: '',
      token: '',
      imgBase: '',
      data1: [],
      plant: [],
      plantDes: '',
      icon,
      iconActive,
      isFavor: false,
      list: []
    }
  },
  onLoad () {
    this.img = this.$route.query.image
    this.getApi()
  },
  computed: {

  },
  methods: {
    base64 ({ url }) {
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
    async getApi () {
      var qs = require('querystring')
      const that = this
      const param = qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'iiSMXGQk0KvLx3leMiSQTq7L',
        client_secret: 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'
      })
      //   return new Promise((resolve, reject) => {
      that.$wxhttp
        .get({
          url: '/oauth/2.0/token?' + param,
          agent: false
        })
        .then(res => {
          that.token = res.access_token
          that.base64({
            url: that.img
          }).then(res2 => {
            that.imgBase = res2
            that.getPlant(res.access_token, res2)
          })
        })
    //   })
    },
    async getPlant (token, url) {
      var qs = require('querystring')
      const param2 = qs.stringify({
        access_token: token,
        baike_num: 5
      })

      const that = this
      //   return new Promise((resolve, reject) => {
      wx.request({
        url:
            'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?' +
            param2,
        data: { image: url },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
        //   resolve(res.data.result)
          that.data1 = res.data.result
          that.plant = that.data1[0]
          that.data1 = that.data1.slice(1)
          that.plantDes = res.data.result[0].baike_info
          console.log(that.plant, that.data1, '88')
          that.isRepeat(that.plant.name)
        }
      })
    //   })
    },
    showFavor () {
      this.isFavor = !this.isFavor
    },
    judgeAll (v) {
      this.judgeList({isRefresh: true, keyWord: v})
      //   this.getList({isRefresh: true, keyWord: v, type: true})
    },
    async isRepeat (v) {
    //   await this.judgeAll(v)
      wx.cloud
        .callFunction({
          name: 'plantName',
          data: {
            keyWord: v,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res.result.data, res.result.data.length)
          if (res.result.data.length === 0) {
            this.addList({name: this.plant.name, city: this.$store.state.city, description: this.plantDes.description, image: this.plantDes.image_url, isFavor: false})
            console.log(this.plant.name, this.$store.state.city, this.plantDes.description, this.plantDes.image_url)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
    text-indent:2em;
    padding:40rpx;
    text-align: left;
}
.plant {
  width: 200rpx;
  height: 200rpx;
}
.icon {
  width: 50rpx;
  height: 50rpx;
}
.other-plant {
  li {
    width: 100rpx;
    margin: 20rpx 300rpx 0 100rpx;
  }
  .img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 40rpx;
  }
}
</style>
