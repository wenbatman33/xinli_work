<template lang="pug">
.row.no-gutters.tgError.fade-in
  .col-12.nullContent.d-flex.justify-content-center.align-items-center.flex-column
    p
      img(src="/static/img/status-warning.png")
    h4.text-center.title 资料错误
    p.text-center 请再重新尝试一次
</template>

<style lang="scss" scoped>
.fade-in {
	opacity: 0;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-delay: 1s;
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
