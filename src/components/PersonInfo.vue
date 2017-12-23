<template>
  <div>
    <el-container>
      <el-header>
        <span class="title" id="scutHospital">华南理工大学附属医院</span>
        <span><a id="logout" @click="logout">退出</a></span>
      </el-header>
      <hr align=left width=100% color=gray size=2 noShade>
      <el-container id="myContainer">
        <el-aside width="20%">
          <el-row>
            <el-col>
              <el-menu
              defaultActive="1"
              @select="handleSelect"
              >
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">健康档案</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <div id="info" v-show="infoVisible">
            <el-row>
              <el-col :span="3" :offset="1">
                <img id="head" src="../assets/logo.png">
              </el-col>
            </el-row>
            <el-form labelWidth="100px">
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="姓名">
                    <el-input v-model="userInfo.name" placeholder="name" @focus="focus('name')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="性别">
                    <el-input v-model="userInfo.gender" placeholder="gender" @focus="focus('gender')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="婚姻状态">
                    <el-input v-model="userInfo.marriage" placeholder="marriage" @focus="focus('marriage')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="年龄">
                    <el-input v-model="userInfo.age" placeholder="age" @focus="focus('age')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="居住地">
                    <el-input v-model="userInfo.resident" placeholder="resident" @focus="focus('resident')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="联系方式">
                    <el-input v-model="userInfo.phone" placeholder="phone" @focus="focus('phone')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="身份证号码">
                    <el-input v-model="userInfo.pin" placeholder="pin" @focus="focus('pin')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="籍贯">
                    <el-input v-model="userInfo.birthplace" placeholder="birthplace" @focus="focus('birthplace')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="民族">
                    <el-input v-model="userInfo.nationality" placeholder="nationality" @focus="focus('nationality')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="职业">
                    <el-input v-model="userInfo.occupation" placeholder="occupation" @focus="focus('occupation')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="过敏原">
                    <el-input v-model="userInfo.anaphylactogen" placeholder="anaphylactogen" @focus="focus('anaphylactogen')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="感染病史">
                    <el-input v-model="userInfo.infectiousDiseaseHistory" placeholder="infectiousDiseaseHistory" @focus="focus('infectiousDiseaseHistory')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15" :offset="3">
                  <el-form-item label="遗传病史">
                    <el-input v-model="userInfo.geneticDiseaseHistory" placeholder="geneticDiseaseHistory" @focus="focus('geneticDiseaseHistory')" @change="changeValue"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div id="record" v-show="recordVisible">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="个人病例" name="1">
                <div v-for="ca in cases">
                  {{ ca }}
                </div>
              </el-collapse-item>
              <el-collapse-item title="个人体检单" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="个人健康状况" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="医嘱" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        account: '',
        org: '',
        isAuthorize: '',
        infoVisible: true,
        recordVisible: false,
        activeNames: ['1'],
        modifyKey: '',
        modifyValue: '',
        userInfo: {
          age: '',
          anaphylactogen: '',
          birthplace: '',
          gender: '',
          geneticDiseaseHistory: '',
          infectiousDiseaseHistory: '',
          marriage: '',
          name: '',
          nationality: '',
          occupation: '',
          phone: '',
          pin: '',
          resident: ''
        },
        cases: []
      }
    },
    mounted: function () {
      if (!this.$route.params.info) {
        this.$router.push('/')
        return
      }
      console.log(this.$route.params.info)
      console.log('account is', this.$route.params.info.account)
      this.account = this.$route.params.info.account
      console.log('shareinfo is: ', this.$route.params.info.shareInfo)
      this.userInfo = this.$route.params.info.shareInfo
      this.org = this.$route.params.info.org
      this.isAuthorize = this.$route.params.info.isAuthorize
      console.log('account is', this.account)
      this.$http.post('/auth/user/getCases', {account: this.account})
        .then((res) => {
          console.log(res.data.info)
          this.cases = res.data.cases
          console.log(res.data.cases)
        }, (err) => {
          console.log('in query cases error is:', err)
        })
    },
    methods: {
      handleSelect (value) {
        if (value === '2') {
          this.infoVisible = false
          this.recordVisible = true
        } else if (value === '1') {
          this.infoVisible = true
          this.recordVisible = false
        }
      },
      changeValue (value) {
        this.modifyValue = value
        console.log('modify')
        console.log(this.modifyKey)
        console.log(this.modifyValue)
        let key = this.modifyKey
        let info = {}
        info[key] = value
        this.$http.post('/auth/user/update', {
          account: this.account,
          info: info
        })
        let obj = {}
        if (this.isAuthorize) { // 如果是授权
          obj.token = this.account
          obj.type = '0'
          obj.key = this.modifyKey
          obj.value = this.modifyValue
        } else {
          obj.org = this.org
          obj.username = this.account
          obj.type = '0'
          obj.key = this.modifyKey
          obj.value = this.modifyValue
        }
        this.$http('http://192.168.8.87:8889/edit', obj)
          .then((res) => {
            if (res.data.state) {
              this.$message.success('更新成功')
            }
          }, (err) => {
            console.log(err)
          })
      },
      focus (key) {
        this.modifyKey = key
      },
      handleChange () {},
      logout () {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus">
  /*.el-header*/
    /*background-color #129eff*/
  #head
    height 100px
    width 100px
  #logout
    margin-right 20px
  #scutHospital
    float left
    margin-top 10px
    margin-left 20px
    font-size  25px
    margin-bottom 10px
  #logout
    float right
    margin-top 10px
    margin-left 20px
    font-size  20px
    margin-bottom 10px
    text-decoration none
  #logout:hover
    color red
</style>
