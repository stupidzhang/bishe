<template>
  <div class="home clear">
    <main class="fixed top0 width100" style="height: calc(100% - 2rpx)">
      <scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
        <header
          class="flex-align-spacebetween"
          style="height: 80rpx"
        >
          <a
            class="flex-align paddingX20"
            @tap="$router.push('/pages/search/select_city')"
          >
            {{ curCity }}
            <i class="icon-uparrow rotate180 color-999"></i>
          </a>
          <a
            class="height100 padding-left20 padding-right30 flex-align-justify"
            @tap="$router.push('search')"
          ><span class="color-green margin-right20 opacity_5">查已搜索植物</span>
            <i class="icon-search font-size8 bold color-green"></i>
          </a>
        </header>
        <div >
            <div class="daily-all text-align-center">
            <div class="daily">
                 <img :src="dailyFlower.imgBack" class="back" />
            </div>
            <div class="margin-top20 font-size6 color-blue">--每日花卡--</div>
            <div class="margin-top20 font-size2">我是{{dailyFlower.name}}</div>
            <div class="margin20X font-size2">{{dailyFlower.word}}</div>
            </div>
         
        </div>
         <div class="text-align-center camera">
            <img :src="img" class="img-plant" @click="open" />
          </div>
      </scroll-view>
    </main>
  </div>
</template>
<script>

export default {

  data () {
    return {
      img: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/camera2.png',
      flower: [{imgBack: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/fenxz.jpg', name: '风信子', word: '燃生命之火,享丰富人生'},
        {imgBack: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/mtx.jpg', name: '满天星', word: '思念、清纯、不可或缺'},
        {imgBack: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/lmo.jpg', name: '罗密欧', word: '浓'},
        {imgBack: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/cj.jpg', name: '雏菊', word: '希望、纯洁的美以及深藏在心底的爱'},
        {imgBack: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/www.jpg', name: '勿忘我', word: '永恒的爱永远的回忆'},
        {imgBack: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/njc.jpg', name: '酢浆草', word: '璀璨的心'},
        {imgBack: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/knx.png', name: '康乃馨', word: '爱，魅力，尊敬之情'}
      ],
      filePaths: '',
      cityName: '', // 接口获得的当前地理位置
      province: ''
    }
  },
  onShow () {
    // if (this.headerTab === 2) {
    //   this.getList({ isRefresh: true })
    // }
  },
  computed: {
    curCity () {
      return this.$store.state.city
    },
    dailyFlower () {
      var week = new Date()
      var weekday = week.getDay()
      console.log(weekday, 'wd')
      if (weekday === 0) {
        return this.flower[6]
      }
      return this.flower[weekday - 1]
    }
  },
  onLoad () {
    this.getCity()
  },
  methods: {
    getCity () {
      let scope = this
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          console.log(res)
          wx.request({
            url:
              'https://api.map.baidu.com/reverse_geocoding/v3/?ak=e4KKWmaYLZLG9hTBaVMpSvxoOIAMcGe9&output=json&coordtype=wgs84ll&location=' +
              latitude +
              ',' +
              longitude,
            data: {},
            header: {
              'Content-Type': 'application/json'
            },

            success: function (res) {
              if (res && res.data) {
                console.log(res)
                scope.province = res.data.result.addressComponent.province
                scope.cityName = res.data.result.addressComponent.city
                scope.cityName = scope.cityName.substring(
                  0,
                  scope.cityName.length - 1
                )
                scope.$store.commit(scope.$types.SET_PROVINCE, scope.province)
                scope.$store.commit(scope.$types.SET_CITY, scope.cityName)
              } else {
                scope.$toast(res.result)
                console.log('获取失败')
              }
            }
          })
        }
      })
    },
    open () {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          that.$router.push({
            path: 'details',
            query: {
              image: tempFilePaths
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$color-blue: #55b1e8;
.home {
    .daily-all{
        border-radius: 50rpx;
        width:86%;
        margin-left: 7%;
        margin-top:6%;
        border:1px dashed #999999
    }
    .daily{
         height:502rpx;
    }
    .camera{
        position:relative;
       top:5%;
    }
  .headerTab {
    margin: 0 20rpx;
    height: 30rpx;
    padding: 20rpx 10rpx;
    color: #999;
    border-bottom: 2rpx solid transparent;
    &.cur {
      color: $color-blue;
      border-color: $color-blue;
    }
  }
  .img-plant {
    width: 200rpx;
    height: 200rpx;
    // border-radius: 100rpx;
  }
    .back{
    width:100%;
    height:100%;
  border-radius: 50rpx 50rpx 0 0;

  }
}
</style>
