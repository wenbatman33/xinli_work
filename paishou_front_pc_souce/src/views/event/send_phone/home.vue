<template lang="pug">
//- 活動首頁
.FLEX_C.items-center.overflow-hidden.px-12
	//- 圖片組合
	.max-w-900.relative.FLEX_C
		//- 手機圖片
		img.absolute.z-10.h-full.right-mobile.object-contain(src='/publicAssets/img/event/send_phone/img-mobile@3x.png')

		//- 商標圖片
		img.relative.z-20.w-logo.ml-logo.mt-28(src='/publicAssets/img/event/send_phone/img-logo@3x.png')

		//- 文字圖片
		img.relative.z-20.w-full.mt-1(src='/publicAssets/img/event/send_phone/img-text@3x.png')
</template>
<style lang="scss" scoped>
.max-w-900 {
	max-width: 900px;
}
.w-logo {
	width: 17.6%;
}
.right-mobile {
	right: 9%;
}
.ml-logo {
	margin-left: 4.8%;
}
.border-back {
	border: solid 2px #ffffff;
}
</style>
