<template>
  <div>
    <div>
      <template id="mainView">
        <div class="loginForm">
          <ul class="loginTit" style="list-style:none;display:block;">
            <li class="default">会员登录</li>
          </ul>
          <div class="loginInner">
            <div class="tab-cent">
              <form name="login" id="login" method="post" action="https://passport.jiayuan.com/dologin.php?pre_url=http://www.jiayuan.com/usercp" target="login_run">
                <div class="login_zh fn-clear">
                  <label class="lab">登录帐号</label>
                  <div class="login_inpBox">
                    <label for="login_email" class="login_label">邮箱/ID/手机号</label>
                    <input class="text" name="name" type="text" id="login_email" v-model="account" value="">
                  </div>
                </div>
                <div class="login_mm fn-clear" style="margin-top:10px;">
                  <label class="lab">密<i class="f_white">密码</i>码</label>
                  <div class="login_inpBox">
                    <label for="login_password" class="login_label">密码</label>
                    <input class="text" type="password" name="password" v-model="password">
                  </div>
                </div>
                <p class="loginSelf" style="margin-top:10px;">
                  <input type="checkbox" name="remem_pass" checked id="check_save" onclick="saveName(this);" />
                  <label><span style="font-size:12px">两周内自动登录</span></label>
                </p>
                <div class="btnsBox">
                  <a class="btnLogin" id="login_btn"  @click="goLogin">登&nbsp;录</a>
                  <a class="forgMM" style='cursor:pointer;'>忘记密码</a>
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
                <img src="../assets/hezuo.png" style="width:36px; height:29px;" v-popover:popover1 @click="authorize" />
              </p>
            </div>
            <p class="goReg">
              <a >还不是会员？立即注册</a>
            </p>
          </div>
        </div>

      </template>
    </div>
    <el-input v-model="account" placeholder="帐号"></el-input>
    <el-input v-model="password" placeholder="密码"></el-input>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
  export default {
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
                    shareInfo: shareInfo
                  }
                }
              })
            }
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
</script>
