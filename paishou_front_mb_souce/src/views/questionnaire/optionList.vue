<template lang="pug">
//- 選項列表
.grid.grid-cols-1.gap-4.items-stretch
    //- 選項物件
    option-item(
        v-for='(item, index) in list'
        :item='item'
        :index='index'
        :answers='answers'
        :question-type='questionType'
        @update:answers='updateAnswers'
    )
</template>
<script>
import optionItem from '@/views/questionnaire/optionItem.vue';

export default {
	components: {
		optionItem,
	},
	props: {
		list: Array,
		answers: Object,
		questionType: Number,
	},
	emits: ['update:answers'],
	setup(props, { emit }) {
		// Update answers
		const updateAnswers = (answers) => {
			emit('update:answers', answers);
		};
		return {
			updateAnswers,
		};
	},
};
</script>
