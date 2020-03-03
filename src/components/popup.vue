<template>
  <van-overlay :show="show">
    <div class="all">
      <img :src="close" class="close" @click="closePop" />
      <div v-if="data.baike_info" class="relative">
        <img :src="data.baike_info.image_url" class="img" />
        <div class="description scroll-y">{{ data.baike_info.description }}<span class="color-blue margin-left10" @click='moreDe'>具体内容</span></div>
      </div>
      <div v-else>
        <div class="name">{{ data.name }}</div>
        <div class="score margin-top10">相似度：{{ data.score }}</div>
      </div>
      <div class="paddingX30 padding30X">
        <van-button type="info" block plain @click="add">{{ text }}</van-button>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import { FAVOR_LIST, ADDFAVOR_LIST, DELFAVOR_LIST } from '@/mixin'
export default {
  mixins: [FAVOR_LIST, ADDFAVOR_LIST, DELFAVOR_LIST],
  props: {
    data: {
      type: Object
    },
    show: Boolean
  },

  data () {
    return {
      close: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/close.png',
      text: '我要收藏',
      more: '',
      nodata: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/nodata2.jpg'
    }
  },
  onLoad () {
    console.log(this.data, this.show, 'fff')
  },
  methods: {
    moreDe () {
      console.log('more')
      this.$store.commit(this.$types.SET_WEB_VIEW_URL, this.data.baike_info.baike_url + '.html')
      this.$router.push({
        path: 'web_view',
        query: {
          title: '具体'
        }
      })
    },
    closePop () {
      this.$emit('close')
    },
    add () {
      wx.cloud
        .callFunction({
          name: 'favor',
          data: {
            keyWord: this.data.name,
            openId: this.$store.state.openId
          }
        })
        .then(res => {
          console.log(res.result.data, 'cl')
          if (res.result.data.length === 0) {
            if (this.data.baike_info) {
              this.addFavor({
                openId: this.$store.state.openId,
                name: this.data.name,
                city: this.$store.state.city,
                description: this.data.baike_info.description,
                image: this.data.baike_info.image_url
              })
            } else {
              this.addFavor({
                openId: this.$store.state.openId,
                name: this.data.name,
                city: this.$store.state.city,
                description: '暂无详细介绍',
                image: this.nodata
              })
            }
          }
          this.show = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.all {
  background: white;
  position: relative;
  top: 15%;
  left: 15%;
  width: 70%;
  border-radius: 20rpx;

  .img {
    width: 100%;
    border-radius: 20rpx 20rpx 0 0;
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
  }
  .name,.score {
    font-size: 16px;
    padding: 30rpx;
    padding-bottom:10rpx;
    text-align: center;
  }
  .score{
      padding-top:10rpx;
  }
  .description {
    padding: 30rpx;
    text-indent: 1em;
    height: 200rpx;
    overflow: auto;
    text-align: left;
    // -webkit-overflow-scrolling: touch
  }
  .close {
    position: absolute;
    right: 0;
    top: -90rpx;
    width: 50rpx;
    height: 50rpx;
  }
}
</style>
