export const FAVOR_LIST = {
  data () {
    return {
      favorList: [],
      nodata: false,
      pageNo: 1,
      pageSize: 6,
      hasMore: true
    }
  },
  methods: {
    getList ({ isRefresh, isShow, keyWord = '', openId = '' }) {
      wx.showLoading({
        title: '加载中'
      })
      if (isRefresh) {
        this.pageNo = 1
        this.favorList = []
      } else {
        this.pageNo++
      }
      wx.cloud
        .callFunction({
          name: 'favor',
          data: {
            openId: openId,
            keyWord: keyWord
            // pageNo: this.pageNo,
            // pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res.result.data, 'res')
          this.hasMore = !(res.result.data.length < this.pageSize)
          this.favorList.push(...res.result.data)
          this.nodata = this.$util.switchNodata(this.favorList)
          wx.hideLoading()
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.getList({isRefresh: false, keyWord: this.keyWord})
      }
    }
  }
}
