<template lang='pug'>
  section
    .memberpersonal
      .memberinput
        ul
          li(:class='(showName != "") ? "diasbleInput" : ""')
            input#personalname.personalname(type='text'
                                            v-model.trim='memberForm.RealName'
                                            v-validate='"required"'
                                            name='RealName'
                                            data-vv-as='您的姓名'
                                            placeholder='请填写您的姓名'
                                            :class='{"input": true, "error": errors.has("RealName")}'
                                            :disabled='showName != ""')
            router-link(to="" onclick="LC_API.open_chat_window();" v-if='showName != ""') 联系客服修改
          .error(v-show='errors.has("RealName")')  {{ errors.first('RealName') }}
          li(:class='(showBirth != "") ? "diasbleInput" : ""')
            input.personalname(type="text" v-model='memberForm.Birthday' v-if='showBirth != ""' disabled)
            input.birthday(type="date" 
                            name="Birthday"
                            id='birthday'
                            v-model='memberForm.Birthday'
                            v-validate="'18Y'"
                            data-vv-as='您的生日' 
                            datatype="*" 
                            placeholder="请选择您的生日" 
                            onfocus="this.removeAttribute('placeholder')" 
                            :class='[{"input": true, "error": errors.has("Birthday")}, (memberForm.Birthday == "" || memberForm.Birthday == "0000-00-00") ? "placeho" : ""]'
                            v-if='showBirth == ""')
            router-link(to="" onclick="LC_API.open_chat_window();" v-if='showBirth != ""') 联系客服修改
          .error(v-show='errors.has("Birthday")') {{ errors.first('Birthday') }}
          .error 请输入正确生日，我们将为VIP会员派发生日礼金
          /////////////////////////////////////////////////////////////////////
          li.success_icon(v-if="verifyPhoneSteps == 1")
            input#personalphone.personalphone(type='tel'
                                              v-model.trim='memberForm.Phone'
                                              placeholder='输入手机号码' 
                                              v-validate='"required|PhoneV"'
                                              name='Phone'
                                              data-vv-as='手机号码'
                                              maxlength='11'
                                              :class='{"input": true, "error": errors.has("Phone")}')
            a.verify_btn(v-if='MemberData.PhoneStatus == 1' @click='phoneStep(2)') 修改手机
            a.verify_btn(v-else @click='phoneStep(2)') 绑定手机
            i.el-icon-success(v-if='MemberData.PhoneStatus == 1')  已验证
          li(v-if="verifyPhoneSteps == 2")
            input#personalphone.personalphone(type='tel'
                                              v-model.trim='verifyPhoneForm.Phone'
                                              placeholder='输入手机号码' 
                                              v-validate='"required|PhoneV"'
                                              name='Phone'
                                              data-vv-as='手机号码'
                                              maxlength='11'
                                              :class='{"input": true, "error": errors.has("Phone")}')
            button.verify_btn(@click='submitPhone' :disabled='submitPhoneDisbled') 发送验证码
            //- .cancel(@click='phoneStep(1)') 取消
          li(v-if="verifyPhoneSteps == 3")
            input#personalphone.personalphone(type='text'
                                              v-model.trim='verifyPhoneCodeForm.Code'
                                              placeholder='输入验证码，点右方提交' 
                                              v-validate='"required"'
                                              name='Phone'
                                              data-vv-as='输入验证码'
                                              :class='{"input": true, "error": errors.has("Phone")}')
            a.verify_btn(@click='submitPhoneCode') 验证手机
            .timeout {{ PhonetimeText }}秒
          .error(v-show='errors.has("Phone")')  {{ errors.first('Phone') }}
          ////////////////////////////////////////////////////////////////////////////////
          li.success_icon(v-if="verifyEmailSteps == 1")
            input#personalemail.personalemail(type='text'
                                              v-model.trim='memberForm.Email'
                                              placeholder='输入邮箱地址' 
                                              v-validate='"required|email"'
                                              name='Email'
                                              data-vv-as='邮箱地址'
                                              :class='{"input": true, "error": errors.has("Email")}')
            a.verify_btn(v-if='MemberData.EmailStatus == 1' @click='emailStep(2)') 修改邮箱
            a.verify_btn(v-else @click='emailStep(2)') 绑定邮箱
            i.el-icon-success(v-if='MemberData.EmailStatus == 1')  已验证
          li(v-if="verifyEmailSteps == 2")
            input#personalemail.personalemail(type='text'
                                              v-model.trim='verifyEmailForm.Email'
                                              placeholder='输入邮箱地址' 
                                              v-validate='"required|email"'
                                              name='Email'
                                              data-vv-as='邮箱地址'
                                              :class='{"input": true, "error": errors.has("Email")}')
            button.verify_btn(@click='submitEmail' :disabled='submitEmailDisbled') 发送验证码
            //- .cancel(@click='emailStep(1)') 取消
          li(v-if="verifyEmailSteps == 3")
            input#personalemail.personalemail(type='text'
                                              v-model.trim='verifyEmailCodeForm.Code'
                                              placeholder='输入验证码，点右方提交' 
                                              v-validate='"required"'
                                              name='Email'
                                              data-vv-as='输入验证码'
                                              :class='{"input": true, "error": errors.has("Email")}')
            a.verify_btn(@click='submitEmailCode') 验证邮箱
            .timeout {{ EmailtimeText }}秒
          .error(v-show='errors.has("Email")')  {{ errors.first('Email') }}
          ////////////////////////////////////////////////////////////////////////////////
          //- li
          //-   input#personalemail.personalemail(type='text'
          //-                                     v-model.trim='MemberData.Email'
          //-                                     placeholder='输入邮箱地址' 
          //-                                     v-validate='"required|email"'
          //-                                     name='Email'
          //-                                     data-vv-as='邮箱地址'
          //-                                     :class='{"input": true, "Email": errors.has("Email")}')
          //-   router-link(to="") 验证邮箱
          //- .error(v-show='errors.has("Email")')  {{ errors.first('Email') }}
          //- li
          //-   el-select#provincialcapital.provincialcapital(:value='MemberData.Province' placeholder='省份' @change='onSelectedProvince' )
          //-     el-option(v-for='(item, key) in ProvinceList' :key='key' :label='item' :value='key')
          //- li
          //-   el-select#provincialcapital.provincialcapital(:value='MemberData.City'  placeholder='城市' @change='onSelectedCity')
          //-     el-option(v-for='(item, key) in CityList' :key='key' :label='item' :value='key')
          //- li
          //-   el-select#provincialcapital.provincialcapital(:value='MemberData.State'  placeholder='区县' @change='onSelectedState')
          //-     el-option(v-for='(item, key) in StateList' :key='key' :label='item' :value='key')
          //- li
          //-   input#street.street(v-model='MemberData.Address' type="text" placeholder="输入地址")
          //- li
          //-   input#postalcode.postalcode(v-model='MemberData.Zipcode' type="text" placeholder="输入邮政编码")
          .error {{ getMemberDataUpdateErrorMessage }}
      form
        button.memberpersonal_btn(@click.prevent="submit" type="button" :loading="submitLoading") 提交修改
      // form
        button.memberpersonal_btn(@click.prevent="cancel" type="button") 取消
</template>
<script>
import axios from 'axios';
import router from '@/router/router';
import jwtDecode from 'jwt-decode';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      submitPhoneDisbled: false,
      submitEmailDisbled: false,
      ProvinceList: [],
      CityList: [],
      StateList: [],
      submitLoading: false,
      showName: '',
      showBirth: '',
      verifyPhoneSteps: 1,
      verifyPhoneForm: {
        UserId: this.UserId,
        Phone: this.$store.state.member.MemberData.Phone,
      },
      verifyPhoneCodeForm: {
        Code: '',
        VertifyInfo: '',
      },
      verifyEmailSteps: 1,
      verifyEmailForm: {
        UserId: this.UserId,
        Email: this.$store.state.member.MemberData.Email,
      },
      verifyEmailCodeForm: {
        Code: '',
        VertifyInfo: '',
      },
      PhonetimeText: '',
      EmailtimeText: '',
      memberForm: {
        UserName: this.$store.state.member.MemberData.UserName,
        RealName: this.$store.state.member.MemberData.RealName,
        Birthday: this.$store.state.member.MemberData.Birthday !== '0000-00-00' ? this.$store.state.member.MemberData.Birthday : '',
        Phone: this.$store.state.member.MemberData.Phone,
        Email: this.$store.state.member.MemberData.Email,
      },
    };
  },
  computed: {
    getMemberDataUpdateErrorMessage() {
      return this.$store.state.member.MemberDataUpdateErrorMessage;
    },
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberBankList',
    ]),
  },
  watch: {
    MemberData(val) {
      console.log(val.RealName);
      this.showName = val.RealName;
      this.memberForm.UserName = val.UserName;
      this.memberForm.RealName = val.RealName;
      this.memberForm.Birthday = (val.Birthday !== '0000-00-00') ? val.Birthday : '';
      this.showBirth = (val.Birthday !== '0000-00-00') ? val.Birthday : '';
      this.memberForm.Phone = val.Phone;
      this.memberForm.Email = val.Email;
      this.verifyPhoneForm.UserId = val.UserId;
      this.verifyEmailForm.UserId = val.UserId;
    },
  },
  methods: {
    phoneStep(num) {
      this.verifyPhoneForm.Phone = this.MemberData.Phone;
      this.verifyPhoneSteps = num;
    },
    emailStep(num) {
      this.verifyEmailForm.Email = this.MemberData.Email;
      this.verifyEmailSteps = num;
    },
    onSelectedInit(key) {
      this.memberForm.Province = key;
      this.CityList = this.CityListJson[key];
    },
    onSelectedProvince(key) {
      this.memberForm.City = '';
      this.memberForm.State = '';
      this.memberForm.Province = key;
      this.CityList = this.CityListJson[key];
    },
    onSelectedCity(key) {
      this.memberForm.City = key;
      this.StateList = this.StateListJson[key];
    },
    onSelectedState(key) {
      this.memberForm.State = key;
    },
    submit() {
      const vm = this;
      this.$validator.validate().then((result) => {
        if (!result) {
          console.log(this.errors);
          // this.showeErorMsg = true
        } else {
          this.submitLoading = true;
          delete this.memberForm.Password;
          this.$store.dispatch('member/MemberDataUpdate', this.memberForm)
            .then((res) => {
              vm.submitLoading = false;
              if (res.data.status === 1) {
                vm.$message({ message: '已成功修改会员资料', type: 'success', center: true });
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              } else {
                vm.$message({ message: res.data.error_message, type: 'error', center: true });
              }
            });
        }
      });
    },
    submitPhone() {
      const vm = this;
      this.submitPhoneDisbled = true;
      this.PhonetimeText = 90;
      this.intervalid = setInterval(() => {
        vm.PhonetimeText -= 1;
        if (vm.PhonetimeText === 0) {
          vm.PhonetimeText = '已过期';
          vm.verifyPhoneSteps = 2;
          clearInterval(vm.intervalid);
          this.submitPhoneDisbled = false;
        }
        // console.log(vm.PhonetimeText);
      }, 1000);
      this.$validator.validate().then((result) => {
        if (!result) {
          console.log(this.errors);
        } else {
          console.log(this.verifyPhoneForm);
          axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/SendVertifyCode`, this.verifyPhoneForm)
            .then((res) => {
              console.log(res);
              if (res.data.status === 1) {
                vm.verifyPhoneCodeForm.VertifyInfo = vm.verifyPhoneForm.Phone;
                vm.verifyPhoneSteps = 3;
              } else {
                vm.$message({
                  message: res.data.error_message,
                  type: 'error',
                  duration: 2000,
                  center: true,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    submitPhoneCode() {
      const vm = this;
      this.$validator.validate().then((result) => {
        if (!result) {
          console.log(this.errors);
          // this.showeErorMsg = true
        } else {
          axios.post(`${process.env.VUE_APP_APIHOST}/Member/PhoneVertify`, this.verifyPhoneCodeForm)
            .then((res) => {
              if (res.data.status === 1) {
                vm.memberForm.Phone = vm.verifyPhoneCodeForm.VertifyInfo;
                vm.verifyPhoneSteps = 1;
                vm.MemberData.PhoneStatus = 1;
                window.location.reload()
              } else {
                vm.$message({
                  message: res.data.error_message,
                  type: 'error',
                  duration: 1500,
                  center: true,
                  onClose() {
                    window.location.reload();
                  },
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    submitEmail() {
      const vm = this;
      this.submitEmailDisbled = true;
      this.EmailtimeText = 90;
      this.intervalidemail = setInterval(() => {
        vm.EmailtimeText -= 1;
        if (vm.EmailtimeText === 0) {
          vm.EmailtimeText = '已过期';
          vm.verifyEmailSteps = 2;
          clearInterval(vm.intervalidemail);
          this.submitEmailDisbled = false;
        }
        // console.log(vm.EmailtimeText);
      }, 1000);
      this.$validator.validate().then((result) => {
        if (!result) {
          console.log(this.errors);
        } else {
          console.log(this.verifyEmailForm);
          axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/SendVertifyCode`, this.verifyEmailForm)
            .then((res) => {
              console.log(res);
              if (res.data.status === 1) {
                vm.verifyEmailCodeForm.VertifyInfo = vm.verifyEmailForm.Email;
                vm.verifyEmailSteps = 3;
              } else {
                vm.$message({
                  message: res.data.error_message,
                  type: 'error',
                  duration: 2000,
                  center: true,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    submitEmailCode() {
      const vm = this;
      this.$validator.validate().then((result) => {
        if (!result) {
          console.log(this.errors);
          // this.showeErorMsg = true
        } else {
          axios.post(`${process.env.VUE_APP_APIHOST}/Member/EmailVertify`, this.verifyEmailCodeForm)
            .then((res) => {
              if (res.data.status === 1) {
                vm.memberForm.Email = vm.verifyEmailCodeForm.VertifyInfo;
                vm.verifyEmailSteps = 1;
                vm.MemberData.EmailStatus = 1;
                window.location.reload()
              } else {
                vm.$message({
                  message: res.data.error_message,
                  type: 'error',
                  duration: 1500,
                  center: true,
                  onClose() {
                    window.location.reload();
                  },
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    cancel() {
      router.push('/member/overview');
    },
    setAdrees() {
      this.onSelectedInit(this.$store.state.member.MemberData.Province);
      this.onSelectedCity(this.$store.state.member.MemberData.City);
      this.onSelectedState(this.$store.state.member.MemberData.State);
    },
  },
  mounted() {
    this.verifyPhoneForm.UserId = this.UserId;
    this.verifyEmailForm.UserId = this.UserId;
    this.showName = this.MemberData.RealName;
    this.showBirth = (this.MemberData.Birthday !== '0000-00-00') ? this.MemberData.Birthday : '';
    const vm = this; 
    axios.get('/static/getCountry.json', '')
      .then((res) => {
        vm.ProvinceList = res.data.province;
        vm.CityListJson = res.data.city;
        vm.StateListJson = res.data.area;
        vm.setAdrees();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss">
	.placeho:before{
			content: attr(placeholder);//強制給placeholder屬性
			color:#aaa;// 這種灰色應該是最適合的
	}
  .success_icon {
    .el-icon-success{
      float: right;
      padding: 35px 0vw;
      color: #3ccc3c;
      font-size: 21px;
    };
  }
	.cancel, .timeout {
		float: right;
		padding: 30px 0vw !important;
		color:red !important;
	}
	.diasbleInput{
		background-color: #ebebe4
	}
	.diasbleInput input{
		background-color: #ebebe4
	}
	.memberinput {
		.el-date-editor.el-input {
			width: 100%;
		}
	}
	.birthday {
		.el-input__inner {
			padding: 0;
			font-size: 30px !important;
			line-height: 30px !important;
			border: none !important;
		}
		.el-input__icon {
			width: 38px;
			font-size: 0 !important;
		}
	}
	.provincialcapital {
		.el-input__inner {
			padding: 0;
			font-size: 30px !important;
			line-height: 30px !important;
			border: none !important;
		}
		.el-select__caret {
			width: 38px;
			background: transparent url("/static/img/select_arrow.png") 100% 50% no-repeat content-box;
			background-size: contain;
			font-size: 0 !important;
			transform: rotate(0deg) !important;
		}
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.birthday {
			.el-input__inner {
				height: 5.33vw;
				font-size: 4vw !important;
				line-height: 4vw !important;
			}
			.el-input__icon {
				width: 5vw;
				line-height: 5.33vw;
			}
		}
		.provincialcapital {
			.el-input__inner {
				height: 5.33vw;
				font-size: 4vw !important;
				line-height: 4vw !important;
			}
			.el-select__caret {
				width: 5vw;
			}
			.el-input__icon {
				line-height: 5.33vw;
			}
		}
		.success_icon {
      .el-icon-success{
        padding: 4.67vw 0vw;
        font-size: 2.8vw;
      };
    }
		.cancel, .timeout {
			padding: 4vw 0vw !important;
		}
	}
</style>
