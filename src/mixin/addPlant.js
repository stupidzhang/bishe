export const ADDPLANT_LIST = {
  data () {
    return {
      addPlant: [],
      nodata: false
    }
  },
  methods: {
    addList ({ openId = '', name = '', city = '', province = '', description = '', image = '', isFavor }) {
    //   wx.showLoading({
    //     title: '加载中'
    //   })
      wx.cloud
        .callFunction({
          name: 'addPlant',
          data: {
            openId: openId,
            name: name,
            city: city,
            province: province,
            description: description,
            image: image,
            isFavor: isFavor
          }
        })
        .then(res => {
        //   console.log(res.result.data, province, 'province,res')
        //   this.hasMore = !(res.result.data.length < this.pageSize)
        //   this.plantList.push(...res.result.data)
        //   this.nodata = this.$util.switchNodata(this.plantList)
        //   wx.hideLoading()
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.addList({ openId: this.openId, name: this.name, city: this.city, province: this.province, description: this.description, image: this.image, isFavor: this.isFavor })
      }
    }
  }
}
