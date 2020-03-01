<template>
  <div class="container">
      <!-- <van-tabs swipeable color="#55b1e8">
  <van-tab title="你的区域"> -->
 
    <div class="wrap" >
      <mpvue-echarts  :echarts="echarts" :onInit="initChart" />
    </div>
    <div v-if="prov.length!==0" class="more-all">
    <div class="more margin20X padding-top20" >详情</div>
    <div class="content"><ul v-for="(item,index1) in searchPro" :key="index1" class="margin-bottom20"><li>在{{item.name}}搜索了<ul v-for="(val,index) in item.value" :key="index" class="inline-block"><li class="margin-right20 margin-top10">{{val}}</li></ul></li></ul></div>
    </div>
    <div @click="all" class="to-other" v-if="prov.length!==0" >
    <img :src="img" class="icon"/>
    <div >看看大家</div>
    </div>
    <!-- </van-tab> -->
     <!-- <van-tab title="大家的足迹">
          <div  class="wrap" >
      <mpvue-echarts  :echarts="echarts" :onInit="initChart1" />
    </div>
    <div v-if="prov1.length!==0" class="more-all">
    
    </div>
     </van-tab>
</van-tabs> -->
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
import geoJson from '../../china.json'
import { AREA_LIST } from '@/mixin'
let chart = null
let chart1 = null
export default {
  mixins: [AREA_LIST],
  data () {
    return {
      echarts,
      searchPlant: [],
      prov: [],
      searchPro: [],
      img: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/right.png'
    }
  },
  components: {
    mpvueEcharts
  },
  onLoad () {
    // this.prov = this.$route.query.sear
  },
  methods: {
    all () {
      this.$router.push({
        path: 'allSearch'

      })
    },
    test () {
      console.log(this.$store.state.provList, 'prov')
      this.searchPro = JSON.parse(JSON.stringify(this.$store.state.provList))
      this.prov = JSON.parse(JSON.stringify(this.$store.state.provList))
      console.log(this.searchPro, '---')
      this.prov.map(item => {
        item.value = item.value.length
      })
      var dataList = this.prov
      console.log(dataList, 'test11')
      var option = {
        title: {
          show: true,
          text: '注：只依照定位来统计区域',
          x: 'center',
          y: 'bottom',
          padding: 5,
          textStyle: {
            fontSize: 14,
            color: 'gray'
          }
        },

        tooltip: {
          triggerOn: 'click',
          formatter: function (e, t, n) {
            console.log(e, t, n, '??/')
            return '在' + e.name + '你搜索了' + (e.value ? e.value : '0') + '个植物'
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: true,
          pieces: [
            {
              gte: 1,
              lte: 1000,
              label: '查询过',
              color: '#55b1e8'
            }, {
              value: 0,
              color: '#ffffff'
            }],
          show: false
        },
        geo: {
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.23,
          top: 120,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#55b1e8',
              areaColor: '#fff'
            },
            emphasis: {
              areaColor: '#55b1e8',
              borderColor: '#55b1e8',
              borderWidth: 2
            }
          }
        },
        series: [{
          name: '您搜索了',
          type: 'map',
          geoIndex: 0,
          data: dataList
        }]
      }
      chart.setOption(option)
    },
    initChart (canvas, width, height) {
      console.log('init')
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart)
      echarts.registerMap('china', geoJson)
      this.test()
      //   this.show = true
      return chart
    },
    test1 () {
      console.log(this.$store.state.provListAll, 'provAll')
      this.searchPro1 = JSON.parse(JSON.stringify(this.$store.state.provListAll))
      this.prov1 = JSON.parse(JSON.stringify(this.$store.state.provListAll))
      console.log(this.searchPro1, '---')
      this.prov1.map(item => {
        item.value = item.value.length
      })
      for (var i = 0; i < this.prov1.length; i++) {
        for (var j = i + 1; j < this.prov1.length; j++) {
          if (this.prov1[i].name === this.prov1[j].name) {
            console.log(i, j, '?=')
            this.prov1[i].value += this.prov1[j].value
            this.prov1.splice(j, 1)
          }
        }
      }
      var dataList = this.prov1
      console.log(dataList, 'test11')
      var option = {
        title: {
          show: true,
          text: '注：只依照定位来统计区域',
          x: 'center',
          y: 'bottom',
          padding: 5,
          textStyle: {
            fontSize: 14,
            color: 'gray'
          }
        },

        tooltip: {
          triggerOn: 'click',
          formatter: function (e, t, n) {
            console.log(e, t, n, '??/')
            return '在' + e.name + '大家搜索了' + (e.value ? e.value : '0') + '个植物'
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: true,
          pieces: [
            {
              gte: 1,
              lte: 1000,
              label: '查询过',
              color: '#55b1e8'
            }, {
              value: 0,
              color: '#ffffff'
            }],
          show: false
        },
        geo: {
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.23,
          top: 120,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#55b1e8',
              areaColor: '#fff'
            },
            emphasis: {
              areaColor: '#55b1e8',
              borderColor: '#55b1e8',
              borderWidth: 2
            }
          }
        },
        series: [{
          name: '大家搜索了',
          type: 'map',
          geoIndex: 0,
          data: dataList
        }]
      }
      chart1.setOption(option)
    },
    initChart1 (canvas, width, height) {
      chart1 = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart1)
      echarts.registerMap('china', geoJson)
      this.test1()
      return chart1
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 800rpx;
}
.more-all{
    margin-left:10%;
    width:80%;
    background:rgba(122, 122, 122, 0.2);
    border-radius: 30rpx;
}
.more{
    font-size:36rpx;
    margin-left:5%;
}
.to-other{
    /* margin-left:10%; */
    width:100%;
    text-align:center;
    margin-top:40rpx;
    color:gray;
}
.icon{
    width:80rpx;
    height:80rpx;
    /* position: relative;
    top: 10rpx; */

}
.content{
    font-size:28rpx;
    line-height:28rpx;
    color:gray;
    margin-left:5%;
    padding-bottom: 10rpx;

}
</style>