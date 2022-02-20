<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.main.py-3
    .col.px-md-5.py-md-2.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-3.py-3
          span
            img(src='/static/ev190118/title_3.png')
        .col-12.eventcaption.pt-md-3.pt-3
          p.text-white {{UserName}} 您好
        .col-12.eventcontent.py-md-3.py-3
          .row.no-gutters.d-flex.justify-content-center
            .col-md-6.col-10.evTable
              el-form(:model="InviteForm",:rules="InviteFormRules" )
                el-form-item.col-12(prop="InviteUserName")
                  el-input(type='text'
                            v-model.trim='InviteForm.InviteUserName'
                            placeholder='请输入好友帐号')
                el-form-item.col-12(prop="InvitePhone")
                  el-input(type='text'
                            v-model.trim='InviteForm.InvitePhone'
                            placeholder='请输入好友手机号码')
            .col-12.pb-md-5.py-3
              button.btn.px-4.py-2(type="button" @click.prevent="sendCode") 确认申请
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
import tgHeader from '@/components/tgHeader/tgHeader.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgMenu from '@/views/ev190118/components/tgMenu.vue';
import tgBanner from '@/views/ev190118/components/tgBanner.vue';
import router from '../router/router';


export default {
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
    tgLogin,
    
  },
  data() {
    return {
      loginDialogShow: false,
      InviteForm: {
        InviteUserName: '',
        InvitePhone: '',
      },
      InviteFormRules: {
        InviteUserName: [{ required: true, message: '请输入好友帐号 ', trigger: 'blur' }],
        InvitePhone: [{ required: true, message: '请输入好友手机号码 ', trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    loginDialogHide() {
      this.loginDialogShow = false;
    },
    sendCode() {
      const paylod = {};
      const vm = this;
      paylod.InviteUserName = this.InviteForm.InviteUserName;
      paylod.InvitePhone = this.InviteForm.InvitePhone;
      paylod.UserId = this.UserId;
      console.log(paylod);
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/Event020_InviteFriend`, paylod)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.$message({ message: '申请成功！', type: 'success' });
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系统出错，请联络客服人员协助');
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.main{
  background: url('/static/ev190118/bgImg.png')50% bottom no-repeat, url('/static/ev190118/bg.jpg') 50% 0 repeat;
  background-size: 100% auto;
}
.eventpage{
  background: rgba(0,0,0,0.14);
}
.eventcontent {
  color: rgba(255,255,255,1);
  font-size: 18px;
  img {
    width: 100%;
    max-width: fit-content;
    height: auto;
  }
  .datalist {
    width: 100%;
    color: rgba(255,255,255,1);
    font-size: 14px;
    border: 1px solid rgba(255,255,255,1);
    ul, li {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ul {
      border-bottom: 1px solid rgba(255,255,255,1);
      &:first-child {
        background: rgba(217,217,217,0.1);
      }
      &:last-child {
        border-bottom: none;
      }
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-right: 1px solid rgba(255,255,255,1);
      &:last-child {
        border-right: none;
      }
    }
  }
}
.evTable{
  table, th, td{
    border: 1px solid #fff;
  }
  th{
    padding: 6px;
    background: rgba(180,155,200,.24);
  }
  td{
    padding: 6px;
    vertical-align: middle;
    // background: rgba(180,155,200,.24);
  }
}
.highlight{
  font-size: 36px;
  font-weight: bold;
  color: #FAE62D;
  font-family: Arial Black;
}
.purpleLight{
  color: #B49BC8;
}
.btn{
  color: #fff;
  outline: 0;
  border: none;
  border-radius: 20px;
  background-image: linear-gradient(-270deg, #7811CB 0%, #25CCFC 100%);
}
</style>
