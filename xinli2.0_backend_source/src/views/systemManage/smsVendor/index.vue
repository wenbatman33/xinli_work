<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getSmsVendor } from '/@/api/systemManage/systemManage';

  import { BasicColumn } from '/@/components/Table';
  import { h } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { setSmsVendor } from '/@/api/systemManage/systemManage';
  import { useMessage } from '/@/hooks/web/useMessage';


  export default defineComponent({
    name: 'DeptManagement',
    components: { BasicTable, PageWrapper },
    setup() {
    const columns: BasicColumn[] = [
      {
        title: '當前使用',
        dataIndex: 'status',
        width: 80,
        customRender: ({ record }) => {
          if (!Reflect.has(record, 'pendingStatus')) {
            record.pendingStatus = false;
          }
          return h(Switch, {
            checked: record.status === 1,
            checkedChildren: '启用',
            unCheckedChildren: '停用',
            loading: record.pendingStatus,
            disabled: record.status === 1,
            onChange(checked: boolean) {
              record.pendingStatus = true;
              const newStatus = checked ? 1 : 2;
              const { createMessage } = useMessage();
              setSmsVendor(record.id)
                .then(() => {
                  record.status = newStatus;
                  createMessage.success(`已成功启用短信服务商：${record.displayName}`);
                  if (record.quota <= 100) createMessage.warning(`馀额过低！请留意剩馀额度！`);
                  reload();
                })
                .finally(() => {
                  record.pendingStatus = false;
                });
            },
          });
        },
      },
      {
        title: '厂商名称',
        dataIndex: 'displayName',
        width: 100,
      },
      {
        title: '发送成功率',
        dataIndex: 'successRate',
        width: 80,
      },
      {
        title: '剩馀额度',
        dataIndex: 'quota',
        width: 100,
      },
      {
        title: '厂商后台网址',
        dataIndex: 'backendUrl',
        width: 300,
        customRender: ({ record }) => {
          return h('a', {
            href: record.backendUrl,
            target: '_blank',
          }, record.backendUrl);
        }
      },
    ];

      const [registerTable, { reload }] = useTable({
        title: '',
        api: getSmsVendor,
        columns,
        pagination: false,
        striped: true,
        bordered: true,
      });

      return {
        registerTable,
      };
    },
  });
</script>
