<template>
  <div class="container">
    <div class="wrap">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/diy_echarts.min'
import mpvueEcharts from 'mpvue-echarts'
// import geoJson from './mapData.js'
import geoJson from '../china.json'
function initChart (canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  echarts.registerMap('china', geoJson)
  const option = {
    title: {
      text: '您搜索的植物分布',
      textStyle: {
        color: '#389BB7',
        fontStyle: 'normal',
        fontSize: 14
      },
      //   textAlign: 'right',
      textVerticalAlign: 'middle',
      padding: [
        25, // 上
        0, // 右
        5, // 下
        0 // 左
      ]},

    tooltip: {
      trigger: 'item',
      formatter: function (param) {
        let txt = '0'
        return txt
      }
    },

    series: [{
      type: 'map',
      map: 'china',
      label: {
        normal: {
          show: false
        }
        // emphasis: {
        //   textStyle: {
        //     color: '#fff'
        //   }
        // }
      },
      itemStyle: {

        normal: {
          borderColor: '#389BB7',
          areaColor: '#fff'
        },
        emphasis: {
          areaColor: '#389bb7',
          borderWidth: 2
        }
      },
      animation: false,
      data: [
        { name: '浙江省',
          value: 18,
          tooltip: {
            trigger: 'item',
            formatter: function (param) {
              let txt = '具体1111'
              return txt
            }
          }},
        { name: '广东省', value: 8 },
        { name: '新疆', value: 10 }

      ]
    }]
  }
  chart.setOption(option)
  return chart
}
export default {
  data () {
    return {
      echarts,
      onInit: initChart
    }
  },
  components: {
    mpvueEcharts
  },
  onShareAppMessage () {}
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 1200rpx;
}

</style>