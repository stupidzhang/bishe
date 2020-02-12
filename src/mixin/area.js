export const AREA_LIST = {
  data () {
    return {
      areaList: []
    }
  },
  methods: {
    getAreaList () {
      wx.cloud
        .callFunction({
          name: 'area',
          data: {
          }
        })
        .then(res => {
          console.log(res.result.data.length, 'res')
          this.areaList.push(...res.result.data)
          this.nodata = this.$util.switchNodata(this.areaList)
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.getAreaList()
      }
    }
  }
}
