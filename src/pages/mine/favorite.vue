<template>
  <div class="personal">
    <swiper
    v-if="favorList.length!=0"
      class="personal_swiper"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      :circular="circular"
      @change="handleChange($event)"
    >
      <block v-for="(item, index) in favorList" :key="index">
        <swiper-item>
          <div
            :class="curIndex === index ? 'active_item' : 'item'"
            :animation="index == curIndex ? animationData : animationData2"
          >
            <!-- 卡片项，写在子组件中 -->
            <Card :data="item" @cancel="cancel(item, index)" />
          </div>
        </swiper-item>
      </block>
    </swiper>
    <div class="flex-justify">
    <div class="swiper_dot_wrap"  v-if="favorList.length!=0">
      <ul>
        <li
          v-for="(item, index) in favorList"
          :key="index"
          :class="{ active: curIndex === index }"
        ></li>
      </ul>
    </div>
    </div>
    <div v-if="favorList.length===0" class="nodata"><div class="image-no"><img src="cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/nodata.png" class="image1"/><div>您还没有收藏过的植物，快去收藏吧</div></div></div>
  </div>
</template>

<script>
import Card from '../../components/card'
import {DELFAVOR_LIST, FAVOR_LIST, UPDATEPLANT_LIST} from '@/mixin'
export default {
  mixins: [DELFAVOR_LIST, FAVOR_LIST, UPDATEPLANT_LIST],
  data () {
    return {
      curIndex: 0,
      circular: true, // 设置衔接滑动
      previousMargin: '63rpx',
      nextMargin: '63rpx',
      animationData: {}, // 卡片放大动画
      animationData2: {}, // 卡片缩小动画,
      nodata: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/nodata.png'
    }
  },
  components: {
    Card
  },
  watch: {
    favorList (val, oldVal) {
      this.favorList = val
      console.log(this.favorList, 'watch', val, oldVal)
    }
  },
  onLoad () {
    this.getList({ isRefresh: true, openId: this.$store.state.openId })
    console.log(this.favorList, 'favorList')
  },
  methods: {
    cancel (item, index) {
      this.delFavor({openId: this.$store.state.openId, name: item.name})
      this.updateList({openId: this.$store.state.openId, name: item.name, isFavor: false})
      console.log(item, index, '取消收藏')
      setTimeout(() => { this.getList({ isRefresh: true, openId: this.$store.state.openId }) }, 1000)
      console.log(this.favorList, 'favorlist')
    //   this.$router.push({
    //     path: 'favorite'
    //   })
    },
    handleChange (e) {
      this.curIndex = e.mp.detail.current
      this.changeActive()
      this.changeNormal()
    },
    // 收缩
    changeNormal () {
      var animation2 = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      this.animation2 = animation2
      animation2
        .scale(0.9)
        .opacity(0.3)
        .step()
      this.animationData2 = animation2.export()
    },
    // 展开
    changeActive () {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      this.animation = animation
      animation
        .scale(1)
        .opacity(1)
        .step()
      this.animationData = animation.export()
    }
  }
}
</script>

<style lang="scss" scoped>
.personal_swiper {
  //   margin-top: 20rpx;
  position: relative;
  width: 100%;
  height: 95% !important;
  background: #303030;
  padding:5% 0 20% 0;
}
.personal {
  background: #303030;
  height:100%;
}

.image1{
    width:100%;
    height:400rpx;
}
.item {
  transform: scale(0.9);
  transform-origin: 50% 50% 0px;
  opacity: 0.3;
  height:100%;
}
.active_item {
  transform: scale(1);
  opacity: 1;
  height:100%;
}
// 指示点
.swiper_dot_wrap {
  position: absolute;
bottom: 2%;
  height: 15rpx;
  ul {
    float: right;
    overflow: hidden;
    li {
      float: left;
      width: 15rpx;
      height: 15rpx;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2rpx solid #32ae57;
      margin-right: 15rpx;
      &:last-child {
        margin-right: 0rpx;
      }
      &.active {
        background: #32ae57;
      }
    }
  }
}
.image-no{
    position: absolute;
top: 50%;
transform: translate(-50%, -50%);
left: 50%;

}
.nodata{
// left: 50%;
//     top: 50%;
// transform: translate(-50%,-50%);
// text-align: center;
// position: absolute;
background: white;
font-size: 45rpx;
height: 100%;

}
</style>
