<template>
  <PageWrapper>
    <template #extra>
      <a-button type="primary" @click="openOtherCardModal(true, {})"> 他人銀行卡 </a-button>
      <a-button type="primary" @click="openBankcardModal(true, {})"> 银行卡列表 </a-button>
      <a-button type="primary" @click="openUSDTModal(true, {})"> USDT列表 </a-button>
      <a-button type="primary" @click="handleRecord(userDetail.account)"> 操作记录 </a-button>
      <a-button type="primary" @click="handleEdit(userDetail)"> 编辑帐号 </a-button>
      <a-button type="primary" @click="handlePassword(userDetail)"> 修改密码 </a-button>
    </template>
    <template #headerContent>
      <Description 
        :collapseOptions="{ canExpand: true}"
        :column="4"
        :data="userDetail"
        :schema="memberDetailSchema"
       />
    </template>
    <a-row :gutter="[20, 20]">
      <a-col :xl="8" :lg="24">
        <CollapseContainer>
          <template #title>
            <span @click="go('/tag')">标签系统</span>
          </template>
          <template #action>
            <a-button type="default" @click="handleTag(tags)"> 编辑标签 </a-button>
          </template>
          <Card :border="false" size="small">
            <Tag
              v-for="tag in tags" 
              :key="tag.id" 
              :color="tagColor.find(group=>group.id === tag.tagGroupID).color" 
            >
              {{tag.name}}
            </Tag>
          </Card>
        </CollapseContainer>

        <CollapseContainer
          :title= "'会员备注'"
        >
          <template #action>
            <a-button type="default" @click="handleComments()"> 新增备注 </a-button>
          </template>
          <Collapse 
            v-model:activeKey="activeKey" 
            accordion
            >
            <template #expandIcon><div class="emptyIcon"></div></template>
            <CollapsePanel v-for="comment in comments" :key="String(comment.id)" :header="`${comment.category} - ${comment.title}`">
              <p>{{ comment.content }}</p>
              <template #extra>
                By：{{ comment.updator || comment.creator }}
              </template>
            </CollapsePanel>
          </Collapse>
        </CollapseContainer>
      </a-col>
      <a-col :xl="16" :lg="24">

        <CollapseContainer
          title= "钱包资料"
        >
          <template #action>
            <a-button type="primary" @click="openURL()"> 钱包操作记录 </a-button>
          </template>
          <Description 
            :column="3"
            :data="walletData"
            :schema="walletTotalSchema"
          />
        </CollapseContainer>

        <BetSection />
        <DepositSection />
        <WithdrawSection />
        <PromotionSection />
      </a-col>
    </a-row>
    <EditModal ref="editModalRef" @register="editModalregister" @success="handleSuccess" />
    <PasswordModal ref="editPasswordModalRef" @register="editPasswordModalregister" />
    <AddTagModal @register="addTagModalregister" @success="handleTagSuccess" />
    <CommentsModal @register="commentsModalregister" @success="closeCommentModal" :defaultFullscreen="true" :canFullscreen="false" :showOkBtn="false" cancelText="关闭" />
    <BankcardModal ref="bankcardModalRef" @register="bankcardModalregister" :showOkBtn="false" cancelText="关闭" />
    <USDTModal ref="usdtModalRef" @register="USDTModalregister" :showOkBtn="false" cancelText="关闭" @cancel="initUserDetail" />
    <OtherCardModal ref="othercardModalRef" @register="otherCardModalregister" :showOkBtn="false" cancelText="关闭" />
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref, toRefs, reactive, toRaw, watch, h} from 'vue';
  import { useRoute } from 'vue-router';
  import { BasicTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Description } from '/@/components/Description/index';
  import { ColorEnum } from '/@/enums/colorEnum';
  import { useGo } from '/@/hooks/web/usePage';
  import { GetMemberDetail, GetMemberTag, WalletDetail, GetComments } from '/@/api/member/member';
  import { memberDetailSchema, walletTotalSchema } from './detail.data';
  import { useModal } from '/@/components/Modal';
  import EditModal from './EditModal.vue';
  import PasswordModal from './PasswordModal.vue';
  import AddTagModal from '/@/views/common/tag/AddTagModal.vue';
  import CommentsModal from './CommentsModal.vue';
  import BetSection from './components/BetSection.vue';
  import DepositSection from './components/DepositSection.vue';
  import PromotionSection from './components/PromotionSection.vue';
  import WithdrawSection from './components/WithdrawSection.vue';
  import BankcardModal from './BankcardModal.vue';
  import USDTModal from './USDTModal.vue';
  import OtherCardModal from './OtherCardModal.vue';
  import { Table, Card, Row, Col, Tag, DatePicker, Collapse } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { getTagGroup } from '/@/api/tag/tag';
  import { cloneDeep } from 'lodash-es';
  import { Moment } from 'moment';
  import moment from 'moment';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useOTPStore } from '/@/store/modules/otp';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      Description,
      EditModal,
      PasswordModal,
      AddTagModal,
      ARow: Row,
      ACol: Col,
      Card,
      CollapseContainer,
      Tag,
      DatePicker,
      Collapse,
      CollapsePanel: Collapse.Panel,
      CommentsModal,
      Table,
      PromotionSection,
      BankcardModal,
      USDTModal,
      WithdrawSection,
      DepositSection,
      BetSection,
      OtherCardModal,
    },
    setup() {
      const route = useRoute();
      const goUse = useGo();
      const OTPStore = useOTPStore();
      // 此处可以得到用户ID
      const userId = Number(route.params?.id);
      const activeKey = ref([]);
      const { createMessage } = useMessage();
      const usdtModalRef = ref(null);
      const bankcardModalRef = ref(null);
      const othercardModalRef = ref(null);
      const editModalRef = ref(null);
      const editPasswordModalRef = ref(null);
      const state = reactive({
        userDetail: {},
        tagColor: [],
        tags: [],
        walletData: {},
        activeKey,
        comments: [],
      });

      const [editModalregister, { openModal: openEditModal }] = useModal();
      const [editPasswordModalregister, { openModal: openPasswordModal }] = useModal();
      const [addTagModalregister, { openModal: openTagModal }] = useModal();
      const [commentsModalregister, { openModal: openCommentsModal }] = useModal();
      const [bankcardModalregister, { openModal: openBankcardModal }] = useModal();
      const [USDTModalregister, { openModal: openUSDTModal }] = useModal();
      const [otherCardModalregister, { openModal: openOtherCardModal }] = useModal();

      initUserDetail();
      initTag();
      initWallet();
      initComments();

      async function initUserDetail(){
        state.userDetail = await GetMemberDetail(userId);
      }
      async function initTag(){
        state.tagColor = (await getTagGroup()).list;
        state.tags = (await GetMemberTag(userId)).list;
      }
      async function initWallet(){
        state.walletData = await WalletDetail(userId);
      }
      async function initComments(){
        state.comments = (await GetComments(userId)).list;
      }

      function handleEdit(record) {
        openEditModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handlePassword(record) {
        openPasswordModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleTag(tags){
        openTagModal(true, {
          tag: cloneDeep(toRaw(tags)),
          userId
        });
      }

      function handleComments(){
        openCommentsModal(true, {
          userId,
          comments: state.comments,
        });
      }
      function handleSuccess() {
        initUserDetail();
      }
      async function handleTagSuccess() {
        state.tags = (await GetMemberTag(userId)).list;
      }

      function closeCommentModal({values}){
        state.comments = values;
      }

      function openURL(){
        window.open('/memberDetail/walletLog/' + userId);
      }

      function handleRecord(memberAccount){
        window.open('/memberDetail/log/' + memberAccount);
      }
      
      
      // 页面左侧点击返回链接时的操作
      function go(route) {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        goUse(route);
      }

      watch(() => OTPStore.OTP_callback, (val) => {
        // console.log(val);
        if (val !== false){
          if (val.includes('/backend/member/usdt')){
            usdtModalRef.value?.otpSuccess();
          }
          if (val.includes('/backend/member/bankcard')){
            bankcardModalRef.value?.otpSuccess();
          }
          if (val.includes('/backend/member/bankcard/other')){
            othercardModalRef.value?.otpSuccess();
          }
          if (val.includes('/backend/member/detail')){
            editModalRef.value?.otpSuccess();
          }
          if (val.includes('/backend/member/password')){
            editPasswordModalRef.value?.otpSuccess();
          }
          OTPStore.openOTP(false);
          OTPStore.callback(false, {});
        }
      });

      return { 
        go, 
        initUserDetail,
        memberDetailSchema,
        ...toRefs(state), 
        walletTotalSchema,
        editModalregister,
        openEditModal,
        editPasswordModalregister,
        openPasswordModal,
        addTagModalregister,
        openTagModal,
        bankcardModalregister,
        USDTModalregister,
        handleEdit,
        handleSuccess,
        handlePassword,
        handleTag,
        handleTagSuccess,
        openCommentsModal,
        openBankcardModal,
        openUSDTModal,
        handleComments,
        commentsModalregister,
        closeCommentModal,
        openURL,
        handleRecord,
        openOtherCardModal,
        otherCardModalregister,
        usdtModalRef,
        bankcardModalRef,
        othercardModalRef,
        editModalRef,
        editPasswordModalRef,
      };
    },
  });
</script>

<style lang="scss" scoped>
::v-deep(.vben-collapse-container){
  .vben-collapse-container__header{
    height: auto;
    button, .dateFilter{
      margin-right: 20px;
    }
    .vben-basic-arrow{
      margin-right: 10px;
    }
  }
}
.emptyIcon{
  display: none;
}
::v-deep(.ant-collapse){
  .ant-collapse-header{
    padding: 6px 10px;
  }
}
::v-deep(.vben-basic-title){
  font-size: 14px;
}
::v-deep(.ant-table-row){
  &:hover{
    .ant-table-row-cell-break-word{
      background: unset !important;
    }
  }
}
</style>
