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
        <template #maintainTime="{ field, values }">
          <div class="flex flex-row items-center">
            <DatePicker
              format="YYYY/MM/DD"
              :allowClear="false"
              :value="convertMoment(values[field])"
              @update:value="setFieldValue(field, $event)"
            />
            <TimePicker
              format="HH:mm"
              :allowClear="false"
              :value="convertMoment(values[field])"
              @update:value="setFieldValue(field, $event)"
            />
          </div>
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
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue';
  import { Upload, Tooltip, Modal, DatePicker, TimePicker } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { modelFormSchemas } from './modalFormSchema';
  import headerImg from '/@/assets/images/header.jpg';
  import { getGameListType } from '/@/api/game/gamelist';
  import { putGameGroup, fileUpload, getGameGroup } from '/@/api/game/gamegroup';
  import moment from 'moment';
  export default defineComponent({
    components: { BasicModal, BasicForm, Upload, Tooltip, DatePicker, TimePicker },
    props: {
      gameGroupData: { type: Object },
    },
    emits: ['reload', 'register'],
    setup(props, { emit }) {
      //uploadImage
      const srcH5 = ref('');
      const imageH5File = ref();
      const srcPc = ref('');
      const imagePcFile = ref();
      const gameTypeID = ref();
      const [registerForm, { appendSchemaByField, setFieldsValue, validateFields }] = useForm({
        labelWidth: 120,
        schemas: modelFormSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        data && onDataReceive(data);
        let OptionData = await getGameListType();
        // console.warn('useModalInner', data);
        appendField(
          OptionData.list.map((element) => {
            return {
              label: element.value,
              value: element.value,
            };
          })
        );
      });

      function appendField(data) {
        // console.log('appendField', data);
        appendSchemaByField(
          {
            field: 'gameTypeID',
            component: 'RadioGroup',
            label: '厂商游戏类型',
            colProps: {
              span: 24,
            },
            // rules: [{ required: true, message: '必填' }],
            componentProps: {
              options: data,
            },
          },
          'displayName'
        );
      }

      async function onDataReceive(data) {
        const response = await getGameGroup({ id: data.id });
        // console.warn('onDataReceive', data);
        // console.warn('onDataReceive3', response);
        // 载入资料
        setFieldsValue({
          id: data.id,
          gameAgencyName: data.gameAgencyName,
          walletType: data.walletType,
          name: data.name,
          platformFeeRatio: response.platformFeeRatio,
          displayName: data.displayName,
          openWay: data.openWay,
          currencyTypeList: data.currencyTypeList,
          sort: data.sort,
          status: data.status,
          maintainTime: response.maintainTime,
        });
        srcH5.value = data.srcH5;
        srcPc.value = data.srcPc;
        imageH5File.value = data.imageH5;
        imagePcFile.value = data.imagePc;
        gameTypeID.value = data.gameTypeID;
        // 等框画完再载入资料
        setTimeout(() => {
          setFieldsValue({
            gameTypeID: data.gameTypeName,
          });
        }, 600);
      }

      function handleVisibleChange(visible) {
        visible && props.gameGroupData && nextTick(() => onDataReceive(props.gameGroupData));
      }

      const handleOk = async () => {
        try {
          const values = await validateFields();
          setModalProps({ confirmLoading: true });
          console.warn('sdsdsd', values);
          const params = {
            id: values.id,
            name: values.name,
            displayName: values.displayName,
            gameTypeID: gameTypeID.value,
            sort: values.sort,
            status: values.status,
            imageH5: imageH5File.value,
            imagePc: imagePcFile.value,
            maintainTime: values.maintainTime,
          };
          if (params.status == 1) {
            Modal.confirm({
              title: `是否确定要将 ${params.displayName} 关闭`,
              content: '确认关闭后将自动关闭该厂商旗下所有游戏',
              okText: '确定',
              cancelText: '取消',
              async onOk() {
                await putGameGroup(params);
                emit('reload');
                // 预览图重设
                srcH5.value = '';
                srcPc.value = '';
                closeModal();
              },
              onCancel() {
                // console.log('Cancel');
              },
            });
          } else {
            await putGameGroup(params);

            emit('reload');
            // 预览图重设
            srcH5.value = '';
            srcPc.value = '';
            closeModal();
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

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
      const setFieldValue = (field: string, value: any) => {
        let str;
        if (value.format) {
          str = value.format('YYYY-MM-DD HH:mm');
        } else {
          str = value.toString();
        }
        setFieldsValue({ [`${field}`]: str });
      };
      return {
        register,
        handleVisibleChange,
        registerForm,
        handleOk,
        headerImg,
        handleBeforeUploadH5,
        handleBeforeUploadPc,
        srcH5,
        srcPc,
        convertMoment,
        setFieldValue,
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
