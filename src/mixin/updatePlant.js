export const UPDATEPLANT_LIST = {
  data () {
    return {
    //   updatePlant: [],
      nodata: false
    }
  },
  methods: {
    updateList ({name = '', isFavor}) {
      wx.cloud
        .callFunction({
          name: 'updatePlant',
          data: {
            name: name,
            isFavor: isFavor
          }
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.updateList({name: '', isFavor: this.isFavor})
      }
    }
  }
}
