<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        {{ t(`routes.system.authLogs.actions[${record.action}]`) }}
      </template>
      <template #subData="{ record }">
        <p class="editColumn" v-for="r in record.sub_data">
          {{ t(`routes.system.authLogs.column[${r.column}]`) }}：{{ r.oldValue }} → {{ r.newValue }}
        </p>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAuthLogs } from '/@/api/authSystem/system';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { columns, searchFormSchema } from './authlog.data';

  export default defineComponent({
    name: 'AuthLog',
    components: { PageWrapper, BasicTable },
    setup() {
      const { t } = useI18n();
      const [registerTable, {}] = useTable({
        title: '',
        api: getAuthLogs,
        columns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
        },
        beforeFetch(searchForm) {
          let search = {};
          for(let key in searchForm){
            if (searchForm[key] !== undefined && searchForm[key] !== '') {
              Object.assign(search, {[key]: searchForm[key]});
            }
          }
          return search;
        },
        showTableSetting: false,
        bordered: true,
      });

      return {
        registerTable,
        t,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .editColumn {
    margin-bottom: 0;
    line-height: 2rem;
  }
</style>