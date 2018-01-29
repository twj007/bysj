<template lang="html">
  <transition name="el-zoom-in-center">
    <el-main v-show="show">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
              <el-card class="box-card main-content">
                <div slot="header" class="clearfix title-div">
                  <span>{{ mainBlog.title  }}</span>
                  <el-button class="getMore pull-right" type="text" v-if="judge" @click="deleteBlog" >删除</el-button>
                  <el-button class="getMore pull-right" type="text" v-if="judge" @click="needAlter = true">修改</el-button>
                </div>
                <div class="content-body">
                  <span>
                    作者：{{mainBlog.author}}
                    发布日期：{{mainBlog.time}}
                    浏览量：（{{mainBlog.views}}）
                    评论: （{{mainBlog.comments}}）
                  </span>
                  <div class="content">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<vue-markdown :source="mainBlog.content "></vue-markdown>
                  </div>
                </div>
              </el-card>
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
                <el-tag
                  v-for="tag in mainBlog.tags"
                  :key="tag.name"
                  closable<!-- 非本人无权修改（加判断） -->
                  @close="deleteTag(tag)">
                  {{tag.name}}
                </el-tag>
                <el-input
                  v-if="inputVisable"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="addNewTag"
                  @blur="addNewTag"
                >
                </el-input>
                <el-button v-else size="small" @click="changeVisable">添加标签</el-button>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-dialog title="修改内容" :visible.sync="needAlter">
          <el-form :model="mainBlog">
            <el-form-item label = "标题">
              <el-input v-model="mainBlog.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label = "内容(仅支持markdown风格)">
              <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容，支持markdown风格"
                  v-model="mainBlog.content">
                </el-input>
            </el-form-item>
          </el-form>
            <!-- 预览，markdown -->
            <el-dialog
              width="100%"
              title="预览"
              :visible.sync="preview"
              append-to-body>
            <vue-markdown :source="mainBlog.content"></vue-markdown>
            </el-dialog>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="preview = true">预览</el-button>
            <el-button type="primary" @click="submitAlter">确 定</el-button>
          </div>
        </el-dialog>
    </el-main>
  </transition>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  components: {VueMarkdown},
  data () {
    return {
      inputValue: '',//新标签
      inputVisable: false,//显示标签的输入
      judge: false,//判断是否为作者
      show: false,//载入过渡
      needAlter: false,//修改列表的显示
      preview: false,
      blogger: {
        id: 1,
        photoUrl: '',
        username: 'who we are',
        address: 'nanchang',
        self: 'you are dead'
      },
      mainBlog:{
        id: 1,
        title: '详情标题',
        author: '123',
        time: new Date().toLocaleDateString(),
        content: '全部内容',
        views: 1000,
        comments: 10,
        likes: 100,
        dislike: 10,
        isTemp: false,
        commenters: [], //[{ commenterId: 1, commenterName: 'jien', commenterContent: '这是内容', like: 10, dislike: 1}]
        tags: [{name:'数据库', tagId: 0}, {name:'sqlmap', tagId: 0}, {name:'渗透', tagId: 0}, {name:'web安全', tagId: 0}, {name:'java', tagId: 0}, {name:'sql injection', tagId: 0}, {name:'白帽子', tagId: 0}]
      }
    }
  },
  methods: {
    //初始化过渡
    showBox: function(){
      this.show = !this.show;
    },
    //删除blog
    deleteBlog: function(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //this.$http().then()删除
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //修改blog
    submitAlter: function(){
      //this.$http().then()修改
      this.$message({
        type: 'success',
        message: '修改成功'
      });
      //catch(err){ this.$message({type:'danger',message:'修改失败'});}
      // window.location.reload();
    },
    deleteTag: function(tag){
      //this.$http().then()删除标签
      this.mainBlog.tags.splice(this.mainBlog.tags.indexOf(tag), 1);
      this.$message({
        type: 'success',
        message: '删除成功'
      });
    },
    //添加新标签
    addNewTag: function(){
      //this.$http().then() inputValue
      let inputValue = this.inputValue;
      if(inputValue){
        this.mainBlog.tags.push({name:this.inputValue, tagId: 10});//tagId在想数据库中添加成功后回传回来
      }
      this.inputValue = 'false';
      this.inputValue = '';
      this.$message({
        type: 'success',
        message: '添加成功'
      });
    },
    //标签切换
    changeVisable: function(){
      this.inputVisible = true;
      console.log(this.$refs);
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    }
  },
  created(){
      //截取cookie
      var matchResult = window.document.cookie.match('(^|;) ?id=([^;]*)(;|$)');
      if(matchResult[2] == this.blogger.id){
        console.log(true);
        this.judge = true;
      }
      //请求所需数据 this.$http().then(//绑定数据);
      this.showBox();
    }

}
</script>

<style lang="scss" scoped>

</style>
