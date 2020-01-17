<template>
  <div class="home clear">
    <main class="fixed top0 width100" style="height: calc(100% - 2rpx)">
      <scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
        <header
          class="border-bottom1 flex-align-spacebetween"
          style="height: 80rpx"
        >
          <a
            class="flex-align paddingX20"
            @tap="$router.push('/pages/select_city')"
          >
            {{ curCity }}
            <i class="icon-uparrow rotate180 color-999"></i>
          </a>
          <div class="font-size2 bold flex-align">
            <p
              :class="['headerTab', { cur: headerTab === 1 }]"
              @tap="switchTab(1)"
            >
              搜索
            </p>
            <p
              :class="['headerTab', { cur: headerTab === 2 }]"
              @tap="switchTab(2)"
            >
              已搜索
            </p>
          </div>
          <a
            class="height100 padding-left20 padding-right30 border-left1 flex-align-justify"
            @tap="$router.push('search')"
          >
            <i class="icon-search font-size8 bold color-blue"></i>
          </a>
        </header>
        <div v-if="headerTab === 1">
          <div></div>
          <div>
            <img :src="img" class="img-plant" @click="open" />
          </div>
        </div>
        <film-list
          v-if="headerTab === 2"
          :mainList="plantList"
          :nodata="nodata"
        ></film-list>
      </scroll-view>
    </main>
  </div>
</template>
<script>
import filmList from '@/components/film_list'
import { FILM_LIST, PLANT_LIST } from '@/mixin'
export default {
  mixins: [FILM_LIST, PLANT_LIST],
  components: {
    filmList
  },
  data () {
    return {
      headerTab: 1,
      img: require('@/assets/images/icon/camera.png'),
      filePaths: '',
      cityName: '' // 接口获得的当前地理位置
    }
  },
  onShow () {
    this.getList({ isRefresh: true })
  },
  computed: {
    // 更改过或者当前地理位置
    curCity () {
      return this.$store.state.city
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
              'http://api.map.baidu.com/reverse_geocoding/v3/?ak=e4KKWmaYLZLG9hTBaVMpSvxoOIAMcGe9&output=json&coordtype=wgs84ll&location=' +
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
                scope.cityName = res.data.result.addressComponent.city
                scope.cityName = scope.cityName.substring(
                  0,
                  scope.cityName.length - 1
                )
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
    switchTab (v) {
      Object.assign(this, this.$options.data())
      this.headerTab = v
      if (this.headerTab === 2) {
        this.getList({ isRefresh: true })
      } else {
      }
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
    width: 155rpx;
    height: 155rpx;
    position: absolute;
    bottom: 80rpx;
    left: 320rpx;
  }
}
</style>
