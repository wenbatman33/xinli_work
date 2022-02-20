<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="检视帐号" @ok="handleSubmit">
    <Card :title="roleName">
      <template v-for="tag in roleUsers" :key="tag.adminID">
        <Tag>{{tag.account}}</Tag>
      </template>
    </Card>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getRoleUsers } from '/@/api/authSystem/system';
  import { Card, Tag } from 'ant-design-vue';

  export default defineComponent({
    name: 'RoleAccountModal',
    components: { BasicModal, Card, Tag },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const roleName = ref('');
      const roleUsers = ref([]);

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false, showCancelBtn: false });
        roleName.value = data.record.roleName;
        const users = await getRoleUsers(data.record.roleID);
        roleUsers.value = users.list;
      });

      async function handleSubmit() {
        try {
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, handleSubmit, roleName, roleUsers };
    },
  });
</script>
