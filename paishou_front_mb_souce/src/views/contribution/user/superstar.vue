<template lang="pug">
//- 排行榜-用戶-超級明星
//- 下拉刷新
van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
    .contribution-user-superstar
        //- 報表類型選擇
        type-picker(icon='/publicAssets/img/contribution/star-g40@3x.png', title='超级明星榜', :selected='state.type', @update:selected='updateType')
        
        //- 貢獻榜列表
        contribution-list.mt-4(:list='state.contributionList', type='user', path='superstar')
</template>
<script>
import { reactive, onMounted } from 'vue';
import { contributionUserSuperstar } from '@/api';
import typePicker from '@/components/contribution/typePicker.vue';
import contributionList from '@/components/contribution/contributionList.vue';

export default {
    components: {
        typePicker,
        contributionList,
    },
    setup() {
        // Component state
        const state = reactive({
            isLoading: false,
            type: 'week',
            contributionList: [],
        });

        // 取得排行榜列表
        const getContributionList = () => {
            // Update loading state
            state.isLoading = true;

            // Get contribution list 
            contributionUserSuperstar({
                type: state.type,
            }).then((res) => {
                // Update contribution list
                state.contributionList = res?.data?.list || [];

                // Update loading state on finished
                state.isLoading = false;
            }).catch(() => {
                // Update loading state on error
                state.isLoading = false;
            });
        };

        // 下拉刷新
        const refresh = () => {
            getContributionList();
        };

        // 更新選擇的報表類型
        const updateType = (type) => {
            state.type = type;
            getContributionList();
        };

        // On component mounted
        onMounted(() => {
            getContributionList();
        });
        return {
            state,
            refresh,
            updateType,
        };
    },
}
</script>
<style lang="scss" scoped>
.contribution-user-superstar {
    width: 100%;
}
</style>