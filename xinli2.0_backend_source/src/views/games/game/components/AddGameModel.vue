<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="新增游戏"
    @visible-change="handleVisibleChange"
    @ok="handleOk"
    width="960px"
    okText="提交"
    :showCancelBtn="false"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm">
        <template #imageRecommand="{ field }">
          <img v-if="srcRecommand" :src="srcRecommand" height="300px" :alt="field" />
        </template>
        <template #imageRecommandFile="{ field }">
          <Upload :fileList="[]" accept="image/*" :beforeUpload="handleBeforeUploadRecommand">
            <Tooltip :title="field" placement="bottom">
              <a-button size="small" preIcon="ant-design:upload-outlined" type="primary" />
            </Tooltip>
          </Upload>
        </template>
        <template #imgH5="{ field }">
          <img v-if="srcH5" :src="srcH5" height="300px" :alt="field" />
        </template>
        <template #imgH5File="{ field }">
          <Upload :fileList="[]" accept="image/*" :beforeUpload="handleBeforeUploadH5">
            <Tooltip :title="field" placement="bottom">
              <a-button size="small" preIcon="ant-design:upload-outlined" type="primary" />
            </Tooltip>
          </Upload>
        </template>
        <template #imgPc="{ field }">
          <img v-if="srcPc" :src="srcPc" height="300px" :alt="field" />
        </template>
        <template #imgPcFile="{ field }">
          <Upload :fileList="[]" accept="image/*" :beforeUpload="handleBeforeUploadPc">
            <Tooltip :title="field" placement="bottom">
              <a-button size="small" preIcon="ant-design:upload-outlined" type="primary" />
            </Tooltip>
          </Upload>
        </template>
        <template #shotH5="{ field }">
          <img v-if="srcScreenShotH5" :src="srcScreenShotH5" height="300px" :alt="field" />
        </template>
        <template #screenShotH5File="{ field }">
          <Upload :fileList="[]" accept="image/*" :beforeUpload="handleBeforeUploadShotH5">
            <Tooltip :title="field" placement="bottom">
              <a-button size="small" preIcon="ant-design:upload-outlined" type="primary" />
            </Tooltip>
          </Upload>
        </template>
        <template #shotPc="{ field }">
          <img v-if="srcScreenShotPc" :src="srcScreenShotPc" height="300px" :alt="field" />
        </template>
        <template #screenShotPcFile="{ field }">
          <Upload :fileList="[]" accept="image/*" :beforeUpload="handleBeforeUploadShotPc">
            <Tooltip :title="field" placement="bottom">
              <a-button size="small" preIcon="ant-design:upload-outlined" type="primary" />
            </Tooltip>
          </Upload>
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue';
  import { Upload, Tooltip } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import headerImg from '/@/assets/images/header.jpg';
  import { fileUpload, getGameGroup } from '/@/api/game/gamegroup';
  import { getGameGroupOption, createGame, getGameListType } from '/@/api/game/gamelist';
  import { FormSchema } from '/@/components/Form/index';
  const recommandSortOptions = [{label: '不推荐', value: 0, key: 0}];
  for(let i = 1; i <= 9; i++) {
    recommandSortOptions.push({
      label: `顺序${i}`,
      key: i,
      value: i,
    });
  }
  const AddmodelFormSchemas: FormSchema[] = [
    {
      field: 'gameGroupID',
      component: 'ApiSelect',
      label: '游戏厂商',
      colProps: {
        span: 8,
      },
      required: true,
      componentProps: ({ formModel, formActionType }) => {
        return {
          api: getGameGroupOption,
          resultField: 'list',
          // use name as label
          labelField: 'displayName',
          // use id as value
          valueField: 'key',
          // not request untill to select
          immediate: false,
          onChange: async (e: any) => {
            // console.log(e);
            let data = await getGameGroup({ id: e });
            let gameTypeOptions = data.gameTypeList;
            // console.log(data);
            if (e === undefined) {
              gameTypeOptions = [];
            }
            formModel.gameTypeID = undefined;
            const { setFieldsValue } = formActionType;
            setFieldsValue({
              gameTypeID: data.gameTypeID,
            });
            // const { updateSchema } = formActionType;
            // updateSchema({
            //   field: 'gameTypeID',
            //   required: true,
            // componentProps: {
            //     options: gameTypeOptions.map((element) => {
            //       return {
            //         label: element.value,
            //         value: element.key,
            //         key: element.key,
            //       };
            //     }),
            //   },
            // });
          },
        };
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '预设游戏名称',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: '必填' }],
    },
    {
      field: 'displayName',
      component: 'Input',
      label: '游戏显示名称',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: '必填' }],
    },
    {
      field: 'sort',
      component: 'Input',
      label: '游戏排序',
      colProps: {
        span: 8,
      },
      rules: [
        { required: true, message: '必填' },
        {
          pattern: /^\d{1,6}$/,
          message: '范围在 0~999,999',
          trigger: ['change', 'blur'],
        },
      ],
    },
    {
      field: 'bettingCode',
      component: 'Input',
      label: '游戏代码',
      colProps: {
        span: 16,
      },
      rules: [{ required: true, message: '必填' }],
    },
    {
      field: 'gameTypeID',
      component: 'Select',
      label: '游戏类型',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'isHotGame',
      component: 'Checkbox',
      label: '热门游戏',
      ifShow: ({model}) => {
        return model.gameTypeID === 5 || model.gameTypeID === 6 || model.gameTypeID === 7;
      },
      colProps: {
        span: 8,

      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      required: true,
      colProps: {
        span: 8,
      },
      defaultValue: '1',
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 1,
            key: '1',
          },
          {
            label: '开启',
            value: 2,
            key: '2',
          },
        ],
      },
    },
    {
      field: 'trialPlay',
      component: 'Select',
      label: '是否提供试玩',
      required: true,
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '否',
            value: 1,
            key: 1,
          },
          {
            label: '是',
            value: 2,
            key: 2,
          },
        ],
      },
    },
    {
      field: 'recommendedSort',
      component: 'Select',
      label: '首页推荐',
      required: true,
      defaultValue: 0,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: recommandSortOptions,
      },
    },
    {
      field: 'imageRecommandFile',
      component: 'Input',
      label: '推荐游戏图',
      colProps: {
        span: 6,
      },
      ifShow: ({model}) => {
        return (model.gameTypeID !== 5 && model.gameTypeID !== 6 && model.gameTypeID !== 7) && model.recommendedSort !== 0;
      },
      slot: 'imageRecommandFile',
    },
    {
      field: 'imageRecommand',
      component: 'Input',
      label: '',
      colProps: {
        span: 6,
      },
      ifShow: ({model}) => {
        return (model.gameTypeID !== 5 && model.gameTypeID !== 6 && model.gameTypeID !== 7) && model.recommendedSort !== 0;
      },
      slot: 'imageRecommand',
    },
    {
      field: 'imageH5File',
      component: 'Input',
      label: '游戏图片(H5)',
      colProps: {
        span: 6,
      },
      slot: 'imgH5File',
    },
    {
      field: 'imageH5',
      component: 'Input',
      label: '',
      colProps: {
        span: 6,
      },
      slot: 'imgH5',
    },
    {
      field: 'imagePcFile',
      component: 'Input',
      label: '游戏图片(PC)',
      colProps: {
        span: 6,
      },
      slot: 'imgPcFile',
    },
    {
      field: 'imagePc',
      component: 'Input',
      label: '',
      colProps: {
        span: 6,
      },
      slot: 'imgPc',
    },
    {
      field: 'screenShotH5File',
      component: 'Input',
      label: '遊戲畫面截圖 (H5)',
      colProps: {
        span: 6,
      },
      slot: 'screenShotH5File',
    },
    {
      field: 'screenShotH5',
      component: 'Input',
      label: '',
      colProps: {
        span: 6,
      },
      slot: 'shotH5',
    },
    {
      field: 'screenShotPcFile',
      component: 'Input',
      label: '遊戲畫面截圖 (PC) ',
      colProps: {
        span: 6,
      },
      slot: 'screenShotPcFile',
    },
    {
      field: 'screenShotPc',
      component: 'Input',
      label: '',
      colProps: {
        span: 6,
      },
      slot: 'shotPc',
    },
  ];

  export default defineComponent({
    components: { BasicModal, BasicForm, Upload, Tooltip },
    props: {
      gameGroupData: { type: Object },
    },
    emits: ['reload', 'register'],
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      //uploadImage
      const srcRecommand = ref('');
      const imageRecommandFile = ref();
      const srcH5 = ref('');
      const imageH5File = ref();
      const srcPc = ref('');
      const imagePcFile = ref();
      const srcScreenShotH5 = ref('');
      const screenShotH5File = ref();
      const srcScreenShotPc = ref('');
      const screenShotPcFile = ref();

      const [registerForm, { updateSchema, setFieldsValue, validateFields }] = useForm({
        labelWidth: 120,
        schemas: AddmodelFormSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        data && onDataReceive(data);
        let OptionData = await getGameListType();
        updateGameTypeField(
          OptionData.list.map((element) => {
            return {
              label: element.value,
              value: element.key,
            };
          })
        );
      });

      function updateGameTypeField(data) {
        //动态修改 FormSchemas
        updateSchema({
          field: 'gameTypeID',
          componentProps: {
            disabled: true,
            options: data,
          },
        });
      }

      function onDataReceive(data) {
        //console.warn('onDataReceive', data);
        // 载入资料
        setFieldsValue({
          id: data.id,
          name: data.name,
          displayName: data.displayName,
          //gameTypeList: data.gameTypeList,
          status: data.status,
        });
        srcH5.value = data.srcH5;
        srcPc.value = data.srcPc;
        imageH5File.value = data.imageH5;
        imagePcFile.value = data.imagePc;
      }

      function handleVisibleChange(visible) {
        visible && props.gameGroupData && nextTick(() => onDataReceive(props.gameGroupData));
      }

      const handleOk = async () => {
        try {
          const values = await validateFields();
          if ((values.gameTypeID !== 5 && values.gameTypeID !== 6 && values.gameTypeID !== 7) && values.recommendedSort !== 0){
            if (!imageRecommandFile.value) {
              createMessage.error('推荐游戏图不能为空');
              return;
            }
          }
          setModalProps({ confirmLoading: true });
          const params = {
            gameGroupID: values.gameGroupID,
            gameTypeID: values.gameTypeID,
            isHotGame: values.isHotGame === true ? 1 : 2,
            name: values.name,
            displayName: values.displayName,
            sort: values.sort,
            bettingCode: values.bettingCode,
            trialPlay: values.trialPlay,
            recommendedSort: values.recommendedSort,
            status: values.status,
            imageH5: imageH5File.value,
            imagePc: imagePcFile.value,
            screenShotH5: screenShotH5File.value,
            screenShotPc: screenShotPcFile.value,
            recommendedImageH5: imageRecommandFile.value,
          };
          // console.warn('params', params);
          await createGame(params);
          createMessage.success('Success');

          emit('reload');
          // 预览图重设
          srcRecommand.value = '';
          srcH5.value = '';
          srcPc.value = '';
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };
      // Block upload
      async function handleBeforeUploadRecommand(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        srcRecommand.value = '';
        reader.onload = function (e) {
          srcRecommand.value = (e.target?.result as string) ?? '';
        };
        //上传档案
        let form = new FormData();
        form.append('type', 'game');
        form.append('file', file);
        const res = await fileUpload(form);
        imageRecommandFile.value = res.url;
        return true;
      }

      // Block upload
      async function handleBeforeUploadH5(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        srcH5.value = '';
        reader.onload = function (e) {
          srcH5.value = (e.target?.result as string) ?? '';
        };
        //上传档案
        let form = new FormData();
        form.append('type', 'game');
        form.append('file', file);
        const res = await fileUpload(form);
        imageH5File.value = res.url;
        return true;
      }

      // Block upload
      async function handleBeforeUploadPc(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        srcPc.value = '';
        reader.onload = function (e) {
          srcPc.value = (e.target?.result as string) ?? '';
        };
        //上传档案
        let form = new FormData();
        form.append('type', 'game');
        form.append('file', file);
        const res = await fileUpload(form);
        imagePcFile.value = res.url;
        return true;
      }
      // Block upload
      async function handleBeforeUploadShotH5(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        srcScreenShotH5.value = '';
        reader.onload = function (e) {
          srcScreenShotH5.value = (e.target?.result as string) ?? '';
        };
        //上传档案
        let form = new FormData();
        form.append('type', 'game');
        form.append('file', file);
        const res = await fileUpload(form);
        screenShotH5File.value = res.url;
        return true;
      }
      // Block upload
      async function handleBeforeUploadShotPc(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        srcScreenShotPc.value = '';
        reader.onload = function (e) {
          srcScreenShotPc.value = (e.target?.result as string) ?? '';
        };
        //上传档案
        let form = new FormData();
        form.append('type', 'game');
        form.append('file', file);
        const res = await fileUpload(form);
        screenShotPcFile.value = res.url;
        return true;
      }
      return {
        register,
        handleVisibleChange,
        registerForm,
        handleOk,
        headerImg,
        handleBeforeUploadRecommand,
        handleBeforeUploadH5,
        handleBeforeUploadPc,
        handleBeforeUploadShotH5,
        handleBeforeUploadShotPc,
        srcH5,
        srcPc,
        srcScreenShotH5,
        srcScreenShotPc,
        srcRecommand,

      };
    },
  });
</script>
<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
