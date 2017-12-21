<template>
  <div>
    <el-container>
      <el-header>
        <span class="title">合作医院登录</span>
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
        <el-main>
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
          value: '广东省人民医院',
          label: '广东省人民医院'
        }, {
          value: '广东省华南理工大学附属医院',
          label: '广东省华南理工大学附属医院'
        }],
        value: '广东省华南理工大学附属医院',
        selection: ''
      }
    },
    methods: {
      handleClick () {
        console.log('account: ', this.account)
        console.log('password: ', this.password)
        console.log('hospital: ', this.value)
        let object = {
          account: this.account,
          password: this.password
        }
        this.$http.post('/auth/user', object)
          .then((res) => {
            console.log(res.data)
            if (res.data.success) {
              this.$message.success(res.data.info)
              this.$router.push({
                path: '/userinfo/:info',
                name: 'UserInfo',
                params: {
                  info: {
                    account: this.account,
                    shareInfo: res.data.shareInfo
                  }
                }
              })
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
  #myContainer
    margin-top 120px
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
