export const AREA_LIST = {
  data () {
    return {
      areaList: []
    }
  },
  methods: {
    getAreaList ({openId = ''}) {
      wx.cloud
        .callFunction({
          name: 'area',
          data: {
            openId: openId
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
        this.getAreaList({openId: this.openId})
      }
    }
  }
}
