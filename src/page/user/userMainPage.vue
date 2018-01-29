<template lang="html">
    <transition name="el-zoom-in-center">
      <el-main v-show="show">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <div v-for="article in blogList">
                <el-card class="box-card main-content">
                  <div slot="header" class="clearfix title-div">
                    <span>{{ article.title | cutTitle }}</span>
                    <router-link class="getMore pull-right" :to="{ path: 'blog/getDetail', params: {id: article.id} }">查看详情</router-link>
                  </div>
                  <div class="content-body">
                    <span>
                      作者：{{article.author}}
                      发布日期：{{article.time}}
                      浏览量：（{{article.views}}）
                      评论: （{{article.comments}}）
                    </span>
                    <div class="content">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ article.content }}
                      <!-- <el-collapse v-model="activeName" accordion>
                        <el-collapse-item title="一致性 Consistency" name="1">
                          <input type="text" disabled v-model.trim="testword">
                          <textarea name="name" rows="8" cols="80" disabled>{{article.content | beautifyContent}}</textarea>
                          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback" name="2">
                          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                        <el-collapse-item title="效率 Efficiency" name="3">
                          <div>简化流程：设计简洁直观的操作流程；</div>
                          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </el-collapse-item>
                        <el-collapse-item title="可控 Controllability" name="4">
                          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </el-collapse-item>
                      </el-collapse> -->
                    </div>
                  </div>
                </el-card>
              </div>
              <div class="">
                <div class="pagination">
                  <el-pagination
                    background
                    @current-change="handleCurrentPage"
                    layout="prev, pager, next"
                    :current-page.sync="index"
                    :page-size="pageSize"
                    :total="totalCount">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-card class="box-card main-info">
                <div class="self-photo" v-if="blogger.photoUrl">
                  <img src="">
                </div>
                <div v-else class="self-photo">
                  <img src="../../assets/images/person.png" width="200px" height="200px">
                </div>
                <div class="person-info">
                  <p>{{blogger.username}}</p>
                  <p>{{blogger.address}}</p>
                  <p>{{blogger.self}}</p>
                </div>
              </el-card>
            </div>
            <div class="grid-content bg-purple" style="margin-top: 10px">
              <el-card class="box-card main-info">
                关于标签的一些东西
              </el-card>
            </div>
          </el-col>
        </el-row>
    </el-main>
    <!-- 右上角弹出框 -->
  </transition>
</template>

<script>
export default {
  data() {
    return {
      index: 1,
      pageSize: 3,
      totalCount: 5,
      show: false,
      dislike: 2,
      like: 10,
      testword: '不玩了。。。',
      activeName: ['1'],
      blogger: {
        id: 0,
        photoUrl: '',
        username: 'who we are',
        address: 'nanchang',
        self: 'you are dead',
        message: 10
      },
      blogList: [{
        id: 0,
        title: '这是一个标题111111111111111111111111111111111111111111111111111',
        author: '作者是',
        time: new Date(),
        content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容1是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容是内容这是内容这是内容',
        views: 1000,
        comments: 10,
        isTemp: true
      },
      {
        id: 0,
        title: '这是一个标题2',
        author: '作者是',
        time: new Date(),
        content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        views: 1000,
        comments: 10,
        isTemp: true,
        commentList: [{
          commenter: '',
          time: new Date(),
          content: '',
          like: 10,
          dislike: 0,
          reply: []
        }]
      },
      {
        id: 0,
        title: '这是一个标题3',
        author: '作者是',
        time: new Date(),
        content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        views: 1000,
        comments: 10,
        isTemp: true
      },
      {
        id: 0,
        title: '这是一个标题4',
        author: '作者是',
        time: new Date(),
        content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        views: 1000,
        comments: 10,
        isTemp: true
      },
      {
        id: 0,
        title: '这是一个标题5',
        author: '作者是',
        time: new Date(),
        content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        views: 1000,
        comments: 10,
        isTemp: true
      }]
    }
  },
  filters: {
    cutTitle: function(val) {
      if(val.length > 20){
        return val.substring(0, 20) + '...'
      }else{
        return val;
      }
    },
    // beautifyContent: function(val) {
    //   if(val.length > 1000){
    //     this.active = true;
    //   }
    //   return val;
    // }
  },
  methods: {
    //翻页请求
    handleCurrentPage: function(){
      if(this.totalCount){
        console.log(this.index);
      }
    },
    showBox: function(){
      this.show = !this.show;
    }
  },
  created(){
      //显示之前请求需要的数据  this.$http().then( //绑定数据)
      this.$notify({
          title: '提示',
          message: '有'+this.blogger.message+'条消息找到了你!',
          type: 'success'
      });
      this.showBox();

  }
}
</script>

<style lang="scss" scoped>

</style>
