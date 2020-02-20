// 首个路由为首页
module.exports = [
  {
    path: 'pages/search/home',
    name: 'home',
    config: {
      navigationBarTitleText: '植物识别',
      // 引入UI组件，后面会讲到
      usingComponents: {
        'van-button': '../../static/dist/button/index'
      }
    }
  },

  {
    path: 'pages/mine/personal',
    name: 'personal',
    config: {
      navigationBarTitleText: '我的',
      usingComponents: {
        'van-rate': '../static/dist/rate/index'
      }
    }
  },
  {
    path: 'pages/search/select_city',
    name: 'select_city',
    config: {
      navigationBarTitleText: '选择城市'
    }
  },
  {
    path: 'pages/search/search',
    name: 'search',
    config: {
      navigationBarTitleText: '搜索'
    }
  },
  {
    path: 'pages/search/details',
    name: 'details',
    config: {
      navigationBarTitleText: '简介',
      usingComponents: {
        'van-overlay': '../static/dist/overlay/index',
        'van-icon': '../static/dist/icon/index',
        'van-button': '../../static/dist/button/index'
      }
    }
  },
  {
    path: 'pages/mine/favorite',
    name: 'favorite',
    config: {
      navigationBarTitleText: '我的收藏',
      usingComponents: {
        'van-grid': '../../static/dist/grid/index',
        'van-grid-item': '../../static/dist/grid-item/index'
      }
    }
  },
  {
    path: 'pages/mine/otherSearch',
    name: 'otherSearch',
    config: {
      navigationBarTitleText: '看看别人'
    }
  },
  {
    path: 'pages/search/plant_detail',
    name: 'plant_detail',
    config: {
      navigationBarTitleText: '植物详情',
      usingComponents: {

        'van-skeleton': '../static/dist/skeleton/index'
      }
    }
  },
  {
    path: 'pages/search/web_view',
    name: 'web_view',
    config: {
      navigationBarTitleText: '网页'
    }
  }
]
