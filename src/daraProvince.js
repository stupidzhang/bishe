export const PROVINCE_LIST = {
  data () {
    return {
      provinceList: []
    }
  },
  methods: {
    getList () {
      var provinceList = []
      wx.cloud
        .callFunction({
          name: 'area'
        })
        .then(res => {
          console.log(res.result.data, 'res', provinceList)
          //   this.$store.commit(this.$types.SET_PROVLIST, res.result.data)
          provinceList.push(res.result.data)
        })
      console.log(provinceList, 'zzzzz')
      return provinceList
    }

  }
}
