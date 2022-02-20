<template lang="pug">
  .personal(v-if="ActivePersonal === 'Realname'")
    .personal__header 真实姓名
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .personal__main
      .personal__main__remind 银行卡户名需与真实姓名一致，才能成功进行取款。
      el-input.personal__main__input(v-model="personalRealname.realname" placeholder="请填写真实姓名")
    button.personal__button(@click="changePersonal(personalRealname)" :disabled="!validateRealmame" :class="{'disabled': !validateRealmame}") 提交
  .personal(v-else-if="ActivePersonal === 'Birthday'")
    .personal__header 出生日期
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .personal__main
      .personal__main__remind 我们会为您提供生日礼品，请填写正确的出生日期，如需再次修改需联系客服。
      el-date-picker.w-100(v-model="personalBirthday.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd", :default-value='Date.now()-(18*365*24*60*60*1000)', :picker-options="pickerOptions")
    button.personal__button(@click="changePersonal(personalBirthday)" :disabled="!validateBirthday" :class="{'disabled': !validateBirthday}") 提交
  .personal(v-else-if="ActivePersonal === 'Gender'")
    .personal__header 性别
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .personal__main
      .personal__main__remind 尽可能完善您的个人资料，帮助我们更近一步认识。
      .d-flex.justify-content-between
        button.personal__main__button.col-5(v-model="personalGender.gender" @click="personalGender.gender = 1" :class="{'active': personalGender.gender === 1}") 男
        button.personal__main__button.col-5(v-model="personalGender.gender" @click="personalGender.gender = 2" :class="{'active': personalGender.gender === 2}") 女
    button.personal__button(@click="changePersonal(personalGender)" :disabled="!validateGender" :class="{'disabled': !validateGender}") 提交
  .personal(v-else-if="ActivePersonal === 'Address'")
    .personal__header 收货地址
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    el-form.personal__main
      .personal__main__remind 我们为用户提供实体赠品，请填写正确能收件的地址。
      el-form-item
        el-select.w-100.personal__main__input(v-model="personalAddress.province" placeholder='省份' @change="getCity($event)")
          el-option(v-for="(item, index) in provinceName" :label="item.memberProvinceName" :value="item.memberProvinceId" :key="item.memberProvinceId")
      el-form-item
        el-select.w-100.personal__main__input(v-model="personalAddress.city" placeholder='城市' @change="getState($event)")
          el-option(v-for="(item, index) in cityName" :label="item.memberCityName" :value="item.memberCityId" :key="item.memberCityId")
      el-form-item
        el-select.w-100.personal__main__input(v-model="personalAddress.state" placeholder='区县')
          el-option(v-for="(item, index) in stateName" :label="item.memberStateName" :value="item.memberStateId" :key="item.memberStateId")
      el-form-item
        el-input.personal__main__input(v-model="personalAddress.address" placeholder="详细地址")
    button.personal__button(@click="changePersonal(personalAddress)" :disabled="!validateAddress" :class="{'disabled': !validateAddress}") 提交
</template>

<script>
import { mapState} from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      personalRealname: {
        realname: '',
      },
      personalBirthday: {
        birthday: '',
      },
      personalGender: {
        gender: 1,
      },
      personalAddress: {
        province: '',
        city: '',
        state: '',
        address: '',
      },
      provinceName: [],
      cityName: [],
      stateName: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > (Date.now() - ((18 * 365 * 24 * 60 * 60 * 1000) + (4 * 24 * 60 * 60 * 1000)));
        },
      },
    };
  },
  methods: {
    changePersonal(payload) {
      this.$store.dispatch('member/API_MemberModifyPersonal', payload).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$store.dispatch('member/API_MemberPersonal');
          this.$store.dispatch('index/setCardOpen', false);
          this.$message({ message: '修改成功', type: 'success'});
        }
      }).catch((err) => {
        this.$message({ message: err.response.data.message, type: 'error'});
        console.log(err.response);
      });
    },
    getProvince() {
      this.$store.dispatch('member/API_IndexAddress').then((res) => {
        this.provinceName = res.data.data;
      });
    },
    getCity(provinceId) {
      this.personalAddress.city = '';
      this.personalAddress.state = '';
      this.personalAddress.address = '';
      this.$store.dispatch('member/API_IndexAddress', {
        params: {
          province_id: provinceId,
        },
      }).then((res) => {
        this.cityName = res.data.data;
      });
    },
    getState(cityId) {
      this.personalAddress.state = '';
      this.$store.dispatch('member/API_IndexAddress', {
        params: {
          province_id: this.personalAddress.province,
          city_id: cityId,
        },
      }).then((res) => {
        this.stateName = res.data.data;
      });
    },
  },
  computed: {
    ...mapState('member', [
      'IndexPersonal',
      'ActivePersonal',
    ]),
    validateRealmame() {
      if (this.personalRealname.realname === '') {
        return false;
      } else {
        return true;
      }
    },
    validateBirthday() {
      if (this.personalBirthday.birthday === '') {
        return false;
      } else {
        return true;
      }
    },
    validateGender() {
      if (this.personalGender.gender === '') {
        return false;
      } else {
        return true;
      }
    },
    validateAddress() {
      if (this.personalAddress.province === '' || this.personalAddress.city === '' || this.personalAddress.state === '') {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    // 取資料
    this.getProvince();
    this.$store.dispatch('member/API_IndexAddress', {
      params: {
        province_id: this.$store.state.member.IndexPersonal.memberProvince,
      },
    }).then((res) => {
      this.cityName = res.data.data;
    });
    this.$store.dispatch('member/API_IndexAddress', {
      params: {
        province_id: this.personalAddress.province,
        city_id: this.$store.state.member.IndexPersonal.memberCity,
      },
    }).then((res) => {
      this.stateName = res.data.data;
    });
  },
  created() {
    // 最初的資料
    if (this.$store.state.member.IndexPersonal.memberRealname !== null) {
      this.personalRealname.realname = this.$store.state.member.IndexPersonal.memberRealname;
    }
    if (this.$store.state.member.IndexPersonal.memberBirthday !== null) {
      this.personalBirthday.birthday = this.$store.state.member.IndexPersonal.memberBirthday;
    }
    if (this.$store.state.member.IndexPersonal.memberGender.value !== 0) {
      this.personalGender.gender = this.$store.state.member.IndexPersonal.memberGender.value;
    }
    if (this.$store.state.member.IndexPersonal.memberProvince !== null) {
      this.personalAddress.province = this.$store.state.member.IndexPersonal.memberProvince;
    }
    if (this.$store.state.member.IndexPersonal.memberCity !== null) {
      this.personalAddress.city = this.$store.state.member.IndexPersonal.memberCity;
    }
    if (this.$store.state.member.IndexPersonal.memberState !== null) {
      this.personalAddress.state = this.$store.state.member.IndexPersonal.memberState;
    }
    if (this.$store.state.member.IndexPersonal.memberAddress !== null) {
      this.personalAddress.address = this.$store.state.member.IndexPersonal.memberAddress;
    }
  }
}
</script>

<style lang="scss" scoped>
.personal {

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      position: absolute;
      right: $width-24;
      color: $origin;
    }
  }

  &__main {
    padding: $width-28 $width-24 0;

    &__remind {
      font-size: $text-16;
      color: $origin_darkest;
      margin-bottom: $height-40;
    }

    &__input {
      color: $origin;
      border: 1px solid $origin;
      border-radius: 4px;
      font-size: $text-16;

      /deep/ input {
        border: none;
        font-size: $text-16;
      }

      ::placeholder {
        color: $origin;
      }
    }

    &__button {
      border: 1px solid #dfe4ed;
      padding: $height-12 0;
      text-align: center;
      width: 100%;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0px 0px 4px rgba(0,0,0,0.08);
    }
  }

  &__button {
    width: 100%;
    display: block;
    text-align: center;
    padding: $width-20 0;
    background-color: $theme;
    color: white;
    position: absolute;
    bottom: 0;
    font-size: $text-20;
    text-decoration: none;
    border: none;
  }
}

.active {
  color: $theme;
  border: 1px solid $theme;
  box-shadow: 0px 0px 4px rgba(142,115,218,0.08);
}

.disabled {
  background-color: $origin_dark;
}
</style>
