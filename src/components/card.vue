<template>
  <div class="item">
    <div class="card">
      <div class="img_wrap">
        <image class="item_image" :src="data.image" />
      </div>
      <div class="cont_wrap">
        <div class="title_wrap">
          <div class="title">{{ data.name }}</div>
        </div>
        <div class="desc">{{ data.description }}</div>
        <div class="cancel" @click="cancelFavor">取消收藏</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  onLoad () {
    console.log(this.data, 'fff')
  },
  methods: {
    cancelFavor () {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  height: 100%;
  position: relative;
  .cancel {
    font-size: 25rpx;
    color: #b99c6d;
    float: right;
    margin-right: 40rpx;
  }
  .card {
    position: absolute;
    width: 625rpx;
    height: 1011rpx;
    background: #fff;
    border-radius: 7rpx;
    top: 50rpx;
  }
}
/* 当前 swiper-item*/
.active_item .card {
  opacity: 1;
}
/* banner */
.img_wrap {
  position: relative;
  background: #303030;
  /* 图片 */
  .item_image {
    display: block;
    width: 100%;
    height: 589rpx;
    border-radius: 7rpx 7rpx 0 0;
    z-index: 5;
    opacity: 0.7;
  }
}
/* 标题出处 */
.title_wrap {
  width: 560rpx;
  height: 80rpx;
  margin: 0 auto;
  // padding-left: 130rpx;
  box-sizing: border-box;
  color: #b99c6d;
  border-bottom: 2rpx dotted #e4dcce;
  .title {
    position: relative;
    font-size: 30rpx;
    line-height: 35rpx;
    height: 70rpx;
    padding-top: 30rpx;
    overflow: hidden;
  }
}
// 描述
.desc {
  width: 554rpx;
  text-overflow: ellipsis;
  overflow: auto;
  margin: 0 auto;
  color: #666666;
  font-size: 24rpx;
  line-height: 28rpx;
  overflow: hidden;
  margin-top: 21rpx;
  text-align: justify;
}
</style>
