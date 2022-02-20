<template lang="pug">
.Container.CENTER_C.py-8
	.anchorverify.bg-white.rounded-lg.py-8(class='w-2/3', style='height:380px', v-if='isAnchor===2')
		.text-center
			.text-xs.text-psV3Yellow 审核未通过
			h2.text-psV3Red.mb-8 主播验证
			.text-gray-600.mx-auto(style='width:400px') 亲爱的用户，您先前申请成为主播审核未通过
			.text-psV3Yellow.mx-auto.my-8(style='width:400px')
				p 目前不再接受申请，若有疑问请洽客服
			router-link(to='/')
				a-button.rounded-xl(class='w-2/3', type='primary', size='large') 返回首页
	.anchorverify.bg-white.rounded-lg.py-8(class='w-2/3', style='height:580px' v-if='isAnchor===0')
		.text-center
			.text-xs.text-psV3Yellow 申请成功
			h2.text-psV3Red.mb-8 等待审核中
			.text-gray-600.mx-auto(style='width:400px')
				span.text-psV3Yellow 审核需要数个工作天
				span ，可以先至 
				span.text-psV3Red 主播教程 
				span 与 
				span.text-psV3Red obs使用教程 
				span 确认必备主播技能教学喔！
			.text-black.mx-auto.my-8(style='width:400px')
				p 实名认证的帐号不得以任何形式转与或贩售给他人！
				p 若发现帐号有违反法律或其他恶劣行为，拍手平台将配合公家单位调查备案，产生之后过将由主播或用户自行承担！
			.text-psV3Yellow.mx-auto.my-8(style='width:400px')
				p 每个身份仅能对应一个帐号。
				p 相同身份信息提交多帐号认证将会影响审核通过。
			router-link(to='/')
				a-button.rounded-xl(class='w-2/3', type='primary', size='large') 返回首页
	.bg-white(v-if='isAnchor===-1')
		a-form(:model='anchorauthForm',:rules='anchorauthFormRules', layout='vertical', @submit='submitHandle')
			.step1.anchorauth.rounded-lg.bg-white.shadow.w-full(v-if='state.step===1')
				.FLEX_R
					.anchorauthImg.flex.relative(style='width:670px;min-height:580px;')
						img.w-full(:src='state.adBannerList')
						.w-40.h-52.CENTER.flex-col.bg-white.rounded-xl.absolute.shadow.z-20(style='left:585px;top:200px;')
							vue-qrcode(:value='"https://jq.qq.com/?_wv=1027&k=SGPqJi80"', :width='120')
							.text-center.text-psV3Red
								h2.text-psV3Red 加入QQ群
								h2.text-psV3Red 成为主播
					.CENTER.flex-grow.px-8.pl-24(style='width:430px')
						.w-full 
							.text-xs.text-psV3Yellow 成为主播 第1步
							h2.text-psV3Red 主播验证
							a-form-item(label='真实姓名', name='real_name', v-bind='validateInfos.real_name')
								a-input(v-model:value='anchorauthForm.real_name', placeholder='请输入真实姓名')
							a-form-item(label='身份证/护照号码', name='cer_no' , v-bind='validateInfos.cer_no')
								a-input(v-model:value='anchorauthForm.cer_no', placeholder='请输入您的身份证/护照号码')
							a-form-item(v-bind='validateInfos.social_app_id')
								.FLEX_R
									a-radio-group(v-model:value='state.socialApp')
										a-radio-button(:value='1') QQ
										a-radio-button(:value='2') ＷeChat
								.mt-4
									a-input(v-model:value='anchorauthForm.social_app_id', :placeholder='state.socialApp===1?"请输入QQ":"请输入ＷeChat"') 
							.mt-4
							a-button.mt-4(type='primary', size='large' :loading='state.loadingBtn', @click='gotoNext') 下一步
			.step2.mx-auto.FLEX_R.justify-between.rounded-lg.shadow.p-12(style='width:750px', v-if='state.step===2')
				.FLEX_C.justify-between(class='w-2/3')
					div
						.text-xs.text-psV3Yellow 成为主播 第2步
						h2.text-psV3Red 身份证照验证
						p.mt-8 身份证照将会进行人工审核务必做到以下几点
						.text-sm 1.需要年满18周岁
						.text-sm 2.照片包含整个身份整版面
						.text-sm 3.身分证文字及图片清晰可见
						.text-sm 4.身分证照片无作假，篡改
					a-form-item.flex.justify-center
						a-button.w-full(type='primary', size='large', :loading='state.loadingBtn', @click='submitHandle') 上传
				.FLEX_C.justify-between.px-8(class='w-1/3')
					a-form-item.m-0(label='身份证/护照正面', v-bind='validateInfos.front_view')
						a-upload.IDcard_front.w-28.h-28(v-model:value='anchorauthForm.front_view',class='anchorauthUploader', name='.', list-type='picture-card', :show-upload-list='false', :customRequest='frontUpload', :before-upload='beforeUpload')
							img.w-full(v-if='anchorauthForm.front_view', :src='anchorauthForm.front_view', alt='')
							.CENTER.flex-col.h-full(v-else='')
								LoadingOutlined.my-2(v-if='state.loading')
								PlusOutlined.my-2.my-2(v-else)
								.text-xs 身份证/护照正面
					a-form-item.m-0(label='身份证/护照反面', v-bind='validateInfos.back_view')
						a-upload.IDcard_back.w-28.h-28(v-model:value='anchorauthForm.back_view', class='anchorauthUploader', name='IDcard_back', list-type='picture-card', :show-upload-list='false', :customRequest='backUpload', :before-upload='beforeUpload')
							img.w-full(v-if='anchorauthForm.back_view', :src='anchorauthForm.back_view', alt='')
							.CENTER.flex-col.h-full(v-else='')
								LoadingOutlined(v-if='state.loading')
								PlusOutlined.my-2(v-else)
								.text-xs 身份证/护照反面
					a-form-item.m-0(label='手持身份证/护照', v-bind='validateInfos.handset_view')
						a-upload.handset_img.w-28.h-28(v-model:value='anchorauthForm.handset_view', class='anchorauthUploader', name='handset_img', list-type='picture-card', :show-upload-list='false', :customRequest='handsetUpload', :before-upload='beforeUpload')
							img.w-full(v-if='anchorauthForm.handset_view', :src='anchorauthForm.handset_view', alt='')
							.CENTER.flex-col.h-full(v-else='')
								LoadingOutlined.my-2(v-if='state.loading')
								PlusOutlined.my-2(v-else)
								.text-xs 手持身份证/护照
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { uploadFile, anchorauth } from '@/api';
import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { slideList } from '@/api';
import VueQrcode from 'vue3-qrcode';

export default {
	components: {
		PlusOutlined,
		LoadingOutlined,
		VueQrcode,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const state = reactive({
			step: 1,
			loading: false,
			loadingBtn: false,
			socialApp: 1,
			adBannerList: null,
		});
		const anchorauthForm = reactive({
			front_view: '',
			back_view: '',
			handset_view: '',
			real_name: '',
			cer_no: '',
			social_app_id: '',
		});
		const anchorauthFormRules = reactive({
			front_view: [{ required: true, message: '请上传身份证/护照正面', trigger: ['change', 'blur'] }],
			back_view: [{ required: true, message: '请上传身份证/护照反面', trigger: ['change', 'blur'] }],
			handset_view: [{ required: true, message: '请上传手持身份证/护照', trigger: ['change', 'blur'] }],
			real_name: [{ required: true, message: '请输入真实姓名', trigger: ['change', 'blur'] }],
			cer_no: [{ required: true, message: '请输入身份证/护照号码', trigger: ['change', 'blur'] }],
			social_app_id: [{ required: true, message: '请填写QQ或Wechat号', trigger: ['change', 'blur'] }],
		});

		const UID = computed(() => store.state.user.uid || '');
		const userInboxList = computed(() => store.state.user.inboxList || '');
		const userInfo = computed(() => store.state.user.userInfo || '');
		const isAnchor = computed(() => userInfo?.value?.is_anchor);

		const { validate, validateInfos } = useForm(anchorauthForm, anchorauthFormRules);

		const submitHandle = (e) => {
			e.preventDefault();
			validate().then(() => {
				const payload = toRaw(anchorauthForm);
				payload.uid = Number(UID.value);
				if (state.socialApp === 1) {
					payload.qq = anchorauthForm.social_app_id;
				} else if (state.socialApp === 1) {
					payload.wechat = anchorauthForm.social_app_id;
				}
				state.loadingBtn = true;
				anchorauth(payload)
					.then((res) => {
						if (res.code == 0) {
							state.loadingBtn = false;
							message.success('认证成功！');
							store.dispatch('user/UPDATE_USER_INFO');
						}
					})
					.catch((err) => {
						state.loadingBtn = false;
						state.step = 1;
					});
			});
		};
		const beforeUpload = (file) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
			if (!isJpgOrPng) {
				message.error('上传图片格式仅为jpeg/jpg/png！');
			}
			const isLt2M = file.size / 1024 / 1024 < 3;
			if (!isLt2M) {
				message.error('上传图片大小不能超过3M');
			}
			return isJpgOrPng && isLt2M;
		};
		const frontUpload = (data) => {
			state.loading = true;
			let formData = new FormData();
			formData.append('file_name', data.file);
			// formData.append('uid', Number(UID.value));
			uploadFile(formData).then((res) => {
				if (res.code === 0 && res.data) {
					state.loading = false;
					anchorauthForm.front_view = res.data.avatar;
				}
			});
		};
		const gotoNext = () => {
			validate()
				.then(() => {
					// console.log(toRaw(anchorauthForm));
				})
				.catch((err) => {
					// console.log(err.errorFields);
					const real_name = err.errorFields.findIndex((obj) => obj.name == 'real_name') === -1;
					const cer_no = err.errorFields.findIndex((obj) => obj.name == 'cer_no') === -1;
					const social_app_id = err.errorFields.findIndex((obj) => obj.name == 'social_app_id') === -1;
					// console.log(real_name);
					// console.log(cer_no);
					// console.log(social_app_id);
					if (real_name && cer_no && social_app_id) {
						state.step = 2;
					}
				});
		};
		const backIndex = (data) => {
			router.push('/');
		};
		const backUpload = (data) => {
			state.loading = true;
			let formData = new FormData();
			formData.append('file_name', data.file);
			// formData.append('uid', Number(UID.value))
			uploadFile(formData).then((res) => {
				if (res.code === 0 && res.data) {
					state.loading = false;
					anchorauthForm.back_view = res.data.avatar;
				}
			});
		};
		const handsetUpload = (data) => {
			state.loading = true;
			let formData = new FormData();
			formData.append('file_name', data.file);
			// formData.append('uid', Number(UID.value))
			uploadFile(formData).then((res) => {
				if (res.code === 0 && res.data) {
					state.loading = false;
					anchorauthForm.handset_view = res.data.avatar;
				}
			});
		};

		onUnmounted(() => {
			document.querySelector('.appContainer').style.backgroundImage = 'none';
		});
		onMounted(() => {
			slideList({ slide_cid: 21 }).then((res) => {
				state.adBannerList = res.data?.list?.filter((task, index) => index < 1)[0].slide_pic || null;
			});
			if (isAnchor.value === 1) {
				router.push('/');
			}
			document.querySelector('.appContainer').style.backgroundImage = "url('/publicAssets/img/v3/img-repeat-banana.png')";
		});
		return {
			router,
			state,
			anchorauthForm,
			anchorauthFormRules,
			UID,
			userInboxList,
			userInfo,
			isAnchor,
			submitHandle,
			beforeUpload,
			frontUpload,
			backUpload,
			handsetUpload,
			validate,
			validateInfos,
			backIndex,
			gotoNext,
		};
	},
};
</script>
<style lang="scss">
.anchorauthUploader {
	.ant-upload {
		width: 100% !important;
		height: 100% !important;
		display: flex;
		overflow: hidden;
		margin: 0;
		line-height: 28px;
	}
}
</style>
