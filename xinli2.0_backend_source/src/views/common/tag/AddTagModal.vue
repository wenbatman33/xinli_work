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
      <Card class="card" size="small" title="已选标签">
        <Tag
          v-for="tag in SelectedTags" 
          :key="tag.id" 
          :color="tag.color" 
          :closable="true" 
          @close="cancelTag(tag)"
        >
          {{tag.name}}
        </Tag>
      </Card>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, toRefs, onBeforeMount, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Tag, Card, Select } from 'ant-design-vue';
  import { getTag, getTagGroup } from '/@/api/tag/tag';
  import { remove } from 'lodash-es';
  import { SetMemberTag } from '/@/api/member/member';

  export default defineComponent({
    name: 'MoneyModal',
    components: { Tag, BasicModal, Card, Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const TagGroups = ref([]);
      const SelectedTags:any = ref([]);
      let userId, dontSave;

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

      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        console.log(data)
        state.SelectedTags = data.tag ? tranformTag(data.tag) : [];
        userId = data.userId || '';
        dontSave = data.dontSave || false,
        redoModalHeight();
      });

      const getTitle = computed(() => '新增标签');

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
        option.name = option.label;
        option.id = option.value;
        const exist = state.SelectedTags.find(tag => tag.id === option.id);
        if (!exist) {
          state.SelectedTags.push(option);
        }
      }

      function cancelTag(target){
        remove(state.SelectedTags, (tag:any)=>{
          return tag.id === target.id;
        });
      }

      function tranformTag(tags){
        tags.forEach(tag=>{
          tag.color = unref(TagGroups).find(group=>group.id === tag.tagGroupID).color
        })
        return tags;
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const uniqueIDs = [...new Set(unref(state.SelectedTags).map(tag=>tag.id))];
          if (dontSave){
            emit('success', {tags: uniqueIDs});
          }else{
            const params = {
              memberID: userId,
              tagIDs: uniqueIDs,
            }
            await SetMemberTag(params);
            emit('success');
          }
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { 
        registerModal, 
        getTitle, 
        handleSubmit, 
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
    margin-top: 10px;
  }
}
</style>