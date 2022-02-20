<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #form-date="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.verifyDateStart])"
            @update:value="setFieldValue(schema.componentProps.verifyDateStart, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.verifyDateStart])"
            @update:value="setFieldValue(schema.componentProps.verifyDateStart, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.verifyDateEnd])"
            @update:value="setFieldValue(schema.componentProps.verifyDateEnd, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.verifyDateEnd])"
            @update:value="setFieldValue(schema.componentProps.verifyDateEnd, $event)"
          />
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Tag, DatePicker, TimePicker } from 'ant-design-vue';
  import { GetAdjustmentApply } from '/@/api/risk/risk';
  import type { FormProps } from '/@/components/Form';

  import { columns, searchFormSchema } from './data';
  import moment from 'moment';

  export default defineComponent({
    name: 'adjustmentList',
    components: { BasicTable, Tag, PageWrapper, TableAction, DatePicker, TimePicker},
    setup() {

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          labelWidth: 80,
          schemas: searchFormSchema(),
          autoSubmitOnEnter: true,
          actionColOptions: {
            span: 6,
          },
        };
      });

      const [registerTable, { getForm }] = useTable({
        title: '',
        rowKey: 'id',
        api: GetAdjustmentApply,
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

      return {
        registerTable,
        setFieldValue,
        convertMoment
      };
    },
  });
</script>
