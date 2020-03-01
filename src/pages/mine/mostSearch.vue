<template>
  <div >
    <section class="margin-top50">
       <div class="font-size20 text-align-center">搜索最热榜单</div>
    </section>
    <section>
        <div class="content bgcolor-bg margin-top30">
           
                <ul>
                    <li v-for="(item,index) in mostList" :key="index" @click="showImg(item,index)" class="marginX20 margin20X font-size4 color-gray all">
                       <div ><img :src="lastPic[index]" class="picture"/></div>
                    <span class="name">{{item._id}}</span>
                    <span class="count color-blue">搜索{{item.count}}次</span>
                   
                   </li></ul>
         
        </div>
    </section>
  </div>
</template>

<script>
import { MOST_LIST, PLANT_LIST } from '@/mixin'
export default {
  mixins: [MOST_LIST, PLANT_LIST],
  data () {
    return {
      mostList: [],
      picList: [],
      lastPic: [],
      plant: [],
      show: false
    }
  },
  computed: {

  },
  onLoad () {
    this.picList.length = 0
    console.log(this.picList, 'pccc')
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
      console.log(this.mostList, 'mm')
      for (var i = 0; i < this.mostList.length; i++) {
        wx.cloud
          .callFunction({
            name: 'plantName',
            data: {
              keyWord: this.mostList[i]._id,
              pageNo: 1,
              pageSize: 6
            }
          })
          .then(res => {
            console.log(i, res.result.data, this.picList, '重要图片顺序')
            this.picList.push(res.result.data[0])
            console.log(res.result.data, 'res顺序')
            this.equalPic(this.picList, this.mostList)
          })
      }
    },
    equalPic (val, most) {
      console.log(val, most, 'most')
      for (var i = 0; i < most.length; i++) {
        for (var j = 0; j < val.length; j++) {
          if (most[i]._id === val[j].name) {
            this.lastPic[i] = val[j].image
            console.log(this.lastPic, 'lastpic')
          }
        }
      }

      console.log(this.lastPic, 'lllpp')
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
            width:39%;
            float:left;
            margin-left:5%;
            margin-right:5%;
        }
    }
}
.picture{
width:100%;
height:240rpx;
border-radius: 50rpx 50rpx 0 0;
padding-bottom:20rpx;
}
.name{
   padding-left: 8rpx;
}
.count{
   padding:0 8rpx 20rpx 0;
float:right
}
.all{
    background:#F7F7F7;
    border-radius: 50rpx;
    border:1px dashed #55b1e8;
}
</style>
