export const ADDAREA_LIST = {
  data () {
    return {
      addArea: [],
      nodata: false
    }
  },
  methods: {
    addAreaList ({ openId = '', name = '', value = '' }) {
      wx.cloud
        .callFunction({
          name: 'addArea',
          data: {
            openId: openId,
            name: name,
            value: value
          }
        })
        .then(res => {
          console.log('add province')
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.addAreaList({ openId: this.openId, name: this.name, value: this.value })
      }
    }
  }
}
