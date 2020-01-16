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

    delFavor ({ name = '' }) {
      wx.cloud
        .callFunction({
          name: 'delFavor',
          data: {
            name: name
          }
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.delFavor({name: this.name})
      }
    }
  }
}
