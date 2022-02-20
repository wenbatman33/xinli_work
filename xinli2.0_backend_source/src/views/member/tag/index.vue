<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <a-row :gutter="[20, 20]">
      <a-col :xl="10" :lg="24">
        <a-card title="标签群组">
          <template #extra>
            <a-button type="primary" @click="handleGroup()">新增群组</a-button>
            <a-button type="default" v-if="target_group.hasOwnProperty('id')" @click="handleGroup(true, target_group)">修改群组</a-button>
          </template>
          <Description 
            v-if="target_group.hasOwnProperty('id')"
            :column="1"
            :data="{updatedAt: target_group.updatedAt, createdAt: target_group.createdAt}"
            :schema="[{field: 'updatedAt', label: '最后修改时间', contentMinWidth: 200}, {field: 'createdAt', label: '建立时间', contentMinWidth: 200}]"
          />
          <template v-for="group in navItems" :key="group.id">
            <CardGrid class="groupBtn" @click="findTag(group)">
              <span class="flex flex-col items-center">
                <Tag :color="group.color">{{group.color}}</Tag>
                <span class="text-md mt-2">{{ group.name }}</span>
              </span>
            </CardGrid>
          </template>
        </a-card>
      </a-col>
      <a-col :xl="14" :lg="24">
        <a-card :title="target_group.name" v-if="target_group.hasOwnProperty('id')">
          <template #extra>
            <a-button type="primary" @click="handleTag()">新增标签</a-button>
          </template>
          <template v-for="tag in target_group.children" :key="`${tag.tagGroupID}-${tag.id}`">
            <Tag @click="handleTag(true, tag)">{{tag.name}}</Tag>
          </template>
        </a-card>
      </a-col>
    </a-row>
    <GroupModal @register="GroupModal" @success="handleSuccess" />
    <TagModal @register="TagModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Row, Col, Tag } from 'ant-design-vue';
  import { Description } from '/@/components/Description/index';
  import { getTagGroup, getTag } from '/@/api/tag/tag';
  import { useModal } from '/@/components/Modal';
  import GroupModal from './GroupModal.vue';
  import TagModal from './TagModal.vue';

  const CardGrid = Card.Grid;
  
  export default defineComponent({
    components: { PageWrapper, ACard: Card, ARow: Row, ACol: Col, CardGrid, Tag, Description, GroupModal, TagModal },
    setup() {
      const [GroupModal, { openModal: openGroupModal }] = useModal();
      const [TagModal, { openModal: openTagModal }] = useModal();
      const selectedGroup = reactive({});
      const navItems = ref([]);
      const target_group = ref({});
      
      onMounted( async ()=>{
        navItems.value = await getAllTagGroup();
      });

      async function getAllTagGroup(){
        const groups:any = (await getTagGroup()).list;
        const tags = (await getTag()).list;
        groups.forEach(group => {
          group.children = tags.filter(tag=>tag.tagGroupID === group.id)
        });
        return groups;
      }

      function findTag(group){
        target_group.value = group;
      }

      function handleGroup(edit = false, record) {
        if (edit === false){
          openGroupModal(true, {
            isUpdate: false,
          });
        }else{
          openGroupModal(true, {
            isUpdate: true,
            record
          });
        }
      }
      function handleTag(edit = false, record) {
        const allTag = navItems.value;
        if (edit === false){
          openTagModal(true, {
            isUpdate: false,
            allTag,
            target_group,
          });
        }else{
          openTagModal(true, {
            isUpdate: true,
            allTag,
            record
          });
        }
      }

      async function handleSuccess({targetID}){
        navItems.value = await getAllTagGroup();
        if (targetID){
          target_group.value = navItems.value.find(item=>item.id === targetID) || {};
        }else{
          target_group.value = navItems.value.find(item=>item.id === target_group.value.id) || {};
        }
      }

      
      return { 
        selectedGroup,
        GroupModal,
        TagModal,
        handleGroup,
        handleTag,
        navItems,
        findTag,
        target_group,
        handleSuccess,
      };
    }
  });
</script>
<style lang="scss" scoped>
::v-deep(.groupBtn){
  cursor: pointer;
}
::v-deep(.ant-card-extra){
  button{
    margin-left: 10px;
  }
}
::v-deep(.ant-tag){
  padding: 5px 14px;
  cursor: pointer;
}
.tagtag{
  width: 100px;
  height: 20px;
}
</style>