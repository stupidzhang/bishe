<template>
  <div>
    <header class="fixed top0 width100 bgcolor-bg" style="height: 100rpx">
      <search placeholder="请输入植物名" @goSearch="goSearch"></search>
    </header>
    <main class="fixed width100 bgcolor-white" style="top: 100rpx;height: calc(100% - 100rpx)">
      <scroll-view scroll-y style="height: 100%;" @scrolltolower="loadMore">
        <film-list :mainList="plantList" :nodata="nodata"></film-list>
      </scroll-view>
    </main>
  </div>
</template>
<script>
import search from '@/components/search'
import filmList from '@/components/film_list'
import {PLANT_LIST} from '@/mixin'
export default {
  mixins: [PLANT_LIST],
  components: {
    search,
    filmList
  },
  onLoad () {
    Object.assign(this, this.$options.data())
    console.log(this.$options.data(), 'ass')
  },
  methods: {
    goSearch (v) {
      console.log(v, 'key')
      this.getList({isRefresh: true, keyWord: v})
    }
  }
}
</script>
