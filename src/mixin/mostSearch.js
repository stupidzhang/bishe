export const MOST_LIST = {
  data () {
    return {
      mostList: [],
      list: [],
      nodata: false,
      hasMore: false
    }
  },
  methods: {
    getMostList () {
      wx.showLoading({
        title: '加载中'
      })
      wx.cloud
        .callFunction({
          name: 'most'
        })
        .then(res => {
          console.log(res.result.list.length, 'res')
          this.mostList = []
          if (res.result.list.length > 6) {
            this.list = res.result.list.slice(0, 6)
            this.mostList = this.list
          } else           {
            this.mostList.push(...res.result.list)
          }
          wx.hideLoading()
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.getMostList()
      }
    }
  }
}
