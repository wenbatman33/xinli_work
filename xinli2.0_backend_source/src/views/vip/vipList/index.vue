<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <template #headerContent>
      <BasicForm @register="registerForm" :layout="'inline'" @submit="handleAddGift" />
    </template>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { DatePicker, Card } from 'ant-design-vue';
  import { GetPrizeList, AddBirthGift } from '/@/api/vip/vip';
  import type { FormProps } from '/@/components/Form';

  import { columns, searchFormSchema, birthdayPrizeSchema } from './data';

  export default defineComponent({
    components: { BasicTable, BasicForm, PageWrapper, TableAction, DatePicker, Card},
    setup() {
      const [registerForm, { resetFields, setFieldsValue, validate, setProps }] = useForm({
        labelWidth: 90,
        schemas: birthdayPrizeSchema,
        showResetButton: false,
        submitButtonOptions: {
          text: '新增生日礼',
        }
      });

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          actionColOptions: {
            span: 6,
          },
        };
      });

      const [registerTable, { reload }] = useTable({
        title: '',
        rowKey: 'id',
        api: GetPrizeList,
        columns,
        formConfig: formConfig,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        beforeFetch(searchForm) {
          let search = {};
          for(let key in searchForm){
            if (searchForm[key] !== undefined){
              Object.assign(search, {[key]: searchForm[key]});
            }
          }
          return search;
        },
      });

      async function handleAddGift(){
        const values = await validate();
        // TODO custom api
        await AddBirthGift(values);
        resetFields();
        reload();
      }


      return {
        registerForm,
        registerTable,
        handleAddGift,
      };
    },
  });
</script>
