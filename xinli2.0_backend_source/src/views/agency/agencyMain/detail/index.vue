<template>
  <PageWrapper>
    <CollapseContainer :title="'基本資料'">
      <CollapsePanel>
        <a-row :gutter="24" style="margin-bottom: 12px">
          <a-col :span="6">
            <a-row><h2 class="font-bold">ID：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.id }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.id)"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">代理帳號：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.account }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.account)"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">會員帳號：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.memberAccount }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.memberAccount)"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">姓名：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <a-row :gutter="6" v-if="formBasic.editableName">
                  <a-col :span="20">
                    <a-input v-model:value="formBasic.name" />
                  </a-col>
                  <a-col :span="4">
                    <a-button round type="primary" @click="formBasicSubmit('name', formBasic.name)"
                      >完成</a-button
                    >
                  </a-col>
                </a-row>
                <div v-if="!formBasic.editableName">{{ formBasic.name }}</div>
              </a-col>
              <a-col v-if="!formBasic.editableName" :span="2">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.name)"
                />
              </a-col>
              <a-col v-if="!formBasic.editableName" :span="2">
                <Icon
                  icon="ant-design:edit-outlined"
                  color="blue"
                  @click="editable('editableName')"
                />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-bottom: 12px">
          <a-col :span="6">
            <a-row> <h2 class="font-bold">上層代理ID：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.parentAgencyID }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.parentAgencyID)"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">上層代理帳號：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.parentAgencyAccount }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.parentAgencyAccount)"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">二級代理數：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.childAgencyCount }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:plus-circle-outlined"
                  color="blue"
                  @click="handleAddSubAgencyActive(formBasic.id)"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">直屬會員數：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.memberCount }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.memberCount)"
                />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-bottom: 12px">
          <a-col :span="6">
            <a-row><h2 class="font-bold">手機號：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <a-row :gutter="6" v-if="formBasic.editablePhone">
                  <a-col :span="20">
                    <a-input v-model:value="formBasic.phone" />
                  </a-col>
                  <a-col :span="4">
                    <a-button
                      round
                      type="primary"
                      @click="formBasicSubmit('phone', formBasic.phone)"
                      >完成</a-button
                    >
                  </a-col>
                </a-row>
                <div v-if="!formBasic.editablePhone">{{ formBasic.phone }}</div>
              </a-col>
              <a-col v-if="!formBasic.editablePhone" :span="2">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.phone)"
                />
              </a-col>
              <a-col v-if="!formBasic.editablePhone" :span="2">
                <Icon
                  icon="ant-design:edit-outlined"
                  color="blue"
                  @click="editable('editablePhone')"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">郵箱：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <a-row :gutter="6" v-if="formBasic.editableEmail">
                  <a-col :span="20">
                    <a-input v-model:value="formBasic.email" />
                  </a-col>
                  <a-col :span="4">
                    <a-button
                      round
                      type="primary"
                      @click="formBasicSubmit('email', formBasic.email)"
                      >完成</a-button
                    >
                  </a-col>
                </a-row>
                <div v-if="!formBasic.editableEmail">{{ formBasic.email }}</div>
              </a-col>
              <a-col v-if="!formBasic.editableEmail" :span="2">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.email)"
                />
              </a-col>
              <a-col v-if="!formBasic.editableEmail" :span="2">
                <Icon
                  icon="ant-design:edit-outlined"
                  color="blue"
                  @click="editable('editableEmail')"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">微信號：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <a-row :gutter="6" v-if="formBasic.editableWechat">
                  <a-col :span="20">
                    <a-input v-model:value="formBasic.wechat" />
                  </a-col>
                  <a-col :span="4">
                    <a-button
                      round
                      type="primary"
                      @click="formBasicSubmit('wechat', formBasic.wechat)"
                      >完成</a-button
                    >
                  </a-col>
                </a-row>
                <div v-if="!formBasic.editableWechat">{{ formBasic.wechat }}</div>
              </a-col>
              <a-col v-if="!formBasic.editableWechat" :span="2">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.wechat)"
                />
              </a-col>
              <a-col v-if="!formBasic.editableWechat" :span="2">
                <Icon
                  icon="ant-design:edit-outlined"
                  color="blue"
                  @click="editable('editableWechat')"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">QQ號：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <a-row :gutter="6" v-if="formBasic.editableQQ">
                  <a-col :span="20">
                    <a-input v-model:value="formBasic.qq" />
                  </a-col>
                  <a-col :span="4">
                    <a-button round type="primary" @click="formBasicSubmit('qq', formBasic.qq)"
                      >完成</a-button
                    >
                  </a-col>
                </a-row>
                <div v-if="!formBasic.editableQQ">{{ formBasic.qq }}</div>
              </a-col>
              <a-col v-if="!formBasic.editableQQ" :span="2">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.qq)"
                />
              </a-col>
              <a-col v-if="!formBasic.editableQQ" :span="2">
                <Icon
                  icon="ant-design:edit-outlined"
                  color="blue"
                  @click="editable('editableQQ')"
                />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-bottom: 12px">
          <a-col :span="6">
            <a-row><h2 class="font-bold">成為代理時間：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.reivewAgencyTime }}</div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">最後登入時間：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.lastLoginTime }}</div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">申請代理IP：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.applyAgencyIp }}</div>
              </a-col>
              <a-col :span="4">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.applyAgencyIp)"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row><h2 class="font-bold">最後登入IP：</h2></a-row>
            <a-row :gutter="6">
              <a-col :span="20">
                <div>{{ formBasic.lastLoginIp }}</div>
              </a-col>
              <a-col :span="2">
                <Icon
                  icon="ant-design:copy-outlined"
                  color="blue"
                  @click="handleCopy(formBasic.lastLoginIp)"
                />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-bottom: 12px">
          <a-col :span="6">
            <a-row
              ><h2 class="font-bold">推廣網址：</h2>
              <Icon
                icon="ant-design:plus-circle-outlined"
                color="blue"
                @click="handlePromotionLinkModelAdd"
            /></a-row>
            <a-row :gutter="6">
              <a-list size="small" bordered :data-source="formBasic.promotionLinks">
                <template #renderItem="{ item }">
                  <a-list-item>
                    {{ item.promotionLink }}
                    <template #actions>
                      <Icon
                        icon="ant-design:copy-outlined"
                        color="blue"
                        @click="handleCopy(item.promotionLink)"
                      />
                      <Icon
                        icon="ant-design:edit-outlined"
                        color="blue"
                        @click="handlePromotionLinkModelEdit(item.id, item.promotionLink)"
                      />
                    </template>
                  </a-list-item>
                </template>
              </a-list>
            </a-row>
          </a-col>
        </a-row>
      </CollapsePanel>
    </CollapseContainer>
    <CollapseContainer :title="'帳號操作'">
      <BasicForm @register="registerAccountForm" :model="accountModel" />
      <a-row type="flex" justify="end">
        <a-button round type="primary" @click="formAccountSubmit"> 送出修改 </a-button>
      </a-row>
    </CollapseContainer>
    <CollapseContainer :title="'數據相關'" />
    <CollapseContainer :title="'近期錢包操作'" />
    <addSubAgencyModel @register="addSubAgencyModel" @reload="reloadEmit" />
    <addPromotionLinkModel @register="addPromotionLinkModel" @reload="reloadEmit" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { useRoute } from 'vue-router';

  import { PageWrapper } from '/@/components/Page';

  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './detail.data';
  import addSubAgencyModel from './addSubAgencyModel.vue';
  import addPromotionLinkModel from './addPromotionLinkModel.vue';
  import { useModal } from '/@/components/Modal';
  import { Table, Button, Row, Col, Input, message, Collapse, List } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { CollapseContainer } from '/@/components/Container/index';
  import {
    getAgencyDetail,
    getAgencyGroup,
    putAgencyDetail,
    putAgencyStatus,
    putAgencyGroup,
  } from '/@/api/agency/agency';
  export default defineComponent({
    name: 'MemberDetail',
    components: {
      PageWrapper,
      CollapseContainer,
      BasicForm,
      ARow: Row,
      ACol: Col,
      AInput: Input,
      AButton: Button,
      AList: List,
      AListItem: List.Item,
      Icon,
      addSubAgencyModel,
      addPromotionLinkModel,
    },
    setup() {
      const route = useRoute();
      // 此处可以得到用户ID
      const userId = Number(route.params?.id);
      const [addSubAgencyModel, { openModal: openSubAgencyModel }] = useModal();
      const [addPromotionLinkModel, { openModal: openPromotionLinkModel }] = useModal();
      const handleAddSubAgencyActive = (id: string) =>
        openSubAgencyModel(true, {
          id,
        });

      const handlePromotionLinkModelAdd = () =>
        openPromotionLinkModel(true, {
          id: userId,
          mode: 'Add',
        });
      const handlePromotionLinkModelEdit = (id, promotionLink) =>
        openPromotionLinkModel(true, {
          id,
          promotionLink,
          mode: 'Edit',
        });
      const reloadEmit = () => {
        initUserDetail();
      };
      const formBasic = reactive({
        id: '',
        account: '',
        name: '',
        memberAccount: '',
        parentAgencyID: '',
        parentAgencyAccount: '',
        childAgencyCount: '',
        memberCount: '',
        phone: '',
        email: '',
        wechat: '',
        qq: '',
        reivewAgencyTime: '',
        lastLoginTime: '',
        applyAgencyIp: '',
        lastLoginIp: '',
        editableName: false,
        editablePhone: false,
        editableEmail: false,
        editableWechat: false,
        editableQQ: false,
        promotionLinks: [],
      });
      const formAccountRef = ref({});

      const [registerAccountForm, { validate }] = useForm({
        labelWidth: 120,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      initUserDetail();

      async function initUserDetail() {
        // state.userDetail = await GetMemberDetail(userId);
        const response = await getAgencyDetail({ id: userId });
        const agencyGroupRes = await getAgencyGroup({ id: userId });
        console.warn('get data', response);

        formBasic.id = response.id;
        formBasic.name = response.name;
        formBasic.account = response.account;
        formBasic.memberAccount = response.memberAccount;
        formBasic.parentAgencyID = response.parentAgencyID;
        formBasic.parentAgencyAccount = response.parentAgencyAccount;
        formBasic.childAgencyCount = response.childAgencyCount;
        formBasic.memberCount = response.memberCount;
        formBasic.phone = response.phone;
        formBasic.email = response.email;
        formBasic.wechat = response.wechat;
        formBasic.qq = response.qq;
        formBasic.reivewAgencyTime = response.reivewAgencyTime;
        formBasic.lastLoginTime = response.lastLoginTime;
        formBasic.applyAgencyIp = response.applyAgencyIp;
        formBasic.lastLoginIp = response.lastLoginIp;
        formBasic.promotionLinks = response.promotionLinks;
        formAccountRef.value = {
          agencyID: userId,
          status: response.status,
          depositLimit: response.depositLimit,
          withdrawLimit: response.withdrawLimit,
          giveOffer: agencyGroupRes.giveOffer,
          rankGroupID: agencyGroupRes.groupID,
        };
      }

      const editable = (str: string) => {
        switch (str) {
          case 'editableName':
            formBasic.editableName = true;
            break;
          case 'editablePhone':
            formBasic.editablePhone = true;
            break;
          case 'editableEmail':
            formBasic.editableEmail = true;
            break;
          case 'editableWechat':
            formBasic.editableWechat = true;
            break;
          case 'editableQQ':
            formBasic.editableQQ = true;
            break;
          default:
        }
      };
      const handleCopy = (str: string) => {
        const inputElement = document.createElement('input');
        inputElement.value = str || '';
        inputElement.style.position = 'fixed';
        inputElement.style.top = '-9999';
        inputElement.style.left = '-9999';
        document.body.appendChild(inputElement);
        inputElement.focus();
        inputElement.select();
        try {
          const success = document.execCommand('copy');
          success
            ? message.success(inputElement.value + ' 复制成功')
            : message.error(inputElement.value + ' 复制失败');
        } catch (err) {
          message.error(inputElement.value + ' 复制失败');
        } finally {
          document.body.removeChild(inputElement);
        }
      };
      const formBasicSubmit = async (col: string, str: string) => {
        try {
          const param = {
            id: userId,
            [col]: str,
          };
          const result = await putAgencyDetail(param);
          console.log('result', result);
          result.id ? ResSuccess(col) : ResError(col);
        } catch (e) {
          console.log(e);
        } finally {
          // setModalProps({ confirmLoading: false });
        }
      };
      const formAccountSubmit = () => {
        rankGroupSubmit();
        changeStatusSubmit();
      };
      const rankGroupSubmit = async () => {
        try {
          const payload = await validate();
          const param = {
            agencyID: userId,
            giveOffer: payload.giveOffer,
            rankGroupID: payload.rankGroupID,
          };
          const result = await putAgencyGroup(param);
          console.log('result', result);
          result.agencyID ? message.success(`编辑傭金成功`) : message.error(`编辑傭金失败`);
        } catch (e) {
          console.log(e);
        } finally {
          // setModalProps({ confirmLoading: false });
        }
      };
      const changeStatusSubmit = async () => {
        try {
          const payload = await validate();
          const param = {
            id: userId,
            status: payload.status,
            depositLimit: payload.depositLimit,
            withdrawLimit: payload.withdrawLimit,
          };
          const result = await putAgencyStatus(param);
          console.log('result', result);
          result.id ? message.success(`编辑狀態成功`) : message.error(`编辑狀態失败`);
        } catch (e) {
          console.log(e);
        } finally {
          // setModalProps({ confirmLoading: false });
        }
      };
      const ResError = (str: string) => {
        message.error(`编辑失败`);
        setStateBack(str);
      };
      const ResSuccess = (str: string) => {
        message.success(`编辑成功`);
        setStateBack(str);
      };
      const setStateBack = (str: string) => {
        switch (str) {
          case 'name':
            formBasic.editableName = false;
            break;
          case 'phone':
            formBasic.editablePhone = false;
            break;
          case 'email':
            formBasic.editableEmail = false;
            break;
          case 'wechat':
            formBasic.editableWechat = false;
            break;
          case 'qq':
            formBasic.editableQQ = false;
            break;
          default:
        }
      };
      return {
        registerAccountForm,
        handleCopy,
        editable,
        formBasicSubmit,
        formAccountSubmit,
        addSubAgencyModel,
        addPromotionLinkModel,
        handlePromotionLinkModelAdd,
        handlePromotionLinkModelEdit,
        handleAddSubAgencyActive,
        reloadEmit,
        formBasic,
        accountModel: formAccountRef,
      };
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.vben-collapse-container) {
    .vben-collapse-container__header {
      height: auto;

      button,
      .dateFilter {
        margin-right: 20px;
      }

      .vben-basic-arrow {
        margin-right: 10px;
      }
    }
  }

  .emptyIcon {
    display: none;
  }

  ::v-deep(.ant-collapse) {
    .ant-collapse-header {
      padding: 6px 10px;
    }
  }

  ::v-deep(.vben-basic-title) {
    font-size: 14px;
  }

  ::v-deep(.ant-table-row) {
    &:hover {
      .ant-table-row-cell-break-word {
        background: unset !important;
      }
    }
  }
</style>
