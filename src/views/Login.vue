<template>
  <div class="login-wrap">
      <div class="ms-title">
          HappyMmall后台管理系统
      </div>
      <div class="ms-login">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="ruleForm.username" placeholder="username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密 码">
                <el-input v-model="ruleForm.password" type="password" placeholder="password"></el-input>
            </el-form-item>

            <div class="login-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </el-form>
      </div>
  </div>
</template>

<script>
// import {login} from 'api/user';
import Util from "util/mm.js"
import User from 'api/user-service.js'

const _mm    = new Util(),
	_user  = new User();
	
export default {
  name: 'Login',
  data () {
    return {
      ruleForm:{
        username:'admin',
        password:'admin'
      },
      rules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
          if(valid) {
            // localStorage.setItem('username',this.ruleForm.username);
            // login(this.ruleForm).then((res)=>{
            //   console.log(res);
            //   return;
            // })
            // this.$router.push('/')

              _user.login(this.ruleForm).then((res) => {
                _mm.setStorage('userInfo',res);
                this.$router.push('/dashboard')
              },(errMsg) => {
                _mm.errorTips(errMsg);
              })

          } else {
            console.log('error submit');
            return false;
          }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-wrap{
  position: relative;
  width:100%;
  height:100%;
}
.ms-title{
  position:absolute;
  top:50%;
  width:100%;
  margin-top:-230px;
  text-align: center;
  font-size:30px;
  color:#fff;
}
.ms-login{
  position:absolute;
  left:50%;
  top:50%;
  width:300px;
  height:160px;
  margin:-150px 0 0 -190px;
  padding:40px;
  border-radius:5px;
  background:#fff;
}
.login-btn{
  text-align:center;
}
.login-btn button{
  width:100%;
  height:36px;
}
</style>
