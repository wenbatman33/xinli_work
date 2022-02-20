<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #form-date="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.loginStartTime])"
            @update:value="setFieldValue(schema.componentProps.loginStartTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.loginStartTime])"
            @update:value="setFieldValue(schema.componentProps.loginStartTime, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.loginEndTime])"
            @update:value="setFieldValue(schema.componentProps.loginEndTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.loginEndTime])"
            @update:value="setFieldValue(schema.componentProps.loginEndTime, $event)"
          />
        </div>
      </template>
      <template #form-registerDate="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.registerStartTime])"
            @update:value="setFieldValue(schema.componentProps.registerStartTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.registerStartTime])"
            @update:value="setFieldValue(schema.componentProps.registerStartTime, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.registerEndTime])"
            @update:value="setFieldValue(schema.componentProps.registerEndTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.registerEndTime])"
            @update:value="setFieldValue(schema.componentProps.registerEndTime, $event)"
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
  import { GetLoginLog } from '/@/api/member/member';
  import type { FormProps } from '/@/components/Form';

  import { columns, searchFormSchema } from './data';
  import moment from 'moment';

  export default defineComponent({
    name: 'loginLog',
    components: { BasicTable, Tag, PageWrapper, TableAction, DatePicker, TimePicker},
    setup() {

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
        api: GetLoginLog,
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
