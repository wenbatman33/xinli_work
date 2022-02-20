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
            img(src='/static/ev190118/title_4.png')
        .col-12.eventcontent.py-md-3.py-3
          .row.no-gutters.d-flex.justify-content-center
              .col-md-10.col-12.evTable
                table.w-100
                  tr
                    th 邀请账号
                    th 彩金
                    th 申请状况
                  tr(v-for='item in tableData')
                    td {{item.InviteUserName}}
                    td {{item.Bonus}}
                    td {{item.StatusName}}
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
      tableData: '',
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
    getList() {
      const paylod = {};
      const vm = this;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/Event020_GetFriendList`, paylod)
        .then((res) => {
          vm.tableData = res.data.data.data_list;
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
  },
  mounted() {
    if (this.MemberLogined === true) {
      this.getList();
    }
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
img {
  width: 100%;
  max-width: fit-content;
};
.purpleLight{
  color: #B49BC8;
}

</style>
