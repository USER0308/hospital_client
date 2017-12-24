<template>
  <div>
    <div class="main">
      <template>
        <div class="loginForm">
          <ul class="loginTit" style="list-style:none;display:block;">
            <li class="default">附属人民医院</li>
          </ul>
          <div class="loginInner">
            <div>
              <form name="login" id="login">
                <div>
                  <div>
                    <el-input class="text" name="name" id="login_email" v-model="account" placeholder="邮箱/ID/手机号"></el-input>
                  </div>
                </div>
                <div class="login_mm fn-clear" style="margin-top:10px;">
                  <div>
                    <el-input class="text" type="password" name="password" v-model="password" placeholder="密码"></el-input>
                  </div>
                </div>
                <p class="loginSelf" style="margin-top:10px;">
                  <input type="checkbox" checked id="check_save" />
                  <label><span style="font-size:12px">两周内自动登录</span></label>
                </p>
                <div>
                  <el-button @click="login">登&nbsp;录</el-button>
                  <a class="forgMM" style='cursor:pointer; margin-left: 50px'>忘记密码</a>
                </div>
              </form>
            </div>
            <div class="openId">
              <p>
                <span class="lTit">其他帐号登录</span>
                <img src="../assets/weibo.png" style="width:30px; height:30px;" />
                <img src="../assets/qq.png" style="width:30px; height:30px;" />
                <img src="../assets/weixin.png" style="width:30px; height:30px;" />
                <el-popover ref="popover1" placement="top-start" width="200" trigger="hover" content="选择合作企业登录。">
                </el-popover>
                <img src="../assets/hezuo.png" style="width:36px; height:29px;" @click="authorize" />
              </p>
            </div>
            <p class="goReg">
              还不是会员？立即<a href="#">注册</a>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'

  export default {
    components: {ElButton},
    data () {
      return {
        account: '',
        password: ''
      }
    },
    methods: {
      login () {
        console.log('login')
        this.$http.post('/auth/user', {account: this.account, password: this.password})
          .then((res) => {
            if (res.data.success) {
              let shareInfo = res.data.shareInfo
              this.$router.push({
                path: '/userinfo/:info',
                name: 'UserInfo',
                params: {
                  info: {
                    account: this.account,
                    shareInfo: shareInfo,
                    isAuthorize: 'false',
                    org: 'org1'
                  }
                }
              })
            }
          }, (err) => {
            console.log(err)
          })
      },
      authorize () {
        this.$router.push('/')
      }
    }
  }
</script>


<style>

  .main {
    background-image: url("../assets/xiehe.jpg");
    /*height: 1000px;*/
    background-color: #f4f4f4;
    background-position: 260px top;
    background-repeat: no-repeat;
  }
  div {
    display: block;
    margin: 0;
    padding: 0;
  }
  .header {
    height: 70px;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
  }
  .w {
    width: 960px;
    min-width: 960px;
    overflow: hidden;
    text-align: left;
    zoom: 1;
  }
  .logo {
    top: 0%;
    width: 365px;
    height: 70px;
  }
  .logo a {
    width: 215px;
    height: 70px;
  }
  .logo,
  .logo a,
  .logo span {
    display: inline;
    overflow: hidden;
  }
  .loginForm {
    width: 367px;
    margin: 45px 0 0 64px;
    background: #fff;
    padding: 0;
  }
  .loginTit {
    padding: 0;
    height: 52px;
    background: #fafafa;
    border-left: 1px solid #d3d3d3;
  }
  .loginInner {
    padding: 15px 20px 20px 19px;
    border: 1px solid #d3d3d3;
    border-top: none;
  }
  .login_zh, .login_mm, .login_code, .login_zh_o, .login_mm_o {
    padding: 8px 0 0 0;
  }
  .loginSelf {
    zoom: 1;
    height: 22px;
    overflow: hidden;
    line-height: 20px;
    padding-left: 89px;
    font-size: 0;
    color: #a4a4a4;
  }
  .loginInner .btnsBox {
    zoom: 1;
    overflow: hidden;
    line-height: 28px;
    margin-top: 15px;
    padding-left: 89px;
  }
  .openId {
    margin: 20px 0 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
  }
  .goReg {
    height: 22px;
    line-height: 22px;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    padding: 0;
  }
  .openId p .lTit {
    float: left;
    display: inline;
    width: 80px;
    height: 22px;
    overflow: hidden;
    margin-left: -89px;
    color: #a4a4a4;
    text-align: right;
    font-size: 13px;
  }
  .openId p a {
    float: left;
    display: inline;
    height: 22px;
    overflow: hidden;
    color: #666;
    white-space: nowrap;
    width: 70px;
  }
  .openId .icon_openId {
    float: left;
    display: inline;
    margin-top: 3px;
    margin-right: 5px;
    cursor: pointer;
    transition: all .2s;
  }
  .loginInner .lab {
    float: left;
    display: inline;
    width: 80px;
    height: 32px;
    line-height: 32px;
    margin-right: 9px;
    font-size: 14px;
    color: #666;
    text-align: right;
  }
  .loginInner .login_inpBox {
    position: relative;
    float: left;
    display: inline;
    width: 220px;
    height: 30px;
    border: 1px solid #d3d3d3;
  }
  .loginInner .login_inpBox label.login_label {
    position: absolute;
    z-index: 1;
    z-index: 3\9;
    top: 5px;
    left: 10px;
    display: none;
    line-height: 20px;
    font-size: 14px;
    color: #a4a4a4;
    cursor: text;
  }
  .loginInner .login_inpBox input {
    position: absolute;
    z-index: 2;
    left: 0;
    width: 100%;
    line-height: 20px;
    border: none;
    background-color: rgba(255,255,255,0);
    font-size: 14px;
    color: #333;
    text-indent: 10px;
  }
  .f_white {
    color: #fff;
  }
  .loginInner .btnLogin {
    float: left;
    display: inline;
    width: 100px;
    height: 26px;
    line-height: 26px;
    margin-right: 20px;
    border: 1px solid #409EFF;
    background: #409EFF;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
  .fn-clear:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  .loginTit li.default {
    width: 365px;
    border: 1px solid #d3d3d3;
    border-left: 0;
    background-color: #fafafa;
    color: #000;
    text-align: left;
    text-indent: 40px;
    cursor: default;
    height: 50px;
    line-height:50px;
  }
  .loginSelf input {
    float: left;
    display: inline;
    margin-top: 2px;
    margin-right: 6px;
    _margin-top: 0;
    _margin-right: 2px;
  }
  .openId p {
    zoom: 1;
    overflow: hidden;
    line-height: 22px;
  }
  .loginSelf, .loginInner .btnsBox, .openId p {
    padding-left: 89px;
  }
  .shareXF {
    zoom: 1;
    overflow: hidden;
    margin-bottom: 30px;
    padding: 12px 0 0;
  }
</style>
