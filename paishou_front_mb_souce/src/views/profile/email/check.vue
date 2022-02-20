<template lang="pug">
//- 綁定信箱-確認頁
.email-check
    //- 表單
    van-form.mx-4.mt-6
        //- 信箱輸入框
        input-field(:model-value='email', label='您的邮箱', name='email', disabled)

        //- 下一步按鈕
        submit-button.mt-12(text='邮件修改', @click="clickNext")
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import inputField from '@/components/inputField';
import submitButton from '@/components/submitButton';

export default {
	components: {
		inputField,
		submitButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 電子信箱
		const email = computed(() => {
			return store.state?.user?.userInfo?.user_email;
		});

        // 點擊下一步按鈕
        const clickNext = () => {
            router.replace('/profile/email/submit')
        };
        return {
            email,
            clickNext,
        }
    }
}
</script>
<style lang="scss" scoped>
.email-check {
	width: 100%;
	::v-deep(.van-cell) {
		padding: 0;
	}
}
</style>