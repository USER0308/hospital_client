<template>
  <div>
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
