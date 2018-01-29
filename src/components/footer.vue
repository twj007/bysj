<template lang="html">
  <transition name="el-zoom-in-bottom">
    <el-footer v-once>
      <span><i class="fa fa-copyright"></i>copyright 2018 涂伟俊 毕业设计</span>
    </el-footer>
  </transition>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .el-footer{
    text-align: center;
    background-color: #409EFF;
    span{
    	line-height: 50px
    }

  }
</style>
