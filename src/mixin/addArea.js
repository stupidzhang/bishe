export const ADDAREA_LIST = {
  data () {
    return {
      addArea: [],
      nodata: false
    }
  },
  methods: {
    addAreaList ({ province = '', plantName = '' }) {
      wx.cloud
        .callFunction({
          name: 'addArea',
          data: {
            province: province,
            plantName: plantName
          }
        })
        .then(res => {
        //   console.log(res.result.data, province, 'province,res')
        //   this.hasMore = !(res.result.data.length < this.pageSize)
        //   this.plantList.push(...res.result.data)
        //   this.nodata = this.$util.switchNodata(this.plantList)
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.addAreaList({ province: this.province, plantName: this.plantName })
      }
    }
  }
}
