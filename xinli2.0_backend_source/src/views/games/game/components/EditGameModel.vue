<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="编辑"
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
  import { EditmodelFormSchemas } from './editmodalFormSchema';
  import headerImg from '/@/assets/images/header.jpg';
  import { fileUpload, getGameGroup } from '/@/api/game/gamegroup';
  import { useGlobSetting } from '/@/hooks/setting';
  import { getGameListType, getGameGroupOption, putGame, getGame } from '/@/api/game/gamelist';
  
  export default defineComponent({
    components: { BasicModal, BasicForm, Upload, Tooltip },
    props: {
      gameGroupData: { type: Object },
    },
    emits: ['reload', 'register'],
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      const globSetting = useGlobSetting();
      const apiUrl = globSetting.apiUrl;
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
        schemas: EditmodelFormSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        data && onDataReceive(data);
        let OptionData = await getGameListType();
        let GameGroupData = await getGameGroupOption();
        updateGameTypeField(
          OptionData.list.map((element) => {
            return {
              label: element.value,
              value: element.key,
            };
          })
        );
        updateGameGroupOptionField(
          GameGroupData.list.map((element) => {
            return {
              label: element.displayName,
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

      function updateGameGroupOptionField(data) {
        //动态修改 FormSchemas
        updateSchema({
          field: 'gameGroupID',
          required: true,
          componentProps: ({ formModel, formActionType }) => {
            return {
              options: data,
              placeholder: '遊戲廠商名称与游戏类型联动',
              onChange: async (e: any) => {
                // console.log(e);
                let data = await getGameGroup({ id: e });
                // let gameTypeOptions = data.gameTypeList;
                console.log(data);
                // if (e === undefined) {
                //   gameTypeOptions = [];
                // }
                formModel.gameTypeID = undefined;
                setFieldsValue({
                  gameTypeID: data.gameTypeID,
                });
                // const { updateSchema } = formActionType;
                // updateSchema({
                //   field: 'gameTypeID',
                //   required: true,
                //   componentProps: {
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
        });
      }

      async function onDataReceive(data) {
        console.warn('onDataReceive', data);
        const response = await getGame({ id: data.id });
        console.log('API Received', response);
        // 载入资料
        setFieldsValue({
          id: response.id,
          name: response.name,
          displayName: response.displayName,
          sort: response.sort,
          isHotGame: response.isHotGame === 1 ? true : false,
          recommendedSort: response.recommendedSort,
          bettingCode: response.bettingCode,
          trialPlay: response.trialPlay,
          isSpecial: data.isSpecial,
          isSlot: data.isSlot,
          status: response.status,
        });
        srcH5.value = data.srcH5;
        srcPc.value = data.srcPc;
        srcRecommand.value = apiUrl + '/file/' + response.recommendedImageH5;
        imageH5File.value = data.imageH5;
        imagePcFile.value = data.imagePc;
        srcScreenShotH5.value = apiUrl + '/file/' + response.screenShotH5;
        srcScreenShotPc.value = apiUrl + '/file/' + response.screenShotPc;
        screenShotH5File.value = response.screenShotH5;
        screenShotPcFile.value = response.screenShotPc;
        imageRecommandFile.value = response.recommendedImageH5;
        // 等框画完再载入资料
        setTimeout(() => {
          setFieldsValue({
            gameGroupID: data.gameGroupID,
            gameTypeID: data.gameTypeID,
          });
        }, 300);
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
            id: values.id,
            gameGroupID: values.gameGroupID,
            gameTypeID: values.gameTypeID,
            isHotGame: values.isHotGame === true ? 1 : 2,
            name: values.name,
            displayName: values.displayName,
            sort: values.sort,
            bettingCode: values.bettingCode,
            trialPlay: values.trialPlay,
            recommendedSort: values.recommendedSort,
            isSpecial: values.isSpecial,
            isSlot: values.isSlot,
            status: values.status,
            imageH5: imageH5File.value,
            imagePc: imagePcFile.value,
            screenShotH5: screenShotH5File.value,
            screenShotPc: screenShotPcFile.value,
            recommendedImageH5: imageRecommandFile.value,
          };
          if (!params.imageH5 || !params.imagePc) {
            createMessage.error('请加入游戏图片');
          } else {
            // console.warn('handleOk', params);
            await putGame(params);
            createMessage.success('Success');

            emit('reload');
            // 预览图重设
            srcRecommand.value = '';
            srcH5.value = '';
            srcPc.value = '';
            closeModal();
          }
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
        handleBeforeUploadH5,
        handleBeforeUploadPc,
        handleBeforeUploadShotH5,
        handleBeforeUploadShotPc,
        handleBeforeUploadRecommand,
        srcH5,
        srcPc,
        srcScreenShotH5,
        srcScreenShotPc,
        srcRecommand
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
