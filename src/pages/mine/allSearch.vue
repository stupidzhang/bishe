<template>
  <div class="container">
    <div  class="wrap" >
      <mpvue-echarts  :echarts="echarts" :onInit="initChart1" />
    </div>
 
<div @click="goBack" class="to-other" >
    <img :src="img" class="icon"/>
</div>
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
import geoJson from '../../china.json'
import { AREA_LIST } from '@/mixin'
let chart1 = null
export default {
  mixins: [AREA_LIST],
  data () {
    return {
      echarts,
      prov1: [],
      delNum: -100,
      img: 'cloud://yun-tz1gu.7975-yun-tz1gu-1300627167/image/icon/left.png'

    }
  },
  components: {
    mpvueEcharts
  },
  onLoad () {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
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
            this.delNum = j
            // this.prov1.splice(j, 1)
          }
        }
      }
      this.prov1.splice(this.delNum, 1)
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
      this.show = true
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
/* position: absolute;
    top:65%; */
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
    width:80rpx;
    height:80rpx;
}
.to-other{
    width:100%;
    text-align:center;
    margin-top:40rpx;
}
.content{
    font-size:28rpx;
    line-height:28rpx;
    color:gray;
    margin-left:5%;
}
</style>