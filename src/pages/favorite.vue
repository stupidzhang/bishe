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
    <div v-if="favorList.length===0" class="nodata">您还没有收藏过的植物，快去收藏吧</div>
  </div>
</template>

<script>
import Card from '../components/card'
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
      animationData2: {} // 卡片缩小动画
    }
  },
  components: {
    Card
  },
  watch: {
    favorList (val, oldVal) {
      this.favorList = val
      console.log(this.favorList, 'watch')
    }
  },
  onLoad () {
    this.getList({ isRefresh: true })
    console.log(this.favorList, 'favorList')
  },
  methods: {
    cancel (item, index) {
      this.delFavor({name: item.name})
      this.updateList({name: item.name, isFavor: false})
      console.log(item, index, '取消收藏')
      this.getList({ isRefresh: true })
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
  height: 1076rpx !important;
  background: #303030;
}
.personal {
//   background: #303030;
}
.item {
  transform: scale(0.9);
  transform-origin: 50% 50% 0px;
  opacity: 0.3;
}
.active_item {
  transform: scale(1);
  opacity: 1;
}
// 指示点
.swiper_dot_wrap {
  position: relative;
  top: 66rpx;
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
      border: 2rpx solid #b99c6d;
      margin-right: 15rpx;
      &:last-child {
        margin-right: 0rpx;
      }
      &.active {
        background: #b99c6d;
      }
    }
  }
}
.nodata{
    margin-top:50%;
    text-align: center;
    position: relative;
    background:white;
}
</style>
