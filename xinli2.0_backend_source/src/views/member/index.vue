<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable 
      @register="registerTable" 
      ref="tableRef"
      rowKey="id"
      :rowSelection="{ type: 'checkbox' }"
    >
      <template #form-tagSearch>
        <Dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            选择标签
          </a>
          <template #overlay>
            <Menu>
              <SubMenu v-for="group in tagGroup" :title="group.name" :key="group.id">
                <MenuItem v-for="tag in group.children" :key="tag.id" @click="addTagFilter(tag, group.color)">{{tag.name}}</MenuItem>
              </SubMenu>
            </Menu>
          </template>
        </Dropdown>
        <Tag v-for="tag in tagFilters" closable :key="tag.id" @close="removeTag(tag)" :color="tag.color">{{tag.name}}</Tag>
      </template>
      <template #toolbar>
        <a-button @click="handleLogin">登入设定</a-button>
        <a-button @click="handleMoney">存提设定</a-button>
        <a-button @click="handleGame">游戏选择</a-button>
        <a-button @click="handleTag">标签设定</a-button>
        <a-button @click="handlePayGroup">编辑金流群组</a-button>
      </template>

      <template #account="{ record }">
        <a href="#" @click.prevent="handleView(record)">{{ record.account }}</a>
      </template>
      <template #online="{ record }">
        <span :style="{color: record.current_status ? ColorEnum.SUCCESS : ColorEnum.ERROR}">
          {{ record.current_status ? '线上':'离线' }}
        </span>
      </template>
      <template #status="{ record }">
        <span :style="{color:statusMapping[record.status].color}">
          {{ statusMapping[record.status].text }}
        </span>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '用户详情',
              onClick: handleView.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <loginModal @register="statusModal" @success="handleSuccess" />
    <moneyModal @register="moneyModal" @success="handleSuccess" />
    <tagModal @register="tagModal" @success="handleSuccess" />
    <PayGroupModal @register="PayGroupModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive, onMounted, toRaw } from 'vue';

  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import { GetMembers } from '/@/api/member/member';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import loginModal from './LoginModal.vue';
  import moneyModal from './MoneyModal.vue';
  import tagModal from './TagModal.vue';
  import PayGroupModal from './PayGroupModal.vue';
  import { Tag, Dropdown, Menu, Select } from 'ant-design-vue';
  const MenuItem = Menu.Item;
  const SubMenu = Menu.SubMenu;
  import { ColorEnum } from '/@/enums/colorEnum';
  import { getTag, getTagGroup } from '/@/api/tag/tag';
  import { remove } from 'lodash-es';

  import { columns, searchFormSchema } from './member.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AccountManagement',
    components: { Tag, Dropdown, Select, Menu, SubMenu, MenuItem, BasicTable, PageWrapper, loginModal, TableAction, moneyModal, tagModal, PayGroupModal },
    setup() {
      const go = useGo();
      const { createMessage } = useMessage();
      const atLeast1:string = '请至少选择一名玩家';
      const [statusModal, { openModal: openStatusModal }] = useModal();
      const [moneyModal, { openModal: openMoneyModal }] = useModal();
      const [tagModal, { openModal: openTagModal }] = useModal();
      const [PayGroupModal, { openModal: openPayGroupModal }] = useModal();
      const tagGroup = ref([]);
      const tagFilters = ref([]);
      onMounted(async ()=>{
        tagGroup.value = await getTagData()
      });
      const statusMapping = [
        {text: '', color: '#000'},
        {text: '启用', color: ColorEnum.SUCCESS},
        {text: '停用', color: ColorEnum.ERROR},
        {text: '锁定', color: ColorEnum.WARNING},
      ]
      const [registerTable, { reload }] = useTable({
        title: '',
        api: GetMembers,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          resetFunc: beforeReset
        },
        useSearchForm: true,
        showIndexColumn: false,
        showTableSetting: true,
        bordered: true,
        beforeFetch(searchForm) {
          let search = {};
          for(let key in searchForm){
            if (searchForm[key] !== undefined && searchForm[key] !== '') {
              Object.assign(search, {[key]: searchForm[key]});
            }
          }
          const tag = toRaw(unref(tagFilters.value)).map(item=>item.id).toString();
          if (tag.length > 0){
            Object.assign(search, {tag});
          }
          return search;
        },
        handleSearchInfoFn(searchInfo) {
          const startDate = new Date(searchInfo.created_at_start);
          const endDate = new Date(searchInfo.created_at_end);
          if (startDate > endDate){
            createMessage.error('结束时间不可早于开始时间');
          }
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const tableRef = ref<Nullable<TableActionType>>(null);

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      async function beforeReset(){
        tagFilters.value = [];
      }

      async function getTagData(){
        const groups:any = (await getTagGroup()).list;
        const tags:any = (await getTag()).list;
        groups.forEach(group => {
          group.children = tags.filter(tag=>tag.tagGroupID === group.id)
        });
        return groups;
      }

      function handleLogin(){
        const record = getTableAction().getSelectRows();
        if (record.length > 0){
          openStatusModal(true, {
            record,
            isUpdate: true,
          });
        }else{
          createMessage.error(atLeast1);
        }
      }
      function handleMoney(){
        const record = getTableAction().getSelectRows();
        if (record.length > 0){
          openMoneyModal(true, {
            record,
            isUpdate: true,
          });
        }else{
          createMessage.error(atLeast1);
        }
      }
      function handleGame(){
        console.log('handleGame');
      }
      function handleTag(){
        const record = getTableAction().getSelectRows();
        if (record.length > 0){
          openTagModal(true, {
            record,
            isUpdate: true,
          });
        }else{
          createMessage.error(atLeast1);
        }
      }
      
      function handlePayGroup(){
        const record = getTableAction().getSelectRows();
        if (record.length > 0){
          openPayGroupModal(true, {
            record
          });
        }else{
          createMessage.error(atLeast1);
        }
      }

      function addTagFilter(tag, color){
        tag.color = color;
        tagFilters.value.push(tag);
      }

      function removeTag(target){
        remove(tagFilters.value, (tag:any)=>{
          return tag.id === target.id;
        });
      }

      function handleSuccess() {
        reload();
      }

      function handleView(record: Recordable) {
        // go('/member/detail/' + record.id);
        window.open('/memberDetail/detail/' + record.id);
      }

      return {
        tableRef,
        statusMapping,
        registerTable,
        statusModal,
        moneyModal,
        tagModal,
        PayGroupModal,
        handleLogin,
        handleMoney,
        handleGame,
        handleTag,
        handlePayGroup,
        handleSuccess,
        handleView,
        tagGroup,
        addTagFilter,
        tagFilters,
        removeTag,
        ColorEnum
      };
    },
  });
</script>

<style lang="scss" scoped>
::v-deep(.tagsFilter){
  width: calc(100% - 60px);
}
</style>