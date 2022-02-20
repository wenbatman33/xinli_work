<template>
	<div class="container pb-4 FLEX_C">
		<div class="justify-center text-center FLEX_C">
			<van-tabs v-model:active="active" animated background="transparent" title-active-color="white" title-inactive-color="#ccc" color="white" line-width="33%" line-height="1" class="p-4">
				<van-tab :title="$t('finance_ProductDetail_01')">
					<div class="p-4 m-5 rounded-md cursor-pointer CENTER_C btnBg">
						<div class="text-primary">◆ {{ $t('finance_ProductDetail_02') }} ◆</div>
						<div class="text-white bodoni">{{ tabDataRef1.volume }}</div>
					</div>
					<div class="p-4 m-5 rounded-md cursor-pointer CENTER_C btnBg">
						<div class="text-primary">◆ {{ $t('finance_ProductDetail_03') }} ◆</div>
						<div class="text-red bodoni">{{ tabDataRef1.income }}</div>
					</div>
					<div class="justify-center mt-4 text-center FLEX_C">
						<el-table class="blackTable" :data="tabDataRef1.memberList" :default-sort="{ prop: 'total', order: 'descending' }" min-width="200px" size="mini">
							<el-table-column header-align="center" align="center" prop="name" :label="$t('finance_ProductDetail_04')" />
							<el-table-column header-align="center" align="center" prop="total" :label="$t('finance_ProductDetail_05')" sortable />
							<el-table-column header-align="center" align="center" prop="win" :label="$t('finance_ProductDetail_06')" sortable>
								<template #default="scope">
									<div class="text-red">
										{{ scope.row.win }}
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</van-tab>
				<van-tab :title="$t('finance_ProductDetail_07')">
					<div class="p-4 m-5 rounded-md cursor-pointer CENTER_C btnBg">
						<div class="text-primary">◆ {{ $t('finance_ProductDetail_02') }} ◆</div>
						<div class="text-white bodoni">{{ tabDataRef2.volume }}</div>
					</div>
					<div class="p-4 m-5 cursor-pointer ounded-md CENTER_C btnBg">
						<div class="text-primary">◆ {{ $t('finance_ProductDetail_03') }} ◆</div>
						<div class="text-red bodoni">{{ tabDataRef2.income }}</div>
					</div>
					<div class="justify-center mt-4 text-center FLEX_C">
						<el-table :data="tabDataRef2.memberList" :default-sort="{ prop: 'total', order: 'descending' }" min-width="200px" size="mini">
							<el-table-column header-align="center" align="center" prop="name" :label="$t('finance_ProductDetail_04')" />
							<el-table-column header-align="center" align="center" prop="total" :label="$t('finance_ProductDetail_05')" sortable />
							<el-table-column header-align="center" align="center" prop="win" :label="$t('finance_ProductDetail_06')">
								<template #default="scope">
									<div class="text-red">
										{{ scope.row.win }}
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</van-tab>
				<van-tab :title="$t('finance_ProductDetail_08')">
					<div class="p-4 m-5 rounded-md cursor-pointer CENTER_C btnBg">
						<div class="text-primary">◆ {{ $t('finance_ProductDetail_03') }} ◆</div>
						<div class="text-white bodoni">{{ tabDataRef3.volume }}</div>
					</div>
					<div class="p-4 m-5 rounded-md cursor-pointer CENTER_C btnBg">
						<div class="text-primary">◆ {{ $t('finance_ProductDetail_03') }} ◆</div>
						<div class="text-red bodoni">{{ tabDataRef3.income }}</div>
					</div>
					<div class="justify-center mt-4 text-center FLEX_C">
						<el-table :data="tabDataRef3.memberList" :default-sort="{ prop: 'total', order: 'descending' }" min-width="200px" size="mini">
							<el-table-column header-align="center" align="center" prop="name" :label="$t('finance_ProductDetail_04')" />
							<el-table-column header-align="center" align="center" prop="total" :label="$t('finance_ProductDetail_05')" sortable />
							<el-table-column header-align="center" align="center" prop="win" :label="$t('finance_ProductDetail_06')">
								<template #default="scope">
									<div class="text-red">
										{{ scope.row.win }}
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { getProductFinance } from '@/api';
	import type { AGENCYAJAX_AgencyFinanceProductRequest, AGENCYAJAX_AgencyFinanceProductResponse } from '@/api/model';
	import { SystemStore } from '@/store/systemStore';
	const systemStore = SystemStore(); 

	const active = ref(2);
	const route = useRoute();
	const tabDataRef1 = ref<AGENCYAJAX_AgencyFinanceProductResponse>({});
	const tabDataRef2 = ref<AGENCYAJAX_AgencyFinanceProductResponse>({});
	const tabDataRef3 = ref<AGENCYAJAX_AgencyFinanceProductResponse>({});

	const getProductData = (params: AGENCYAJAX_AgencyFinanceProductRequest) => {
		const { id, periodOption } = params;
		getProductFinance({ id, periodOption }).then((response) => {
			systemStore.navTitle = response.data.data?.name || '';
			switch (periodOption) {
				case 1:
					tabDataRef1.value = response.data.data || {};
					break;
				case 2:
					tabDataRef2.value = response.data.data || {};
					break;
				case 3:
					tabDataRef3.value = response.data.data || {};
					break;
			}
		});
	};
	onMounted(() => {
		systemStore.navTitle = ''
		const id = Number(route.params.id);
		getProductData({ id, periodOption: 1 });
		getProductData({ id, periodOption: 2 });
		getProductData({ id, periodOption: 3 });
	});
</script>

<style lang="less" scoped>
	.btnBg {
		// background-image: url('@/assets/pattern_btn_bg.svg'), linear-gradient(155.07deg, #343434 5.26%, #181818 84.13%);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 98% center;
	}
</style>
