<template>
	<div class="container pb-4 FLEX_C">
		<div class="px-2">
			<van-cell :title="$t('more_More_02')" value="100" size="large" is-link to="announcement">
				<!-- <template #value>
					<van-tag round type="danger" size="large">{{ $t('more_More_03') }}</van-tag>
				</template> -->
			</van-cell>
			<van-cell :title="$t('more_More_04')" size="large" is-link to="announcementAgency" />
			<van-cell :title="$t('more_More_05')" size="large" is-link to="promotionPage" />
			<van-cell :title="$t('more_More_06')" size="large" is-link to="promotionAgencyPage" />
			<van-cell :title="$t('more_More_07')" size="large" is-link to="problems" />
			<van-cell :title="$t('more_More_08')" size="large" is-link to="provision" />
			<van-cell :title="$t('more_More_09')" size="large" is-link to="resetPassword" />
			<van-cell :title="$t('more_More_10')" size="large" is-link to="transactionPassword" />
			<van-cell :title="$t('more_More_11')" size="large" is-link @click="logout" />
		</div>
		<div class="flex justify-start p-6">
			<span class="mr-4">{{ $t('login_7') }} :</span>

			<select class="w-20 bg-black" v-model="selected" @change="setSelected()">
				<option selected>cn</option>
				<option>en</option>
			</select>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { UserStore } from '@/store/userStore';

	const userStore = UserStore();
	const logout = () => {
		userStore.clearUserInfo();
	};
	const selected = ref(window.localStorage.getItem('LANG'));
	const setSelected = () => {
		if (selected.value == 'cn') {
			window.localStorage.setItem('LANG', 'cn');
			window.location.reload();
		} else {
			window.localStorage.setItem('LANG', 'en');
			window.location.reload();
		}
	};
</script>
<style></style>
