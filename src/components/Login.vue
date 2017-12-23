<template>
  <div>
    <el-container>
      <el-header>
        <span class="title" id="scutHospital">合作医院登录</span>
      </el-header>
      <el-container id="myContainer">
      <el-aside width="50%">
        <el-row class="content">
          <el-col :xs="24" :sm="{span: 16,offset: 4}">
          <span class="title">
           帐号密码登录
          </span>
            <el-row>
              <select id="select_id" v-model="value" @change="selectChange">
                <option v-for="hospital in totalHospital" v-bind:value="hospital.value" v-bind:label="hospital.label"></option>
              </select>
              <el-input
                v-model="account"
                placeholder="身份证号,医保卡号"
                type="text">
              </el-input>
              <el-input
                v-model="password"
                placeholder="密码"
                type="password">
              </el-input>
              <el-button type="primary" @click="handleClick">授权登录</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-aside>
        <el-main id="myMain">
          <hr>
          华南理工大学附属医院将会获得以下权限和信息
          <hr>
          <div id="privillage">
            完整个人信息<br/>
            病例<br/>
            个人体验单<br/>
            医嘱<br/>
          </div>
          <br/>
          授权后表明你已同意<a href="#" >广东省人民医院医疗联盟区块链登录服务协议</a>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ElOption from '../../node_modules/element-ui/packages/select/src/option.vue'
//  import ElSelect from '../../node_modules/element-ui/packages/select/src/select.vue'
  import ElContainer from '../../node_modules/element-ui/packages/container/src/main.vue'
  import ElHeader from '../../node_modules/element-ui/packages/header/src/main.vue'
  import ElAside from '../../node_modules/element-ui/packages/aside/src/main.vue'
  import ElMain from '../../node_modules/element-ui/packages/main/src/main.vue'

  export default {
    components: {
      ElMain,
      ElAside,
      ElHeader,
      ElContainer,
//      ElSelect,
      ElOption},
    data () {
      return {
        account: '',
        password: '',
        totalHospital: [{
          value: 'org1', // 广东省人民医院
          label: 'org1'
        }, {
          value: 'org2',
          label: 'org2' // 广东省华南理工大学附属医院
        }],
        value: 'org2',
        selection: ''
      }
    },
    methods: {
      handleClick () {
        console.log('account: ', this.account)
        console.log('password: ', this.password)
        console.log('hospital: ', this.value)
        let object = {
          username: this.account,
          password: this.password,
          org: this.value
        }
        this.$http.post('http://192.168.8.87:8889/login', object)
          .then((res) => {
            console.log(res.data)
            if (res.data.state === 1) {
              this.$message.success('授权成功')
              console.log('授权成功,data is', res.data)
              if (res.data.info !== null) {
                console.log(res.data.info)
                let obj = {
                  token: res.data.token,
                  info: res.data.info
                }
                this.$http.post('/auth/user/validate', obj)
                  .then((res) => {
                    if (res.data.success) {
                      this.$router.push({
                        path: '/userinfo/:info',
                        name: 'UserInfo',
                        params: {
                          info: {
                            account: obj.token,
                            shareInfo: obj.info,
                            org: this.value
                          }
                        }
                      })
                    }
                  }, (err) => {
                    console.log('error', err)
                  })
              } else {
                console.log('token is', res.data.token)
                let token = res.data.token
                this.$http.post('/auth/user/info', {account: token})
                  .then((res) => {
                    console.log('res.data is', res.data.shareInfo)
                    this.$router.push({
                      path: '/userinfo/:info',
                      name: 'UserInfo',
                      params: {
                        info: {
                          account: token,
                          shareInfo: res.data.shareInfo
                        }
                      }
                    })
                  }, (err) => {
                    console.log(err)
                  })
              }
            } else {
              this.$message.error(res.data.info)
            }
          }, (err) => {
            console.log('in post authorize, error is', err)
          })
      },
      selectChange () {
        // alert(this.value)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #myMain
    margin-right 80px
  #myContainer
    margin-top 120px
  #scutHospital
    float left
    margin-top 10px
    margin-left 20px
    font-size  25px
    margin-bottom 10px
  .el-header
    background-color #129eff
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
  #select_id
    position relative
    left -2px
    top -2px
    font-size 15px
    width 470px
    height 40px
    line-height 0px
    border solid lightgray
    background-color white
    color gray
  #privillage
    text-align left
    margin-left 100px
</style>
