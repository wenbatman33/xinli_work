<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <div class="tagPanel">
      <Select
        v-model:value="selectGroup"
        style="width: 150px"
        :options="TagGroups.map(group => ({ value: group.id, label: group.name, children: group.children, color: group.color }))"
        @change="handleGroupChange"
      >
        <template #option="{ value, label }">
          {{ label }}
        </template>
      </Select>
      <Select
        v-model:value="selectTag"
        style="width: 120px"
        :options="Tags.map(tag => ({ value: tag.id, label: tag.name, color: tag.color }))"
        @change="handleTagChange"
      >
        <template #option="{ value, label }">
          {{ label }}
        </template>
      </Select>
      <Card class="card" size="small">
        <Tag
          v-for="tag in SelectedTags" 
          :key="tag.value" 
          :color="tag.color" 
          :closable="true" 
          @close="cancelTag(tag)"
        >
          {{tag.label}}
        </Tag>
      </Card>
    </div>
    <BasicTable 
      rowKey="id" 
      :columns="loginColumns" 
      :showIndexColumn="false" 
      :bordered="true"
      :maxHeight="300"
      @register="registerTable" 
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, toRefs, onBeforeMount, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { loginColumns } from './member.data';
  import { Tag, Card, Select } from 'ant-design-vue';
  import { getTag, getTagGroup } from '/@/api/tag/tag';
  import { remove } from 'lodash-es';
import { SetTagBatch } from '/@/api/member/member';

  export default defineComponent({
    name: 'MoneyModal',
    components: { Tag, BasicTable, BasicModal, Card, Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const TagGroups = ref([]);
      const SelectedTags:any = ref([]);

      onBeforeMount(async () => {
        TagGroups.value = await getTagData();
      });
      const state = reactive({
        selectGroup: '请选择标签群组',
        selectTag: '请选择标签',
        TagGroups,
        Tags: [],
        SelectedTags,
      });
      let records:any[] = [];

      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        records = unref(data.record);
        setTableData(records);
        redoModalHeight();
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
        }
      });

      const [registerTable, { setTableData }] = useTable({});

      const getTitle = computed(() => (!unref(isUpdate) ? '标签设定' : '标签设定'));

      async function getTagData(){
        const groups:any = (await getTagGroup()).list;
        const tags:any = (await getTag()).list;
        groups.forEach(group => {
          group.children = tags.filter(tag=>tag.tagGroupID === group.id)
        });
        return groups;
      }

      function handleGroupChange(val, option){
        const options = unref(option);
        options.children.forEach(tag => {
          tag.color = options.color;
        });
        state.Tags = options.children;
        state.selectTag = '请选择标签';
      }

      function handleTagChange(val, option){
        state.SelectedTags.push(option);
      }

      function cancelTag(target){
        remove(state.SelectedTags, (tag:any)=>{
          return tag.value === target.value;
        });
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const params = {
            memberIDs: unref(records).map(li=>li.id),
            tagIDs: [...new Set(unref(state.SelectedTags).map(tag=>tag.value))],
          }
          await SetTagBatch(params);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { 
        registerModal, 
        registerTable, 
        loginColumns, 
        getTitle, 
        handleSubmit, 
        records, 
        ...toRefs(state), 
        handleGroupChange, 
        handleTagChange, 
        cancelTag,
        };
    },
  });
</script>

<style lang="scss" scoped>
.tagPanel{
  padding: 0 6px;
  .card{
    background: #ddd;
  }
}
</style>