<template lang="pug">
.loadingAnitmate.flex.justify-center.items-center
	.loading
		.dot
		.dot
		.dot
		.dot
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.loadingAnitmate {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
}
.dot {
	float: left;
	width: 4px;
	height: 4px;
	margin: 0 4px;
	background: white;
	border-radius: 50%;
	opacity: 0;
	animation: loadingFade 1s infinite;
}

.dot:nth-child(1) {
	animation-delay: 0s;
}

.dot:nth-child(2) {
	animation-delay: 0.1s;
}

.dot:nth-child(3) {
	animation-delay: 0.2s;
}

.dot:nth-child(4) {
	animation-delay: 0.3s;
}

@-webkit-keyframes loadingFade {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.8;
	}
	100% {
		opacity: 0;
	}
}

@-moz-keyframes loadingFade {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.8;
	}
	100% {
		opacity: 0;
	}
}

@keyframes loadingFade {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.8;
	}
	100% {
		opacity: 0;
	}
}
</style>
