<template lang="pug">
//- 問題列表
.flex.flex-col.items-stretch.pt-10.pb-12.px-6(:class='$attrs.class')
    //- 加載中
    .text-base.text-center.text-message(v-if='state.questionListLoading') 加载中

    //- 目前沒有紀錄
    .text-base.text-center.text-message(v-else-if='questionListEmpty') 目前没有纪录

    //- 問題列表
    .flex.flex-col.items-stretch.flex-grow(v-else)
        question-item.flex-grow(
            v-for='(item, index) in state.questionList'
            v-model:current-index='state.currentIndex'
            :item='item'
            :index='index'
            :length='questionListLength'
            :post-loading='state.postLoading'
            @click-finish='clickFinish'
            @update:answers='updateAnswers'
        )
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { questionnaire, questionnairePost } from '@/api';
import questionItem from '@/views/questionnaire/questionItem.vue';

export default {
	components: {
		questionItem,
	},
	setup() {
        // Vuex store
        const store = useStore();

		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Component state
		const state = reactive({
			postLoading: false,
			questionListLoading: false,
			currentIndex: 0,
			questionnaireId: 0,
			questionList: [],
		});

		// Question list empty
		const questionListEmpty = computed(() => {
			return !state.questionList || state.questionList.length === 0;
		});

		// Question list length
		const questionListLength = computed(() => {
			if (questionListEmpty.value) {
				return 0;
			} else {
				return state.questionList.length;
			}
		});

		// Get question list
		const getQuestionList = () => {
            // Check login status
			if (!store.getters['user/IS_LOGIN']) {
		        window.localStorage.setItem('tempUrl', `/questionnaire/question/list/${route.params.id}`);
                router.push('/login');
                return;
            }

			// Update loading state
			state.questionListLoading = true;

			// Get query
			const query = {
				questionnaire_id: route.params.id,
			};

			// Get questionnaire
			questionnaire(query)
				.then((res) => {
					// Revert loading state on finished
					state.questionListLoading = false;

					// Update current index
					state.currentIndex = 0;

					// Update questionnaire id
					state.questionnaireId = res?.data?.id || -1;

					// Update question list
					state.questionList = res?.data?.questions || [];
				})
				.catch((reason) => {
					// Revert loading state on error
					state.questionListLoading = false;
				});
		};

		// Update answers
		const updateAnswers = (index, answers) => {
			const question = state.questionList[index] || {};
			question.answers = answers;
		};

		// Click finish button
		const clickFinish = () => {
			// Update loading state
			state.postLoading = true;

			// Post body
			const answers = [];
			for (var i = 0; i < state.questionList.length; i++) {
				const question = state.questionList[i];
				const questionId = question.id || -1;
				const questionAnswers = question.answers || [];
				for (var j = 0; j < questionAnswers.length; j++) {
					const questionAnswer = questionAnswers[j] || {};
					answers.push({
						...questionAnswer,
						question_id: questionId,
					});
				}
			}
			const body = {
				questionnaire_id: state.questionnaireId,
				answers: answers,
			};

			// Post questionnaire
			questionnairePost(body)
				.then((res) => {
					// Revert loading state on finished
					state.postLoading = false;

					// Validate response code
					if (res?.code === 0) {
						router.replace('/questionnaire/finish');
					}
				})
				.catch(() => {
					// Revert loading state on error
					state.postLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getQuestionList();
		});
		return {
			state,
			questionListEmpty,
			questionListLength,
			updateAnswers,
			clickFinish,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-message {
	color: #191919;
}
</style>
