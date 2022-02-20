<template>
  <PageWrapper>
    <Card>
      <Row class="row" :gutter="[20, 20]">
        <Switcher 
          :checkedValue="register" 
          :swichName="'注册'" 
          :description="'控制全站是否开放注册'" 
          @update="setSwitch($event, 'register')" 
        />
        <Switcher 
          :checkedValue="login" 
          :swichName="'登入'" 
          :description="'控制全站是否开放会员登入'" 
          @update="setSwitch($event, 'login')" 
        />
      </Row>
      <Row class="row" :gutter="[20, 20]">
        <Switcher 
          :checkedValue="loginGame" 
          :swichName="'进入游戏'" 
          :description="'控制全站是否开放会员进入游戏'" 
          @update="setSwitch($event, 'loginGame')" 
        />
      </Row>
      <Row class="row" :gutter="[20, 20]">
        <Switcher 
          :checkedValue="deposit" 
          :swichName="'存款'" 
          :description="'控制全站是否开放会员进行存款'" 
          @update="setSwitch($event, 'deposit')" 
        />
        <Switcher 
          :checkedValue="depositNeedMobileVerify" 
          :swichName="'存款需完成手机验证'" 
          :description="'控制全站会员进行存款时是否需完成手机验证'" 
          @update="setSwitch($event, 'depositNeedMobileVerify')" 
        />
      </Row>
      <Row class="row" :gutter="[20, 20]">
        <Switcher 
          :checkedValue="withdrawal" 
          :swichName="'提款'" 
          :description="'控制全站是否开放会员进行提款'" 
          @update="setSwitch($event, 'withdrawal')" 
        />
        <Switcher 
          :checkedValue="withdrawalRiskVerify" 
          :swichName="'所有提单需风控审核'" 
          :description="'控制全站会员进行提款时皆须经过风控审核'" 
          @update="setSwitch($event, 'withdrawalRiskVerify')" 
        />
      </Row>
      <Row class="row" :gutter="[20, 20]">
        <Switcher 
          :checkedValue="pcMaintain" 
          :swichName="'平台维护：WebPC'" 
          :description="'控制WebPC平台是否进行维护'" 
          @update="setSwitch($event, 'pcMaintain')" 
        />
        <Col :xl="12" :lg="24">
          <Textarea v-model:value="pcMaintainMessage" placeholder="请输入WebPC维护讯息" :rows="2" />
        </Col>
      </Row>
      <Row class="row" :gutter="[20, 20]">
        <Switcher 
          :checkedValue="h5Maintain" 
          :swichName="'平台维护：H5 &amp; PWA'" 
          :description="'控制H5 &amp; PWA平台是否进行维护'" 
          @update="setSwitch($event, 'h5Maintain')" 
        />
        <Col :xl="12" :lg="24">
          <Textarea v-model:value="h5MaintainMessage" placeholder="请输入H5 &amp; PWA维护讯息" :rows="2" />
        </Col>
      </Row>
    </Card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive ,toRefs, onMounted, toRaw } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Switch, Row, Col, Input } from 'ant-design-vue';
  import Switcher from '/@/views/systemManage/components/Switcher.vue';
  import { getSystemConfig, updateSystemConfig } from '/@/api/systemManage/systemManage';
  import { useMessage } from '/@/hooks/web/useMessage';
  
  export default defineComponent({
    components: { PageWrapper, Card, Switch, Row, Col, Textarea: Input.TextArea, Switcher },
    setup() {
      const { createMessage } = useMessage();
      const state = reactive({
        register: true,
        login: true,
        loginGame: true,
        deposit: true,
        depositNeedMobileVerify: false,
        withdrawal: true,
        withdrawalRiskVerify: false,
        pcMaintain: false,
        h5Maintain: false,
        pcMaintainMessage: '',
        h5MaintainMessage: '',
      });

      onMounted(() => {
        getSystemConfig().then(res => {
          const data = res;
          state.register = data.register;
          state.login = data.login;
          state.loginGame = data.loginGame;
          state.deposit = data.deposit;
          state.depositNeedMobileVerify = data.depositNeedMobileVerify;
          state.withdrawal = data.withdrawal;
          state.withdrawalRiskVerify = data.withdrawalRiskVerify;
          state.pcMaintain = data.pcMaintain;
          state.h5Maintain = data.h5Maintain;
          state.pcMaintainMessage = data.pcMaintainMessage;
          state.h5MaintainMessage = data.h5MaintainMessage;
        });
      });

      async function setSwitch(value, target) {
        state[target] = value;
        await updateSystemConfig(toRaw(state));
        createMessage.success('更新成功');
      }
      return { 
        ...toRefs(state),
        setSwitch
      };
    }
  });
</script>
<style lang="scss" scoped>
.label{
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0;
  margin-right: 1.5rem;
}
.description{
  color: #999;
  margin-top: 5px;
  margin-bottom: 0;
}
::v-deep(.row){
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  &:last-child{
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}
</style>