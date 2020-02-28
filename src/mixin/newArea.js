export const NEWAREA_LIST = {
  data () {
    return {
      newArea: [],
      nodata: false
    }
  },
  methods: {
    newAreaList ({ openId = '', name = '', value = '' }) {
      wx.cloud
        .callFunction({
          name: 'newArea',
          data: {
            openId: openId,
            name: name,
            value: value
          }
        })
        .then(res => {
          console.log('add new province')
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.newAreaList({ openId: this.openId, name: this.name, value: this.value })
      }
    }
  }
}
