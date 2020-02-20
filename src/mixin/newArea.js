export const NEWAREA_LIST = {
  data () {
    return {
      newArea: [],
      nodata: false
    }
  },
  methods: {
    newAreaList ({ name = '', value = '' }) {
      wx.cloud
        .callFunction({
          name: 'newArea',
          data: {
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
        this.newAreaList({ name: this.name, value: this.value })
      }
    }
  }
}
