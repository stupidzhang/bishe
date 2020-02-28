<template>
  <div class="padding-bottom100">
    <main>
      <section class="introWrap border-bottom1">
        <div class="flex-align">
          <div class="posterSize itemflex-00auto relative" style="border: 2rpx solid #666;">
            <image v-if="item.image" :src="item.image" class="posterSize"></image>
            <i v-else class="icon-video font-size12 color-666 absolute translateXY"></i>
          </div>
          <div class="paddingX20 width100">
            <div class="flex-align-spacebetween">
              <p class="flex-align" style="width: 65%">
                <span class="font-size4 line-ellipsis">{{item.name}}</span>
                <span v-if="item.is3D" class="margin-left10 icon-3DIMAX itemflex-00auto"></span>
              </p>
              <p class="padding-left10 itemflex-00auto color-yellow" style="max-width: 35%">
              </p>
            </div>
            <div class="margin-top20 color-999 line-ellipsis">您在{{item.city}}搜索该植物</div>
          </div>
        </div>
        <div class="margin-top20 flex-align-spacebetween">
          <p class="operateBtn flex-align-justify" @click="hasFavor">
 <img
        class="icon margin-right10"
        :src="item.isFavor ? iconActive : icon"
        
      />{{item.isFavor?'已收藏':'收藏'}}
          </p>
          <p class="operateBtn flex-align-justify" @click="wantBuy">
              <img
        class="icon margin-right10"
        :src="shop"
        
      />
            <i class="margin-right10 icon-buy font-size8"></i>想买
          </p>
        </div>
      </section>
      <div class="bgcolor-white padding20X paddingX30 flex-align color-black font-size8">
        <!-- <i class="margin-right10 icon-egg color-blue font-size4"></i>片尾有三个彩蛋，不要错过哦~ -->
        <span v-if="item.description" class="margin-top10">{{item.description}}</span>
        <span v-else class="margin-top10">暂无详细信息</span>
      </div>
    </main>
    <!-- <footer class="fixed bottom0 left0 right0">
      <button open-type="getUserInfo" @getuserinfo="theGetUserInfo" style="background-color: #f0423b;border-radius: 0;color: #fff">优惠购票</button>
    </footer> -->
  </div>
</template>
<script>
import { FAVOR_LIST, ADDFAVOR_LIST, DELFAVOR_LIST, UPDATEPLANT_LIST } from '@/mixin'
import { getUserInfo } from '@/utils/business'
export default {
  mixins: [FAVOR_LIST, ADDFAVOR_LIST, DELFAVOR_LIST, UPDATEPLANT_LIST],
  data () {
    return {
      item: {},
      show: false,
      icon: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/heart-white.png',
      iconActive: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/heart-active.png',
      shop: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/shop.png'
    }
  },
  onLoad () {
    this.item = JSON.parse(decodeURIComponent(this.$route.query.film))
    console.log(this.item, this.$route)
  },
  methods: {
    onBuyClicked () {
      wx.showToast({title: '麻烦亲去淘宝搜搜哦~', icon: 'none'})
    },
    onAddCartClicked () {

    },
    theGetUserInfo () {
      new Promise(resolve => {
        if (!this.$store.getters.isLogin) {
          getUserInfo().then(() => {
            resolve()
          }, () => {
            this.$widget.toastWarn('登录失败')
          })
        } else {
          resolve()
        }
      }).then(() => {
        this.$router.push('select_seat')
      })
    },
    hasFavor () {
      console.log(this.item.isFavor, '收藏')
      if (this.item.isFavor) {
        this.item.isFavor = false
        this.delFavor({openId: this.$store.state.openId, name: this.item.name})
        this.updateList({openId: this.$store.state.openId, name: this.item.name, isFavor: false})
      } else {
        this.item.isFavor = true
        this.addFavor({
          openId: this.$store.state.openId,
          name: this.item.name,
          city: this.item.city,
          description: this.item.description,
          image: this.item.image
        })
        this.updateList({openId: this.$store.state.openId, name: this.item.name, isFavor: true})
      }
    },
    wantBuy () {
      wx.showToast({title: '麻烦亲去淘宝搜搜哦~', icon: 'none'})
    }
  }
}
</script>
<style lang="scss" scoped>
.introWrap {
  padding: 20rpx 30rpx;
  background-color: #343434;
  color: #fff;
  .posterSize {
    width: 160rpx;
    height: 210rpx;
  }
  .icon-3DIMAX {
    color: #fff;
    font-size: 60rpx;
  }  .icon {
    width: 40rpx;
    height: 40rpx;
  }
  .operateBtn {
    width: 48%;
    line-height: 40rpx;
    padding: 10rpx 0;
    background-color: #646464;
    border: 2rpx solid #666666;
    border-radius: 8rpx;
    [class *= 'icon-'] {
      color: #bebebe;
    }
  }
}
</style>
