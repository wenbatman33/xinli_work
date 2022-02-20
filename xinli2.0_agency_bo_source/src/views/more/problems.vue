<template>
	<div class="container pb-4 FLEX_C">
		<div class="px-2">
			<van-collapse v-model="activeName" :border="false">
				<van-collapse-item :title="$t('more_problems_02')" name="1" :border="false">
					{{ $t('more_problems_03') }}
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
				<van-collapse-item :title="$t('more_problems_04')" name="2" :border="false">
					{{ $t('more_problems_05') }}
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
				<van-collapse-item :title="$t('more_problems_016')" name="3" :border="false" class="bg-yellow-50">
					<template #default>
						<div class="START_R">
							<div class="text-subWhite"> {{ $t('more_problems_07') }} </div>

							<div class="mt-2 text-primary"> {{ $t('more_problems_08') }}https://rule.xinli18sp </div>
							<img class="p-6" :src="state.demo" />
						</div>
					</template>
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
				<van-collapse-item :title="$t('more_problems_09')" name="4" :border="false">
					{{ $t('more_problems_10') }}
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
				<van-collapse-item :title="$t('more_problems_11')" name="5" :border="false">
					{{ $t('more_problems_12') }}
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
				<van-collapse-item :title="$t('more_problems_13')" name="6" :border="false">
					{{ $t('more_problems_14') }}
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
				<van-collapse-item :title="$t('more_problems_15')" name="8" :border="false">
					{{ $t('more_problems_16') }}
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
				<van-collapse-item :title="$t('more_problems_17')" name="8" :border="false">
					{{ $t('more_problems_18') }}
					<template #right-icon>
						<van-icon name="plus" color="#967140" />
					</template>
				</van-collapse-item>
			</van-collapse>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue';

	const demo1 = `${window.staticPath}/static/img/demo/demo1.png`;

	const activeName = ref(['1']);
	const state = reactive({
		demo: demo1,
	});
</script>
<style lang="less" scoped>
	::v-deep(.van-cell__right-icon) {
		color: #cda269;
	}
	.van-collapse-item {
		position: relative;
		margin: 0.5rem;
		background: #0f0f0f;
	}

	::v-deep(.van-collapse-item__content) {
		background: #0f0f0f;
	}
</style>
