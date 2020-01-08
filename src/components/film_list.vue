<template>
  <div>
    <li v-if="nodata" class="padding-top20 padding-bottom40 text-align-center color-999">暂无数据</li>
    <ul class="padding-left20">
      <li v-for="(item, index) in mainList" :key="index" class="width100 padding20X border-bottom1 flex" @tap="clickItem(item)">
        <div class="posterSize itemflex-00auto relative">
          <image :src="item.poster" class="posterSize" :lazy-load="true"></image>
          <i class="icon-video font-size12 color-white absolute translateXY"></i>
        </div>
        <div class="width100 paddingX20">
          <div class="flex-align-spacebetween">
            <p class="flex-align" style="width: 65%">
              <span class="color-333 font-size4 line-ellipsis">{{item.name}}</span>
              <span v-if="item.is3D" class="margin-left10 icon-3DIMAX itemflex-00auto"></span>
            </p>
            <p class="padding-left10 itemflex-00auto color-yellow" style="max-width: 35%">
            <span>{{item.city}}</span>
            </p>
          </div>
          <div class="color-999 line-ellipsis">description:{{item.description}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.mainList, '---')
  },
  methods: {
    clickItem (obj) {
      this.$router.push({
        path: 'film_detail',
        query: {
          film: encodeURIComponent(JSON.stringify(obj))
        }
      })
    }
  },
  props: {
    mainList: {
      type: Array,
      default: [],
      required: true
    },
    nodata: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .icon-3DIMAX {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 64rpx;
    color: #78abca;
  }
  .posterSize {
    width: 140rpx;
    height: 190rpx;
  }
</style>
