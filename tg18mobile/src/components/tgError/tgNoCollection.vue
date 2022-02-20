<template lang="pug">
.row.no-gutters.tgError.fade-in
  .col-12.nullContent.d-flex.justify-content-center.align-items-center.flex-column
    p
      img(src="/static/img/status-favor.svg")
    h4.text-center.title 您还没收藏过游戏…快去收藏！
    p.text-center 点击游戏下方的「加入收藏」
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
