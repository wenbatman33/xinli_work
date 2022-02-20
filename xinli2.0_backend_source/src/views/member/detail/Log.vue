<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        {{ t(`routes.member.memberDetailLog.actions[${record.action}]`) }}
      </template>
      <template #subData="{ record }">
        <p class="editColumn" v-for="r in record.sub_data">
          {{ t(`routes.member.memberDetailLog.column[${r.column}]`) }}：{{ r.oldValue }} → {{ r.newValue }}
        </p>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { columns, searchFormSchema } from './log.data';
  import { DetailLog } from '/@/api/member/member';

  export default defineComponent({
    name: 'MemberDetailLog',
    components: { PageWrapper, BasicTable },
    setup() {
      const { t } = useI18n();
      const route = useRoute();
      const memberAccount = route.params?.memberAccount;
      let searchForm = searchFormSchema;
      searchForm.forEach((item) => {
        if (item.field === 'memberAccount') {
          item.defaultValue = memberAccount;
        }
      });
      
      const [registerTable, {}] = useTable({
        title: '',
        api: DetailLog,
        columns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 80,
          schemas: searchForm,
        },
        beforeFetch(searchForm) {
          let search = {};
          for(let key in searchForm){
            if (searchForm[key] !== undefined && searchForm[key] !== '') {
              let value = searchForm[key];
              if (key === 'startDate' || key === 'endDate') {
                value = value.split(' ')[0];
              }
              Object.assign(search, {[key]: value});
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