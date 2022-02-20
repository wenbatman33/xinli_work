<template lang="pug">
.row.no-gutters.tgError.fade-in
  .col-12.nullContent.d-flex.justify-content-center.align-items-center.flex-column
    p
      img(src="/static/img/status-recent.svg")
    h4.text-center.title 您暂时还没有游戏记录呦~
    p.text-center 点击「平台」进行游玩
</template>

<style lang="scss" scoped>
.fade-in {
	opacity: 0;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-delay: .2s;
	animation-duration: .5s;
	animation-fill-mode: forwards;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
