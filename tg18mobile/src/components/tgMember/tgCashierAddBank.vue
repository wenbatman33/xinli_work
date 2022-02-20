<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi
		.content
			section
				.memberwithdrawal
					.memberwithdrawal_popup
						h1 开户人资料
						ul
							li
								input#username.username(v-validate='"required"' name="AccountName" v-model="addBankForm.AccountName" placeholder="开户名称" type="text" disabled)
						h1 银行卡资料
						ul
							li
								input#backnumber.backnumber(v-validate='"required"' name="AccountNo" data-vv-as="银行卡号" v-model="addBankForm.AccountNo" placeholder="银行卡号" type="number")
							.error(v-show='errors.has("AccountNo")')  {{ errors.first('AccountNo') }}
							li
								select#accountbank.accountbank(v-validate='"required"' name="AccountBank" data-vv-as="开户行" v-model='addBankForm.AccountBank' placeholder='开户行')
									option(value='' label='开户行' disabled) 开户行
									option(v-for='(item, key) in BankList' :key='key' :label='item.BankName' :value='key') {{ item.BankName }}
							.error(v-show='errors.has("AccountBank")')  {{ errors.first('AccountBank') }}
							li
								select#accountprovince.accountprovince(v-validate='"required"' name="Province" data-vv-as="省份" v-model="addBankForm.Province" placeholder='省份' @change='onSelectedProvince')
									option(value='' label='省份' disabled) 省份
									option(v-for='(item, key) in ProvinceList' :key='key' :label='item' :value='key') {{ item }}
							.error(v-show='errors.has("Province")')  {{ errors.first('Province') }}
							li
								select#accountcity.accountprovince(v-validate='"required"' name="City" data-vv-as="城市" v-model="addBankForm.City" placeholder='城市' @change='onSelectedCity')
									option(value='' label='城市' disabled) 城市
									option(v-for='(item, key) in CityList' :key='key' :label='item' :value='key') {{ item }}
							.error(v-show='errors.has("City")')  {{ errors.first('City') }}
							li
								//- select#accountstate.accountprovince(v-validate='"required"' name="State" data-vv-as="区县" v-model="addBankForm.State" placeholder='区县')
								select#accountstate.accountprovince(name="State" data-vv-as="区县" v-model="addBankForm.State" placeholder='区县')
									option(value='' label='区县' disabled) 区县
									option(v-for='(item, key) in StateList' :key='key' :label='item' :value='key') {{ item }}
							.error(v-show='errors.has("State")')  {{ errors.first('State') }}
						form
							button.memberwithdrawal_btn.submitbankcard_btn(@click.prevent="submit" type="button") 提交银行卡
		tgFooter
</template>
<script>
import axios from 'axios';
import router from '@/router/router';
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      StateList: [],
      ProvinceList: [],
      CityList: [],
      BankList: [],
      addBankForm: {
        AccountName: '',
        AccountNo: '',
        AccountBank: '',
        Province: '',
        State: '',
        City: '',
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
    ]),
  },
  components: {
    tgFix,
    tgSmNavi,
    tgFooter,
  },
  methods: {
    onSelectedProvince() {
      if (this.addBankForm.Province) {
        const key = this.addBankForm.Province;
        this.addBankForm.City = '';
        this.addBankForm.State = '';
        this.CityList = this.CityListJson[key];
      }
    },
    onSelectedCity() {
      if (this.addBankForm.City) {
        const key = this.addBankForm.City;
        this.StateList = this.StateListJson[key];
      }
    },
    submit() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.addBank();
        }
      });
    },
    addBank() {
      let paylod = {};
      const vm = this;
      paylod = this.addBankForm;
      if (paylod.State === '') {
        delete (paylod.State);
      }
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberBankManage/Add`, paylod)
        .then((res) => {
          if (res.data.status === 1) {
            router.go(-1);
          } else {
            vm.$message({
              message: res.data.error_message,
              type: 'error',
              duration: 1000,
              center: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },	
  },
  mounted() {
    const vm = this;
    this.addBankForm.AccountName = this.MemberData.RealName;
    console.log(this.addBankForm);
    axios.get('/static/getCountry.json', '')
      .then((res) => {
        vm.ProvinceList = res.data.province;
        vm.CityListJson = res.data.city;
        vm.StateListJson = res.data.area;
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`${process.env.VUE_APP_APIHOST}/Payment/GetUserBankList/`, '')
      .then((res) => {
        vm.BankList = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss" scoped>
</style>
