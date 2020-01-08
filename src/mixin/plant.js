export const PLANT_LIST = {
  data () {
    return {
      plantList: [],
      nodata: false,
      pageNo: 1,
      pageSize: 6,
      hasMore: true
    }
  },
  methods: {
    getList ({ isRefresh, isShow, keyWord = '' }) {
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
            // isShow: isShow,
            // keyWord: keyWord,
            // pageNo: this.pageNo,
            // pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res, 'resres')
          this.hasMore = !(res.result.data.length < this.pageSize)
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
