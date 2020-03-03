<template>
  <div class="skeleton">
    <skeleton selector="skeleton" bgcolor="#81817b" v-if="showSkeleton"></skeleton>
    <!-- <van-skeleton v-if="showSkeleton" title avatar :row="25" style="background-color:#333" /> -->
    <div class="main">
      <div class="text-align-center padding-top100">
        <img :src="img" class="plant" />
        <div class="name margin-top20 font-size14 color-bg">{{ plant.name }}  <img
         v-if="plant.name!=='非植物'"
            class="icon-empty"
            :src="isFavor ? iconActive : icon"
            @click="showFavor"
          /></div>
      </div>
      <div class="text-align-center search" v-if="plantDes.description">
        <div class="flex-align">
          <div v-if="plantDes.description" class="paddingX30 padding20X">
            <img :src="plantDes.image_url" class="plant2" />
          </div>
          <div class="margin-top20">
            <div class="content color-white" v-if="plantDes.description">
              {{ plantDes.description }}
            </div>
          </div>
        </div>
        <div class="more flex margin-top20" v-if="plantDes.description">
          <span class="color-white padding-left30 ">也可能是他们：</span>
          <ul
            class="other-plant"
            v-for="(item, index) in data1"
            :key="index"
            @click="otherDetial(item)"
          >
            <li class="color-green">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div class="text-align-center flex-align-justify  search" v-if="!plantDes.description">
        <div class="margin-top30 color-white">抱歉，百度接口内未提供介绍</div>
      </div>
      <Overlay
        v-if="otherList"
        :data="otherList"
        :show="show"
        @close="close"
      ></Overlay>
    </div>
  </div>
</template>
<script>
import {
  ADDFAVOR_LIST,
  DELFAVOR_LIST,
  ADDPLANT_LIST,
  PLANT_LIST,
  UPDATEPLANT_LIST,
  ADDAREA_LIST,
  AREA_LIST, NEWAREA_LIST
} from '@/mixin'
import Overlay from '../../components/popup'
import skeleton from '../../components/skeleton'
export default {
  mixins: [
    ADDFAVOR_LIST,
    DELFAVOR_LIST,
    ADDPLANT_LIST,
    PLANT_LIST,
    UPDATEPLANT_LIST,
    ADDAREA_LIST,
    AREA_LIST, NEWAREA_LIST
  ],
  components: { skeleton, Overlay },
  data () {
    return {

      img: '',
      token: '',
      imgBase: '',
      data1: [],
      plant: [],
      plantDes: '',
      icon:
        'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/heart-white.png',
      iconActive:
        'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/heart-active.png',
      isFavor: false,
      show: false,
      otherList: {},
      showSkeleton: true,
      areaList: []
    }
  },
  watch: {
    otherList (val, oldVal) {
      this.otherList = val
      console.log(this.otherList, 'watch')
    }
  },
  onLoad () {
    this.show = false
    this.img = this.$route.query.image
    this.showSkeleton = true
    this.getApi()
    console.log(this.$store.state.openId)
  },
  computed: {},
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
            wx.showToast({title: '该图片格式不支持，请重试', icon: 'none'})
            reject(res.errMsg)
            console.log(res.errMsg, 'fail')
          }
        })
      })
    },
    async getApi () {
      console.log('base64里')
      var qs = require('querystring')
      const that = this
      const param = qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'iiSMXGQk0KvLx3leMiSQTq7L',
        client_secret: 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'
      })
      that.$wxhttp
        .get({
          url: '/oauth/2.0/token?' + param,
          agent: false
        })
        .then(res => {
          that.token = res.access_token
          that
            .base64({
              url: that.img
            })
            .then(res2 => {
              that.getPlant(res.access_token, res2)
            })
        })
    },
    async getPlant (token, url) {
      console.log('getplantdeurl')
      var qs = require('querystring')
      const param2 = qs.stringify({
        access_token: token,
        baike_num: 5
      })

      const that = this
      wx.request({
        url:
          'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?' + param2,
        data: { image: url },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res, 'error')
          if (!res.data.error_msg) {
            that.data1 = res.data.result
            that.plant = that.data1[0]
            that.data1 = that.data1.slice(1)
            that.plantDes = res.data.result[0].baike_info
            that.imgBase = 'data:image/png;base64,' + url
            console.log(that.plant, that.data1, '88')
            that.isRepeat(that.plant.name)
          } else if (res.data.error_code === 216201) {
            wx.showToast({title: '图片格式错误，请重试！', icon: 'none'})
            setTimeout(() => {
              that.$router.go(-1)
            }, 2000)

            console.log(res.data.error_msg)
          } else if (res.data.error_code === 17) {
            wx.showToast({title: '每日可用识别量已用完！', icon: 'none'})
            setTimeout(() => {
              that.$router.go(-1)
            }, 2000)
          } else {
            wx.showToast({title: '请联系开发者', icon: 'none'})
            setTimeout(() => {
              that.$router.go(-1)
            }, 2000)
            console.log(res.data.error_msg)
          }
        }
      })
    },
    showFavor () {
      if (this.isFavor) {
        this.delFavor({ openId: this.$store.state.openId, name: this.plant.name })
        this.updateList({ name: this.plant.name, isFavor: false })
        wx.showToast({ title: '取消收藏', icon: 'none' })
      } else {
        this.addFavor({
          openId: this.$store.state.openId,
          name: this.plant.name,
          city: this.$store.state.city,
          description: this.plantDes.description || '暂无详细说明',
          image: this.plantDes.image_url
            ? this.plantDes.image_url
            : this.imgBase
        })
        this.updateList({ openId: this.$store.state.openId, name: this.plant.name, isFavor: true })
        wx.showToast({ title: '收藏成功', icon: 'none' })
      }
      this.isFavor = !this.isFavor
    },
    async isRepeat (v) {
      //   await this.judgeAll(v)
      wx.cloud
        .callFunction({
          name: 'plantName',
          data: {
            openId: this.$store.state.openId,
            keyWord: v,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res.result.data, res.result.data.length)
          if (res.result.data.length === 0 && this.plant.name !== '非植物') {
            console.log(this.$store.state.province, 'sheng')
            this.addList({
              openId: this.$store.state.openId,
              name: this.plant.name,
              city: this.$store.state.city,
              province: this.$store.state.province,
              description: this.plantDes.description,
              image: this.plantDes.image_url
                ? this.plantDes.image_url
                : this.imgBase,
              isFavor: false
            })
            wx.cloud
              .callFunction({
                name: 'area',
                data: {
                  openId: this.$store.state.openId,
                  name: this.$store.state.province
                }
              })
              .then(res => {
                console.log(res.result.data, 'res')
                if (res.result.data.length !== 0) {
                  res.result.data[0].value.push(this.plant.name)
                  this.areaList = res.result.data[0].value
                  this.addAreaList({
                    openId: this.$store.state.openId,
                    name: this.$store.state.province,
                    value: this.areaList
                  })
                } else {
                  console.log('新的省份')
                  this.areaList.push(this.plant.name)
                  this.newAreaList({
                    openId: this.$store.state.openId,
                    name: this.$store.state.province,
                    value: this.areaList
                  })
                }
              })
            console.log(
              this,
              this.addAreaList,
              this.plant.name,
              this.$store.state.city,
              this.plantDes.description,
              this.plantDes.image_url
            )
          } else if (this.plant.name !== '非植物') {
            this.isFavor = res.result.data[0].isFavor
          }
        })
      this.showSkeleton = false
    },
    otherDetial (val) {
      this.otherList = {}
      //   if (typeof val.score !== 'string') { val.score = val.score.toFixed(3) * 100 + '%' }
      if (!val.baike_info || !val.baike_info.description) {
        delete val.baike_info
      }
      this.otherList = val
      console.log(typeof this.otherList.score, '//')
      this.show = true
      console.log(this.otherList, '另植可收藏')
    },
    close () {
      this.show = false
      console.log('关闭')
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  background: #81817b;
  text-align: center;
  height: 1200rpx;
}
.content {
  height: 260rpx;
  overflow: auto;
  padding-right:5rpx;
  text-align: left;
}
.plant {
  width: 400rpx;
  height: 400rpx;
  border-radius: 50rpx;
  margin-bottom: 20rpx;
  border:1px solid white;
}
.plant2 {
  width: 240rpx;
  height: 240rpx;
  border-radius: 25rpx;
  margin-top: 10rpx;
}
.search {
  background: #303030c4;
  height: 440rpx;
  width: 80%;
  margin-left: 10%;
  margin-top: 60rpx;
  border:1px solid white;
}
.icon {
  width: 50rpx;
  height: 50rpx;
  position: relative;
  right:-60rpx;
}
.icon-empty{
  width: 50rpx;
  height: 50rpx;
vertical-align: middle;
}
.other-plant {
  li {
    margin-right: 40rpx;
  }
}
</style>
