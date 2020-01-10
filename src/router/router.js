// 首个路由为首页
module.exports = [
  {
    path: 'pages/home',
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
    path: 'pages/personal',
    name: 'personal',
    config: {
      navigationBarTitleText: '我的'
    }
  },
  {
    path: 'pages/select_city',
    name: 'select_city',
    config: {
      navigationBarTitleText: '选择城市'
    }
  },
  {
    path: 'pages/search',
    name: 'search',
    config: {
      navigationBarTitleText: '搜索'
    }
  },
  {
    path: 'pages/details',
    name: 'details',
    config: {
      navigationBarTitleText: '简介'
    }
  },
  {
    path: 'pages/favorite',
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
    path: 'pages/otherSearch',
    name: 'otherSearch',
    config: {
      navigationBarTitleText: '看看别人'
    }
  },
  {
    path: 'pages/film_detail',
    name: 'film_detail',
    config: {
      navigationBarTitleText: '影片详情'
    }
  },
  {
    path: 'pages/web_view',
    name: 'web_view',
    config: {
      navigationBarTitleText: '网页'
    }
  },
  {
    path: 'pages/select_seat',
    name: 'select_seat',
    config: {
      navigationBarTitleText: '选择座位'
    }
  }
]
