<template>
    <div>
        <div class="text-align-center font-size12 margin-top30" >介绍</div>
        <div>拿接口文字</div>
        <div class=" text-align-center margin-bototm30">
        <img :src="img" class="plant">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      img: ''
    }
  },
  mounted () {
    this.img = this.$route.query.image
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.plant{
    width:200rpx;
    height:200rpx;
}
</style>