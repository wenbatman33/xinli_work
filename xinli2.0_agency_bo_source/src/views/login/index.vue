<template lang="pug">
.WH_FULL.FLEX_C
	.pt-8.text-center.homeHaeader.bg-repeat-x(:style='{ "background-image": "url(" + loginHeader + ")"}')
		div(class="CENTER_C")
			img.mb-4(:src="loginTop")
			.text-primary.bodoni LOG IN
			h6.text-subWhite your account
	.BG_GRADIENT_1.flex-grow.rounded.mt-8
		.bg-repeat-x.h-full.py-12.px-8(:style='{ "background-image": "url(" + bottomBg + ")", "background-position":"center bottom"}')
			van-form(@submit="onSubmit" validate-trigger="onSubmit")
				.h-48.relative
					.text-sm.text-primary.font-semibold {{$t('login_2')}}
					van-field.bg-transparent.xInput.my-4(
						v-model="account" 
						name="account" 
						:placeholder="$t('login_2')" 
						:rules="[{ required: true, message: $t('login_3') }]" )

					.text-sm.text-primary.font-semibold {{$t('login_4')}}
					van-field.bg-transparent.xInput.my-4(
						v-model="password"
						type="password"
						name="password"
						:placeholder="$t('login_4')" 
						:rules="[{ required: true, message: $t('login_5') }]")

				.absolute.right-0.text-3xl.welcome.opacity-10 WELCOME
				van-button.mt-20.bg-xRedDark(:class='"shadow-md shadow-xRedDark/50"' round block type="info" native-type="submit" :disabled="submitButtonDisabled") {{ $t('login_1') }}

</template>
<script setup lang="ts">
	import { ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import type { AGENCYAJAX_AgencyLoginRequest } from '@/api/model';

	const loginTop = `${window.staticPath}/static/img/loginTop.png`;
	const loginHeader = `${window.staticPath}/static/img/loginHeader.png`;
	const bottomBg = `${window.staticPath}/static/img/bottomBg.png`;

	const userStore = UserStore();
	const account = ref('');
	const password = ref('');
	const submitButtonDisabled = ref(false);

	const onSubmit = (values: AGENCYAJAX_AgencyLoginRequest) => {
		submitButtonDisabled.value = true;
		userStore.login({
			account: values.account,
			password: values.password,
		}).then(()=>{
			submitButtonDisabled.value = false;
		});
	};
</script>
