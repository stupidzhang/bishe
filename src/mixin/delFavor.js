export const DELFAVOR_LIST = {
  data () {
    return {
      delFavorList: [],
      nodata: false,
      pageNo: 1,
      pageSize: 6,
      hasMore: true
    }
  },
  methods: {

    delFavor ({ name = '', openId = '' }) {
      wx.cloud
        .callFunction({
          name: 'delFavor',
          data: {
            name: name,
            openId: openId
          }
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.delFavor({openId: this.openId, name: this.name})
      }
    }
  }
}
