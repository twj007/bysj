import {registerForm} from '@/mixins/forms.js'

export const validateUser = (rule, value, callback) => {
  const regex = /^[A-Za-z0-9]+$/;
  if(value === '') {
    callback(new Error('用户名不为空'));
  }if(value.length < 6) {
    callback(new Error('用户名不小于6位'));
  }else if(!regex.test(value)) {
    callback(new Error('用户名由数字和字母组成'));
  }else{
    callback();
  }
};

export const validatePass = (rule, value, callback) => {
  if(value === '') {
    callback(new Error('密码不为空'));
  }else if(value.length < 6){
    callback(new Error('密码不小于6位'));
  }else {
    callback();
  }
};

export const validateEmail = (rule, value, callback) => {
    const regex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    if(value === ''){
      callback(new Error('邮箱不为空'));
    }else if(regex.test(value)){
      callback();
    }else{
      callback(new Error('邮箱格式不正确'));
    }
}

export const validatePasswordEqual = (rule, value, callback) => {
  if(value === '') {
    callback(new Error('密码不为空'));
  }else if(value.length < 6){
    callback(new Error('密码不小于6位'));
  }else if(value !== registerForm.password){
    callback(new Error('密码不一致'));
  }else{
    callback();
  }
}
