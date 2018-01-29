<template lang="html">
  <div class="main-container">
  <common-header v-show="show" :blogger="blogger"></common-header>
  <router-view></router-view>
  <common-footer v-show="show"></common-footer>
  <a class="fa-stack fa-large top" href="#">
    <i class="fa fa-4x fa-circle"></i>
    <i class="fa fa-1x fa-chevron-up "></i>
  </a>
  </div>
</template>

<script>
import commonHeader from '@/components/header.vue'
import commonFooter from '@/components/footer.vue'

export default {
  data() {
    return {
      show: false,
      blogger: {
        photoUrl: '',
        username: 'who we are',
        address: 'nanchang',
        self: 'you are dead'
      },
    }
  },
  methods: {
    showBox: function(){
      this.show = !this.show;
    }
  },
  components: {
    commonHeader,
    commonFooter
  },
  created(){
    // setTimeout(()=>{
    //   this.showBox();
    // }, 1000);
    this.showBox();
  }
}
</script>

<style lang="scss" scoped>
  .fa{
    cursor: pointer;
    position: fixed;
    right: 25px;
    bottom: 80px;
  }
  .fa-circle{
    color: #d0cfcf;
  }
  .fa-chevron-up{
    bottom: 100px;
    right: 40px;
  }
  .top:hover{
    .fa-circle{
      color: #409EFF;
    }
    .fa-chevron-up{
      color: #ffffff;
    }
  }

</style>
