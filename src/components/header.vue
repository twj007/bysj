<template lang="html">
  <transition name="el-zoom-in-bottom">
    <div>
      <el-header style="max-height: 60px">
        <el-menu  class="el-menu-demo" background-color="#409eff" active-text-color="#ffffff" text-color="#ffffff" mode="horizontal"  router  @select="handleSelect">
        <el-menu-item index="/index"><span class="logo">logo</span></el-menu-item>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/listLog">日志</el-menu-item>
        <el-menu-item index="/">个人中心</el-menu-item>
          <div class="pull-right">
            <ul class="user-in" v-if="islogin">
              <li>
                <router-link to="login">登录</router-link>
              </li>
              <li>
                <router-link to="register">注册</router-link>
              </li>
            </ul>
            <div v-else class="user-info" :class="{on: isOn}" @mouseenter="changerState" @mouseleave="closeWindow">
              <div>
                  <span v-if="blogger.photoUrl" class="user-info-list">
                    <img :src="blogger.photoUrl"  class="person-image">
                  </span class="user-info-list">
                  <span v-else>
                    <img src="../assets/images/person.png"  class="person-image">
                  </span>
                  <transition name="el-zoom-in-bottom">
                    <div class="personal-info" v-show="show">
                      <ul class="personal-manage">
                          <li>
                            <!-- {{JSON.stringify(name)}} -->
                            <p>{{name}}</p>
                            {{blogger.self}}
                          </li>
                          <li>
                            <i class="fa fa-user-circle"></i><span><a href="#">个人中心</a></span>
                          </li>
                          <li>
                            <i class="fa fa-book"></i><span><a href="#">日志管理</a></span>
                          </li>
                          <li>
                            <i class="fa fa-comments"></i><span><a href="#">留言</a></span>
                          </li>
                          <li class="log-exit"><a href="#"><i class="fa fa-times"></i>退出</a></li>
                        </ul>
                    </div>
                  </transition>
              </div>
            </div>
          </div>
        </el-menu>
      </el-header>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
        isOn: false,
        islogin: true,
        show: false,
        name: '111'
      }
  },
  props: ['blogger'],
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      changerState() {
        this.isOn = true;
        this.show = !this.show
      },
      closeWindow() {
        this.show = false
        this.isOn = false
      }
    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>

  @import '../assets/styles/common.scss';
  .fa{
    color: blue;
  }
  .logo{
    color: #ffffff
  }
  .pull-right{
    line-height: 55px;
  }
  .user-in{
    li:hover{
      text-decoration: underline;
    };
    li{
      margin-right: 10px;
      display: inline-block;
      a{
        color: #ffffff;
      }
    }
  }
  .user-info-list{
    width: 40px;
    height: 40px;
  }
  .person-image{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 25px;
    display: inline-block;
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 2;
    float: right;
    transition: all 1s;
  }
  .personal-info{
    position: absolute;
    right: 0px;
    top: 60px;
    width: 200px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: block;
    z-index: 1;
    border: 1px solid #eee;
    background: #ffffff;
    border-radius: 0 0 5px 5px;
    color: #555;
  }
  .on{
    .person-image{
      width: 80px;
      height: 80px;
      right: 2.5%;
    }

  }
  .personal-manage{
     text-align: center;
    .personal-title{
      border-bottom: 1px solid #eee;
      line-height: 100px;
    }
    li{
      text-align: center;
       padding: 0 50px;
       p{
         position: relative;
         top: 25px;
         font-size: 24px;
       }
    }
    .log-exit{
        padding: 0 10px 0;
        text-align: right;
        background-color: #eee;
    }
  }
</style>
