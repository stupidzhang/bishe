export const ADDPLANT_LIST = {
  data () {
    return {
      addPlant: [],
      nodata: false
    }
  },
  methods: {
    addList ({ name = '', city = '', description = '', image = '', isFavor }) {
    //   wx.showLoading({
    //     title: '加载中'
    //   })
      wx.cloud
        .callFunction({
          name: 'addPlant',
          data: {
            name: name,
            city: city,
            description: description,
            image: image,
            isFavor: isFavor
          }
        })
        .then(res => {
        //   console.log(res.result.data, 'res')
        //   this.hasMore = !(res.result.data.length < this.pageSize)
        //   this.plantList.push(...res.result.data)
        //   this.nodata = this.$util.switchNodata(this.plantList)
        //   wx.hideLoading()
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.addList({ name: this.name, city: this.city, description: this.description, image: this.image, isFavor: this.isFavor })
      }
    }
  }
}
