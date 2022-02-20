<template lang="pug">
.contentContainer
	.flex.flex-col.WH_FULL
		.pageTitle.FLEX_R
			.icon.mr-4
				.bg-xBlue.rounded-full.w-8.h-8.CENTER
					SvgIcon.w-5.h-5.text-white(:name='"#Inbox"')
			.title.flex-grow
				.FLEX_R_CENTER
					h5.cursor-pointer(@click='back') {{t('personal_inbox')}}
					span.Subtitle_2.ml-4.text-gray-500(v-if='activeKey === 0' )  &gt;{{t('personal_mail')}}
					span.Subtitle_2.ml-4.text-gray-500(v-if='activeKey === 1' )  &gt;{{t('personal_announcement')}}
			a-button(v-if='letterDetail || announcementDetail' danger @click='back') {{t('personal_back')}}
			
		.FLEX_C.flex-grow.my-4
			.CENTER
				.tab.w-60(:class='{"tabType2": activeKey===0}' )
					.tabItem(:class='{"tabItem_Active": activeKey===0}' @click='changeTab(0)') 
						span {{t('personal_mail')}} 
						span(v-if='eventStore.unReadCount>0') ({{eventStore.unReadCount}})
					.tabItem(:class='{"tabItem_Active": activeKey===1}' @click='changeTab(1)') 
						span {{t('personal_announcement')}}
			//- 站內信
			.tabContent_0.my-4(v-if='activeKey===0')
				a-table(v-if='!letterDetail' 
					:columns="letterListColumns" 
					:data-source='letterList' 
					:row-key="(record:any) => record.id" 
					:showHeader='false' :size='"middle"' 
					:customRow='customLetterListRow')
					template(#title='{ record }')
						.font-semibold {{record?.title}}

					template(#status='{ text }')
						//- 狀態[1待發送2已發送3已讀取4失敗5回收]
						.rounded-full.w-1.h-1.bg-xRed(v-if="text===2")
						
				.FLEX_C.flex-grow.WH_FULL(v-if='letterDetail===true')
					.text-center
						h6.text-center.font-semibold {{currentLetterRowData?.title}}
						p.text-center.Body_4.text-gray-500 {{currentLetterRowData?.sendAt}}
					.CENTER
						.flex.my-4.p-4.max-w-2xl
							.w-full.overflow-y-auto.text-center(v-html='currentLetterRowData.content')

			//- 公告
			.tabContent_0.my-4(v-if='activeKey===1')
				a-table(v-if='!announcementDetail' 
					:columns="announcementColumns" 
					:data-source='announcementList' 
					:row-key="(record:any) => record.id" 
					:showHeader='false' :size='"middle"' 
					:customRow='customLAnnouncementRow')

					template(#title='{ record }')
						.font-semibold {{record?.title}}
						

				.FLEX_C.flex-grow.WH_FULL(v-if='announcementDetail===true')
					.text-center
						h6.text-center.font-semibold {{currentAnnouncementRowData?.title}}
						p.text-center.Body_4.text-gray-500 {{currentAnnouncementRowData?.start}}
					.CENTER
						.flex.my-4.p-4.max-w-2xl
							.w-full.overflow-y-auto.text-center(v-html='currentAnnouncementRowData.context')

</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { EventStore } from '@/store/eventStore';
	import { useI18n } from 'vue-i18n';
	import { useRoute, useRouter } from 'vue-router';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import type { EVENTAJAX_GetAnnouncementResponseData } from '@/api/model';
	import { putEventLetter } from '@/api';
	const { t } = useI18n();
	const activeKey = ref(0);
	const userStore = UserStore();
	const eventStore = EventStore();
	const letterDetail = ref(false);
	const announcementList = computed(() => eventStore.announcementList);
	const letterList = computed(() => eventStore.letterList);
	const announcementDetail = ref(false);
	const back = () => {
		letterDetail.value = false;
		announcementDetail.value = false;
	};

	interface IcurrentLetterRowData {
		id: number;
		title: string;
		date: string;
		readed: boolean;
		selected: boolean;
		content: string;
	}

	const changeTab = (val: any) => {
		activeKey.value = val;
		letterDetail.value = false;
		announcementDetail.value = false;
	};
	// 站內信
	const currentLetterRowData = ref({} as IcurrentLetterRowData);
	const letterListColumns = [
		{
			title: 'status',
			dataIndex: 'status',
			slots: { customRender: 'status' },
		},
		{
			title: 'title',
			dataIndex: 'title',
			slots: { customRender: 'title' },
		},
		{
			title: 'sendAt',
			dataIndex: 'sendAt',
			align: 'right',
		},
	];
	const readLetter = async (id: number) => {
		const payload = { ID: id };
		const res = await putEventLetter(payload);

		res && eventStore.getEventLetterListAction();
	};
	const customLetterListRow = (record: any) => {
		return {
			style: { cursor: 'pointer' },
			onClick: (event: any) => {
				showLetterListDetail(record);
				readLetter(record.id);
			},
		};
	};
	const showLetterListDetail = (val: any) => {
		letterDetail.value = true;

		const newContent = val.content.replaceAll('{{memeberAccount}}', userStore.userInfo.account);
		const detailData = { ...val, ...{ content: newContent } };
		currentLetterRowData.value = detailData;
	};

	// 公告
	const currentAnnouncementRowData = ref({} as EVENTAJAX_GetAnnouncementResponseData);
	const announcementColumns = [
		{
			title: 'title',
			dataIndex: 'title',
			slots: { customRender: 'title' },
		},
		{
			title: 'start',
			dataIndex: 'start',
			align: 'right',
		},
		// {
		// 	title: 'context',
		// 	dataIndex: 'context',
		// 	slots: { customRender: 'context' },
		// },
	];
	const customLAnnouncementRow = (record: any) => {
		return {
			style: { cursor: 'pointer' },
			onClick: (event: any) => {
				showAnnouncementDetail(record);
			},
		};
	};
	const showAnnouncementDetail = (val: any) => {
		announcementDetail.value = true;
		currentAnnouncementRowData.value = val;
	};
</script>

<style scoped lang="scss">
	.tab {
		display: flex;
		position: relative;
		overflow: hidden;
		flex-direction: row;

		justify-content: flex-start;
		align-items: center;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 100px;
		overflow: hidden;
		&::before {
			content: '';
			display: block;
			position: absolute;
			z-index: 0;
			left: 50%;
			width: 50%;
			top: 0;
			bottom: 0;
			background: #f0453a;
			border-radius: inherit;
			-webkit-transition: 0.3s ease;
			transition: 0.3s ease;
		}
	}
	.tabType2 {
		&::before {
			content: '';
			display: block;
			position: absolute;
			z-index: 0;
			left: 0;
			width: 50%;
			top: 0;
			bottom: 0;
			background: #f0453a;
			border-radius: inherit;
			-webkit-transition: 0.3s ease;
			transition: 0.3s ease;
		}
	}
	.tabItem {
		width: 50%;
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: center;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.6);
		border-radius: inherit;
		cursor: pointer;
		position: relative;
		z-index: 1;
		-webkit-transition: 0.3s ease;
		transition: 0.3s ease;
	}
	.tabItem_Active {
		color: #fff;
		font-weight: 600;
	}
</style>
