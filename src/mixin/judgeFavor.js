export const JUDGEFAVOR_LIST = {
  data () {
    return {
      judgeFavorList: [],
      nodata: false,
      pageNo: 1,
      pageSize: 6,
      hasMore: true
    }
  },
  methods: {
    judgeList ({ isRefresh, isShow, keyWord = '' }) {
      wx.showLoading({
        title: '加载中'
      })
      if (isRefresh) {
        this.pageNo = 1
        this.judgeFavorList = []
      } else {
        this.pageNo++
      }
      wx.cloud
        .callFunction({
          name: 'judgeFavor',
          data: {
            keyWord: keyWord
          }
        })
        .then(res => {
          console.log(res.result.data, 'res')
          this.hasMore = !(res.result.data.length < this.pageSize)
          this.judgeFavorList.push(...res.result.data)
          this.nodata = this.$util.switchNodata(this.judgeFavorList)
          wx.hideLoading()
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.judgeList({isRefresh: false, keyWord: this.keyWord})
      }
    }
  }
}
