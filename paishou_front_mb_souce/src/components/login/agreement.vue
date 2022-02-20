<template lang="pug">
//- 同意用戶協議文字及連結
.agreement.text-xs.text-center.rounded-md.p-2
	//- 圖示
	van-icon.align-middle(name='checked', color='#00da16', size='16px')

	//- 文字
	span.ml-2.mr-1 登录表示您同意

	//- 連結
	router-link(to='/about/4') 用户协议
</template>
<style lang="scss" scoped>
.agreement {
	color: #333333;
	background: rgba(255, 255, 255, 0.75);
	a {
		color: #a62337;
	}
}
</style>