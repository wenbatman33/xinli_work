<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #type="{ record }">
        <div v-html="typeText(record.type)"></div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed} from 'vue';
  import { useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Tag, DatePicker, TimePicker } from 'ant-design-vue';
  import type { FormProps } from '/@/components/Form';

  import { columns, searchFormSchema, inOutType } from './data';
  import moment from 'moment';
  import { WalletLog } from '/@/api/member/member';

  export default defineComponent({
    name: 'WalletLog',
    components: { BasicTable, Tag, PageWrapper, TableAction, DatePicker, TimePicker},
    setup() {
      const route = useRoute();
      // 此处可以得到用户ID
      const memberID = Number(route.params?.id);

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          labelWidth: 80,
          schemas: searchFormSchema(),
          autoSubmitOnEnter: true,
        };
      });

      const [registerTable, { getForm }] = useTable({
        title: '',
        rowKey: 'id',
        api: WalletLog,
        columns,
        formConfig: formConfig,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        beforeFetch(searchForm) {
          let search = {memberID};
          for(let key in searchForm){
            if (searchForm[key] !== undefined && searchForm[key] !== 0) {
              Object.assign(search, {[key]: searchForm[key]});
            }
          }
          return search;
        },
      });


      const setFieldValue = (field: string, value: any) => {
        if (!value) {
          getForm().setFieldsValue({ [`${field}`]: undefined });
          return;
        }
        let str = moment(new Date(value)).format('YYYY-MM-DD HH:mm');

        getForm().setFieldsValue({ [`${field}`]: str });
      };
      
      const convertMoment = (str?: string) => {
        if (str === '') {
          return undefined;
        }
        if (str === undefined) {
          return undefined;
        }
        try {
          return moment(str);
        } catch (e) {
          return undefined;
        }
      };

      function typeText(type){
        const target = inOutType.find(item => item.id === type) || {color: '#000', name: 'undefined type'};
        return `<span style="color:${target.color}">${target.name}</span>`;
      }

      return { 
        registerTable,
        setFieldValue,
        convertMoment,
        typeText
      };
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-table-column-title) {
    white-space: pre-wrap !important;
  }
</style>