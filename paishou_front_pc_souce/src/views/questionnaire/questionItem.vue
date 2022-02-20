<template lang="pug">
//- 問題物件
.FLEX_C.items-stretch(v-if='visible', :class='$attrs.class')
	//- 編號
	.text-4xl.text-center.text-index.font-bold {{ index }}

	//- 問題
	.text-4xl.text-center.text-question.font-bold.mt-2 {{ question }}
	
	//- 選項列表
	option-list.mt-8(
		v-if='selectionTypeQuestion'
		:list='options'
		:answers='answers'
		:question-type='questionType'
		@update:answers='updateAnswers'
	)

	//- 輸入框
	a-input.mt-8(
		v-if='inputTypeQuestion'
		:value='note'
		placeholder='请填写'
		@update:value='updateNote'
	)

	//- 間距(使按鈕置底)
	.flex-grow

	//- 按鈕列表
	.self-center.grid.gap-4.justify-center.items-center.mt-28(:class='prevVisible ? "grid-cols-2" : "grid-cols-1"')
		//- 上一步
		a-button.w-auto.h-auto.px-16.py-4.rounded-full.bg-transparent.border-prev(v-if='prevVisible', type='link', @click='clickPrev')
			.text-2xl.text-prev.font-bold 上一步

		//- 下一步
		a-button.w-auto.h-auto.px-16.py-4.rounded-full.bg-next.border-transparent(v-if='nextVisible', type='link', :disabled='nextDisabled', @click='clickNext')
			.text-2xl.text-white.font-bold 下一步

		//- 完成
		a-button.w-auto.h-auto.px-16.py-4.rounded-full.bg-finish.border-transparent(v-if='finishVisible', type='link', :disabled='finishDisabled', :loading='postLoading', @click='clickFinish')
			a-spin(v-if='postLoading')
			.text-2xl.text-white.font-bold(v-else) 完成

	//- 頁數
	.text-base.text-center.text-page.font-bold.mt-6
		span {{ index }}
		span.mx-1 /
		span {{ length }}
</template>
<script>
import { computed } from 'vue';
import optionList from '@/views/questionnaire/optionList.vue';

export default {
	components: {
		optionList,
	},
	props: {
		item: Object,
		index: Number,
		length: Number,
		currentIndex: Number,
		postLoading: Boolean,
	},
	emits: ['click-finish', 'update:answers', 'update:current-index'],
	setup(props, { emit }) {
		// Index
		const index = computed(() => {
			const origin = props?.index || 0;
			const plus = origin + 1;
			const format = plus < 10 ? `0${plus}` : plus;
			return format;
		});

		// Question
		const question = computed(() => {
			return props?.item?.question || '';
		});

		// Question type
		const questionType = computed(() => {
			return props?.item?.question_type || -1;
		});

		// Selection type question
		const selectionTypeQuestion = computed(() => {
			return questionType.value === 1 || questionType.value === 2;
		});

		// Input field type question
		const inputTypeQuestion = computed(() => {
			return questionType.value === 3;
		});

		// Options
		const options = computed(() => {
			return props?.item?.options || '';
		});

		// Answers
		const answers = computed(() => {
			return props?.item?.answers || [];
		});

		// Note value
		const note = computed(() => {
			const answer = answers.value[0];
			return answer?.note || '';
		});

		// Question visible
		const visible = computed(() => {
			return props?.currentIndex === props?.index;
		});

		// Previous buttion visible
		const prevVisible = computed(() => {
			return props?.index > 0;
		});

		// Next buttion visible
		const nextVisible = computed(() => {
			return props?.index < props?.length - 1;
		});

		// Next button disabled
		const nextDisabled = computed(() => {
			return !props?.item?.answers || props?.item?.answers?.length === 0;
		});

		// Finish buttion visible
		const finishVisible = computed(() => {
			return props?.index === props?.length - 1;
		});

		// Finish button disabled
		const finishDisabled = computed(() => {
			return !props?.item?.answers || props?.item?.answers?.length === 0;
		});

		// Length
		const length = computed(() => {
			return props?.length < 10 ? `0${props?.length}` : props?.length;
		});

		// Update answers
		const updateAnswers = (answers) => {
			emit('update:answers', props?.index, answers);
		};

		// Update note
		const updateNote = (note) => {
			const options = props?.item?.options || [];
			const firstOption = options[0] || {};
			const optionId = firstOption?.id || 0;
			const answer = {
				option_id: optionId,
				note: note,
			};
			const answers = !note || note.length === 0 ? [] : [answer];
			emit('update:answers', props?.index, answers);
		};

		// Click prev button
		const clickPrev = () => {
			emit('update:current-index', props?.index - 1);
		};

		// Click next button
		const clickNext = () => {
			emit('update:current-index', props?.index + 1);
		};

		// Click finish button
		const clickFinish = () => {
			emit('click-finish');
		};
		return {
			index,
			question,
			questionType,
			selectionTypeQuestion,
			inputTypeQuestion,
			options,
			answers,
			note,
			visible,
			prevVisible,
			nextVisible,
			nextDisabled,
			finishVisible,
			finishDisabled,
			length,
			updateAnswers,
			updateNote,
			clickPrev,
			clickNext,
			clickFinish,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-index {
	color: #a62337;
}
.text-question {
	color: #323232;
}
.border-prev {
	border: 1px solid #a62337;
}
.text-prev {
	color: #a62337;
}
.bg-next {
	background: linear-gradient(90deg, #a62337 0%, #d10828 100%);
}
.bg-finish {
	background: linear-gradient(90deg, #a62337 0%, #d10828 100%);
}
.text-page {
	color: #a62337;
}
</style>
