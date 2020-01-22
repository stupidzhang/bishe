export const PLANT_LIST = {
  data () {
    return {
      plantList: [],
      judge: true,
      nodata: false,
      pageNo: 1,
      pageSize: 6,
      hasMore: false
    }
  },
  methods: {
    getList ({ isRefresh, isShow, keyWord = '', type = '' }) {
      wx.showLoading({
        title: '加载中'
      })
      if (isRefresh) {
        this.pageNo = 1
        this.plantList = []
      } else {
        this.pageNo++
      }
      wx.cloud
        .callFunction({
          name: 'plantName',
          data: {
            keyWord: keyWord,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res.result.data.length, 'res')
          //   this.hasMore = !(res.result.data.length < this.pageSize)
          this.plantList.push(...res.result.data)
          this.nodata = this.$util.switchNodata(this.plantList)
          wx.hideLoading()
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.getList({ isRefresh: false, keyWord: this.keyWord })
      }
    }
  }
}
