<template>

  <van-overlay :show="show">
      <div class="all"><img :src="close" class="close" @click="closePop"/>
      {{!!data.baike_info}}
          <div v-if='data.baike_info'>
      <img :src='data.baike_info.image_url' class="img">
     <div class="description">{{data.baike_info.description}}</div>
     
       </div>
      <div v-else>
           <div class="name">{{data.name}}</div>
           <div class="score margin-top10">相似度：{{data.score}}</div>
      </div>
       <img
        class="icon"
        :src="isFavor ? iconActive : icon"
        @click="showFavor"
      />
      </div>
  </van-overlay>
</template>
<script>
import icon from '../assets/images/icon/heart-empty.png'
import iconActive from '../assets/images/icon/heart-active.png'
import close from '../assets/images/icon/close.png'
export default {
  props: {
    data: {
      type: Object

    },
    show: Boolean
  },
  data () {
    return {
      icon,
      iconActive,
      close,
      more: ''
    }
  },
  onLoad () {
    console.log(this.data, this.show, 'fff')
    this.more = this.data.baike_info
  },
  methods: {
    closePop () {
      this.$emit('close')
    },
    showFavor () {
      console.log('xihun')
    }
  }
}
</script>
<style lang="scss" scoped>
.all{
    background:white;
    position: relative;
    top:30%;
    left:15%;
    width:70%;
    text-align:center;
    border-radius: 10rpx;
    padding:30rpx;
    .img{
       width:100%;
       height:100rpx;
        
    }
    .icon{
        width:40rpx;
        height:40rpx;
    }
    .name{
font-size:16px;
    }
    .description{
        text-indent:1em;
    }
    .close{
        float:right;
        width:40rpx;
        height:40rpx;
    }
}
</style>
