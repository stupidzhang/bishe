<template>
  <div class="container">
    <div v-if="prov!==[]" class="wrap" >{{prov}}
      <mpvue-echarts  :echarts="echarts" :onInit="onInit" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
import geoJson from '../china.json'
import * as provLi from '../daraProvince'

import { AREA_LIST } from '@/mixin'
function initChart (canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  echarts.registerMap('china', geoJson)
  console.log(provLi.PROVINCE_LIST.methods.getList().length, '11===')
  //   var dataList = provLi.PROVINCE_LIST.methods.getList()
  var dataList = [ {
    id: 1111,
    name: '浙江省'
    // value: 104
  } ]
  //   wx.cloud
  //     .callFunction({
  //       name: 'area'
  //     })
  //     .then(res => {
  //       console.log(res.result.data, 'res')
  //       this.$store.commit(this.$types.SET_PROVLIST, res.result.data)
  //       dataList = this.$store.state.provList
  //       console.log(dataList, 'zzzzz')
  //     })
  console.log(dataList, 'wwwww')
  // [
  //   {
  //     id: 1111,
  //     name: '浙江省',
  //     value: 104
  //   },
  //   {
  //     name: '新疆',
  //     value: 104
  //   }
  // ]
  const option = {
    tooltip: {
      triggerOn: 'click',
      formatter: function (e, t, n) {
        console.log(e, t, n, '??/')
        return '在' + e.name + '你搜索了' + e.value ? e.value : ''
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
  return chart
}
export default {
  mixins: [AREA_LIST],
  data () {
    return {
      echarts,
      onInit: initChart,
      searchPlant: [],
      prov: []
    }
  },
  components: {
    mpvueEcharts
  },
  onLoad () {
    wx.cloud
      .callFunction({
        name: 'area'
      })
      .then(res => {
        console.log(res.result.data, 'res')
        this.$store.commit(this.$types.SET_PROVLIST, res.result.data)
        this.prov = res.result.data
      })
  },
  method: {},
  computed: {

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