import {validateUser, validatePass, validateEmail, validatePasswordEqual} from '@/assets/javascripts/validate.js'
import {loginForm, registerForm} from '@/mixins/forms.js'
import qs from 'qs'
import aes from '../../static/lib/aes-ctr.js'
import {accessKey} from '../../service/const/constModule'

export default{
  data () {
    return {
      loginForm: loginForm,
      registerForm: registerForm,
      loginRules: {
        username: [{validator: validateUser, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}]
      },
      registerRules: {
        username: [{validator: validateUser, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        email: [{validator: validateEmail, trigger: 'blur'}],
        confirmPassword: [{validator: validatePasswordEqual, trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          setInterval(()=>this.loading = false , 1000)
          this.loading = true
          if(formName === 'loginForm'){
            var form = {
              username: this.loginForm.username,
              password: aes.encrypt(this.loginForm.password, accessKey),
              remember: this.loginForm.remember
            }
            console.log(form);
            this.$http({
              method: 'post',
              url: '/user/login',
              data: {login: form}
          }).then(res => {
              if(res.data.retCode == 200){
                console.log(200);
              }else{
                this.$message({
                  type: "warning",
                  message: res.data.message
                });
              }
            }).catch(err => {
              console.log(err);
            });
          }else if(formName === 'registerForm'){
            this.$http.post()
          }
        }else {
          console.log('error submit');
          return false;
        }
      })
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
}
}
