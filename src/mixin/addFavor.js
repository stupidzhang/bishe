export const ADDFAVOR_LIST = {
  data () {
    return {
      addFavorList: [],
      nodata: false,
      pageNo: 1,
      pageSize: 6,
      hasMore: true
    }
  },
  methods: {
    addFavor ({ openId = '', name = '', city = '', description = '', image = '' }) {
    //   wx.showLoading({
    //     title: '加载中'
    //   })
      wx.cloud
        .callFunction({
          name: 'addFavor',
          data: {
            openId: openId,
            name: name,
            city: city,
            description: description,
            image: image
          }
        })
    },
    loadMore () {
      if (this.hasMore) {
        this.addFavor({openId: this.openId, name: this.name, city: this.city, description: this.description, image: this.image})
      }
    }
  }
}
