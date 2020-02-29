<template>
  <div v-if="picList.length!==0">
    <section class="margin-top50">
       <div class="font-size20 text-align-center">搜索最热榜单</div>
    </section>
    <section>
        <div class="content bgcolor-bg margin-top30">
           
                <ul>
                    <li v-for="(item,index) in mostList" :key="index"  class="marginX20 margin20X font-size4 color-gray ">
                       <div><img :src="picList[index]" class="picture"/></div>
                    <span class="name">{{item._id}}</span>
                    <span class="count">搜索{{item.count}}次</span>
                   
                   </li></ul>
         
        </div>
    </section>
  </div>
</template>

<script>
import { MOST_LIST } from '@/mixin'
export default {
  mixins: [MOST_LIST],
  data () {
    return {
      mostList: [],
      picList: [],
      img: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/camera2.png'
    }
  },
  computed: {

  },
  onLoad () {
    console.log(this.mostList, 'mm')
    wx.cloud
      .callFunction({
        name: 'most'
      })
      .then(res => {
        console.log(res.result.list.length, 'res')
        this.mostList = []
        if (res.result.list.length > 6) {
          this.list = res.result.list.slice(0, 6)
          this.mostList = this.list
        } else {
          this.mostList.push(...res.result.list)
        }

        this.showPic()
      })
  },
  methods: {
    showPic () {
      console.log('123')
      this.mostList.forEach(item => {
        wx.cloud
          .callFunction({
            name: 'plantName',
            data: {
              keyWord: item._id,
              pageNo: 1,
              pageSize: 6
            }
          })
          .then(res => {
            console.log(res.result.data.length, 'res')
            this.picList.push(res.result.data[0].image)
          })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.content{
    width:86%;
    margin-left:7%;
    ul{
        width:100%;
        li{
            width:40%;
            float:left;
            margin-left:5%;
            margin-right:5%;
        }
    }
}
.picture{
width:240rpx;
height:240rpx;
border-radius: 50rpx;
}
.name{
}
.count{
float:right
}
</style>
