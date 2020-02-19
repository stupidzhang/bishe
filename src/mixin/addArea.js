export const ADDAREA_LIST = {
  data () {
    return {
      addArea: [],
      nodata: false
    }
  },
  methods: {
    addAreaList ({ name = '', value = '' }) {
      wx.cloud
        .callFunction({
          name: 'addArea',
          data: {
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
        this.addAreaList({ name: this.name, value: this.value })
      }
    }
  }
}
