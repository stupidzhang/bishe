export const UPDATEPLANT_LIST = {
  data () {
    return {
    //   updatePlant: [],
      nodata: false
    }
  },
  methods: {
    updateList ({openId = '', name = '', isFavor}) {
      wx.cloud
        .callFunction({
          name: 'updatePlant',
          data: {
            openId: openId,
            name: name,
            isFavor: isFavor
          }
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.updateList({openId: this.openId, name: this.name, isFavor: this.isFavor})
      }
    }
  }
}
