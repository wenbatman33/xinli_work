<template lang="pug">
.container.pb-4.FLEX_C
  template(  v-for="item in linkPageList" :key="item.title")
   .black_light.ml-5.mr-5.mt-3.p-2.rounded-md
    .flex.flex-row.grid.grid-cols-8.grid-flow-col
      .col-span-6.font-semibold
        | {{ item.title }}     
      .col-span-1
        img.w-5(v-if="item.showCopyIcon" :src='iconCopy' @click="handleCopy(item.text)")
      .col-span-1
        img.w-5(v-if="item.showQrcodeIcon" :src='iconShowQrCode'  @click="handleShowQrcode(item)")
    .pt-2.text-sm(style="color: rgba(255, 255, 255, 0.5);")
      | {{item.text}}

van-popup(v-if="showQrcode" v-model:show="showQrcode" :style="{ width: '70%' }")
  .bg-black.CENTER_C
    .my-3.text-white {{showQrcodeTitle}}
    qrcode-vue#QRCODE(:value="showQrcodeLink" :margin="4" :size="150")
    van-button(class="bg-[#ee0a24] my-3" round type="danger" @click="downQrcode")
      | {{ $t('linkPage_12') }}
</template>

<script setup lang="ts">
	import { ref, } from 'vue';
	import { Toast } from 'vant';
	import QrcodeVue from 'qrcode.vue';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();

	const iconCopy = `${window.staticPath}/static/svg/copy.svg`;
	const iconShowQrCode = `${window.staticPath}/static/svg/showQrCode.svg`;
	
	interface linkPageList {
		title: string;
		text: string;
		showCopyIcon: boolean;
		showQrcodeIcon: boolean;
	}
	const linkPageList = ref<Array<linkPageList>>([
		{ title:t('linkPage_02') , text:'https://tw.yahoo.com/' ,showCopyIcon:true ,showQrcodeIcon:true},
		{ title:t('linkPage_05') , text:'https://www.instagram.com/' ,showCopyIcon:true ,showQrcodeIcon:true},
		{ title:t('linkPage_03') , text:t('linkPage_04') ,showCopyIcon:false ,showQrcodeIcon:false},
		{ title:t('linkPage_06') , text:'https://www.facebook.com/' ,showCopyIcon:true ,showQrcodeIcon:true},
		{ title:t('linkPage_07') , text:'https://www.youtube.com/' ,showCopyIcon:true ,showQrcodeIcon:true},
		{ title:t('linkPage_08') , text:'https://www.wantgoo.com/' ,showCopyIcon:true ,showQrcodeIcon:true},
		{ title:t('linkPage_09') , text:'https://icook.tw/' ,showCopyIcon:true ,showQrcodeIcon:true},
		{ title:t('linkPage_10') , text:'7ND9' ,showCopyIcon:true ,showQrcodeIcon:false},
	])


	// Toast.setDefaultOptions({ duration: 9990000 });
	const showQrcode = ref(false);
	const showQrcodeLink = ref('');
	const showQrcodeTitle = ref('')
	const handleShowQrcode = (item:linkPageList) => {
		showQrcodeTitle.value = item.title
		showQrcodeLink.value = item.text
		showQrcode.value = true
	}
	const handleCopy = (value) => {
		const textArea = document.createElement('textarea');
		textArea.value = value || '';
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';
		// console.log("sds", value);

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		let success;
		try {
			success = document.execCommand('copy');
		} catch (e) {
			success = false;
		} finally {
			document.body.removeChild(textArea);
		}

		if (success) {
			Toast(t('linkPage_13'));
		} else {
			Toast('Fail');
		}
	};
	const downQrcode = () => {
		const canvas = document.getElementById('QRCODE');
		const link: HTMLAnchorElement = document.createElement('a');
		link.download = 'QRCODE.png';
		link.href = (canvas as HTMLCanvasElement)?.toDataURL();
		link.click();
		link?.parentNode?.removeChild(link);
		Toast(t('linkPage_14'));
	};
</script>
<style>
.black_light{
	background: #0F0F0F;
box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.7);
border-radius: 6px;
}

</style>