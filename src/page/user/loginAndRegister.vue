<template lang="html">
  <transition name="el-zoom-in-top">

    <div class="login-container" v-show="show">
      <canvas id="root" width="1980" height="1080">您的浏览器不支持canvas，请换个浏览器试试</canvas>
      <div class="login-page">
           <div class="transition-box">
           	 <div class="login-title">
           	 	<span @click="isActive=true" :class="{active: isActive}">用户登陆</span>
           	 	<span @click="isActive=false" :class="{active: !isActive}">账号注册</span>
           	 </div>
             <el-form :model="loginForm" status-icon :class="{show: !isActive}" :rules="loginRules" :label-position="'top'" ref="loginForm" label-width="100px" class="loginForm">
                <el-form-item label="" prop="username">
                  <el-input type="text" v-model.trim="loginForm.username" auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                  <el-input type="password" v-model.trim="loginForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item class="login-text">
                  <el-checkbox label="记住密码" name="type" v-model.trim="loginForm.remember"></el-checkbox>
                  <el-button type="text" class="pull-right"><router-link to="/findLost">忘记密码?</router-link></el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="bg-btn" @click="submitForm('loginForm')" v-loading="loading">提交</el-button><br>
                  <el-button class="bg-btn" @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-form :model="registerForm" status-icon :class="{show: isActive}" :rules="registerRules" :label-position="'top'" ref="registerForm" label-width="100px" class="loginForm">
                 <el-form-item label="" prop="username">
                   <el-input type="text" v-model.trim="registerForm.username" auto-complete="off" placeholder="用户名"></el-input>
                 </el-form-item>
                 <el-form-item label="" prop="email">
                   <el-input type="text" v-model.trim="registerForm.email" auto-complete="off" placeholder="邮箱"></el-input>
                 </el-form-item>
                 <el-form-item label="" prop="password">
                   <el-input type="password" v-model.trim="registerForm.password" placeholder="密码"></el-input>
                 </el-form-item>
                 <el-form-item label="" prop="confirmPassword">
                   <el-input type="password" v-model.trim="registerForm.confirmPassword" placeholder="确认密码"></el-input>
                 </el-form-item>
                 <el-form-item class="login-text">
                   <el-button type="text" class="pull-right" @click="isActive=true">已有账号?登录</el-button>
                 </el-form-item>
                 <el-form-item>
                   <el-button type="primary" class="bg-btn" @click="submitForm('registerForm')" v-loading="loading" >提交</el-button><br>
                   <el-button class="bg-btn" @click="resetForm('registerForm')">重置</el-button>
                 </el-form-item>
               </el-form>
           </div>
      </div>

    </div>
  </transition>
</template>

<script>
import {CanvasAnimate} from '@/assets/javascripts/gama.js';
import mixins from '@/mixins/mixins.js'

export default {
  data () {
    return {
      show: false,
      isActive: true,
      loading: false,
      // rules: {
      //   name:[{ required: true, message: '请输入用户名', trigger: 'blur' },
      //         { min: 6, message: '用户名不小于6位', trigger: 'blur' },
      //         { type: string, pattern: /([0-z])/, message: '用户名只能包含字母和数字', trigger: 'blur'}],
      //   password: [{ required: true, message: '请输入密码', trigger: 'blur'},
      //              { min: 6, message: '密码不少于6位', trigger: 'blur'}]
      // }
    }
  },
  mixins: [mixins],
  methods: {
  	// activePanel1: function(){
  	//   this.isActive = true;
    //   this.resetForm('loginForm');
  	// },
    // activePanel2: function(){
    //   this.isActive = false;
    //   this.resetForm('registerForm');
    // }

  },
  watch:{
    //面板切换
    isActive: function(val){
      if(val == true){
        this.resetForm('loginForm');
      }else{
        this.resetForm('registerForm');
      }
    }
  },
  created() {
      this.show = true;
  },
  // beforeRouteEnter(to, from, next){
  //   var currentPath = to.path;
  //   if(to.path.indexOf('login') == -1){
  //     var open = setTimeout(() => {
  //       //vm在守卫进入的时候，vue实例还没有创建， 所以通过这个方式来延迟获取vm实例
  //       next(vm => {
  //         if(vm){
  //           vm.isActive = false;
  //         }
  //       })
  //     }, 1000);
  //   }else{
  //     next();
  //   }
  // }
  mounted(){
    //登录注册选项卡切换(可以通过动态组件完成吧)
    let route = this.$route;
    if(route){
      var path = route.path + '';
      // console.log(path);
      if(path.indexOf('login') == -1){
        this.isActive = false;
      }
    }
    let root = document.getElementById('root');
    let ca = new CanvasAnimate(root, {});
    ca.Run();
  }

}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/common.scss';
body{
  margin: 0px;
  padding: 0px;
}
#root{
  width: 100%;
  height: 100%;
  position: absolute;
}
.login-container{
  min-width: 1080px;
  min-height: 1080px;
  background: #eee;
}
.login-page{
  width: 400px;
  height: 150px;
  margin: auto;
  position: relative;
  top: 200px;
}
.bg-btn{
  width: 400px;
  margin-bottom: 10px
}
.login-title{
  width: 300px;
  margin: 0 0 15px auto
}
.logo{

}
.show{
  display: none;
}
.login-text{
  margin-bottom: 0px;
}
.login-title{
  width: 200px;
  height: 50px;
  margin: auto;
  span{
    cursor: pointer;
    padding: 5px;
  }
  span:hover{
     color: #409EFF;
   }
}
.login-title :nth-child(1){
  	float: left
  }
 .login-title :nth-child(2){
  	float: right
  }
  .active{
    color: #409EFF;
  	display: inline-block;
	  border-bottom: 2px solid #409EFF;
  }
</style>
