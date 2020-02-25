<template>
  <div class="container">
    <div v-if="prov!==[]" class="wrap" >
      <mpvue-echarts  :echarts="echarts" :onInit="initChart" />
    </div>
    <div class="more-all bgcolor-blue">
    <div class="more margin30X" >详情</div>
    <div class="content"><ul v-for="(item,index1) in searchPro" :key="index1" class="margin-bottom20"><li>在{{item.name}}搜索了<ul v-for="(val,index) in item.value" :key="index" class="inline-block"><li class="margin-right20">{{val}}</li></ul></li></ul></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
import geoJson from '../../china.json'
import { AREA_LIST } from '@/mixin'
let chart = null
export default {
  mixins: [AREA_LIST],
  data () {
    return {
      echarts,
      searchPlant: [],
      prov: [],
      searchPro: [],
      img1: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/more1.png',
      img2: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/more2.png',
      img: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/more2.png',
      upfold: false
    }
  },
  components: {
    mpvueEcharts
  },
  onLoad () {
    // this.prov = this.$route.query.sear
  },
  methods: {

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
            return '在' + e.name + '你搜索了' + e.value + '个'
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
      return chart
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 1200rpx;
}
.more-all{
position: absolute;
    bottom:15%;
    margin-left:10%;
    width:80%;
    background:rgba(122, 122, 122, 0.2);
    border-radius: 30rpx;
}
.more{
    font-size:36rpx;
    margin-left:5%;
}
.icon{
    width:50rpx;
    height:50rpx;
    position: relative;
    top: 10rpx;

}
.content{
    font-size:28rpx;
    line-height:28rpx;
    color:gray;
    margin-left:5%;
}
</style>