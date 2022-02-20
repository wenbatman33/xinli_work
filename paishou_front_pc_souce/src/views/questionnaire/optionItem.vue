<template lang="pug">
//- 選項物件
a-button.w-auto.h-auto.px-8.py-4.rounded-optionshadow-option.bg-white.border-transparent(type='link', @click='clickItem')
    //- 物件內容
    .grid.grid-cols-option.gap-2.items-center
        //- 選取圖示
        img.w-6.h-6(v-if='checked', src='/publicAssets/img/questionnaire/icon-checked@3x.png')

        //- 未選取圖示
        img.w-6.h-6(v-else, src='/publicAssets/img/questionnaire/icon-uncheck@3x.png')

        //- 編號
        .text-lg.text-index.font-bold {{ index }}

        //- 標題
        .text-lg.text-title.font-bold {{ title }}

        //- 備註
        a-input.col-span-3(
			v-if='noteVisible'
			:value='note'
			ref='noteDom'
			placeholder='请填写'
			@click.stop='clickNote'
			@update:value='updateNote'
		)
</template>
<script>
import { ref, computed } from 'vue';
export default {
	props: {
		item: Object,
		index: Number,
		answers: Object,
		questionType: Number,
	},
	emits: ['update:answers'],
	setup(props, { emit }) {
		// Note input field dom
		const noteDom = ref(null);

		// Checked
		const checked = computed(() => {
			return props?.answers?.findIndex((answer) => answer.option_id === props?.item?.id) >= 0;
		});

		// Index
		const index = computed(() => {
			const ind = props?.index || 0;
			const letters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
			return letters[ind] || ind;
		});

		// Title
		const title = computed(() => {
			return props?.item?.item || '';
		});

		// Note value
		const note = computed(() => {
			return props?.answers?.find((answer) => answer.option_id === props?.item?.id)?.note || '';
		});

		// Note visible
		const noteVisible = computed(() => {
			return props?.item?.item_type === 2 || props?.item?.item_type === 3;
		});

		// Update answer
		const updateAnswers = (note, noCancel) => {
			const answer = {
				option_id: props?.item?.id,
				note: note,
			};
			const questionType = props?.questionType || -1;
			const answers = props?.answers || [];
			const selected = answers.findIndex((answer) => answer.option_id === props?.item?.id) >= 0;

			// Single selection
			if (questionType === 1) {
				emit('update:answers', [answer]);
			}

			// Mutiple selection & selected & no cancel
			else if (questionType === 2 && selected && noCancel) {
				emit(
					'update:answers',
					answers.map((oldAnswer) => {
						if (oldAnswer.option_id === props?.item?.id) {
							return answer;
						} else {
							return oldAnswer;
						}
					})
				);
			}

			// Mutiple selection & selected & cancellable
			else if (questionType === 2 && selected && !noCancel) {
				emit(
					'update:answers',
					answers.filter((answer) => answer.option_id !== props?.item?.id)
				);
			}

			// Mutiple selection & unselected
			else if (questionType === 2 && !selected) {
				emit('update:answers', [...answers, answer]);
			}
			if (noteVisible.value) {
				noteDom.value.focus();
			}
		};

		// Click item
		const clickItem = (e) => {
			if (e.offsetX !== 0 && e.offsetY !== 0) {
				updateAnswers(note.value, false);
			}
		};

		// Click note
		const clickNote = () => {
			updateAnswers(note.value, true);
		};

		// Update note
		const updateNote = (note) => {
			updateAnswers(note, true);
		};
		return {
			noteDom,
			checked,
			index,
			title,
			note,
			noteVisible,
			clickItem,
			clickNote,
			updateNote,
		};
	},
};
</script>
<style lang="scss" scoped>
.rounded-option {
	border-radius: 6px;
}
.shadow-option {
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
}
.grid-cols-option {
	grid-template-columns: auto auto 1fr;
}
.text-index {
	color: #969696;
}
.text-title {
	color: #323232;
}
</style>
