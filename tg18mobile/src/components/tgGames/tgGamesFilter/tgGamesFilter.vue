<template lang='pug'>
	section
		.gamefilter
			.filter_close
			div(v-for='(group, groupIndex) in gameTagGroup')
				span {{group.GroupName}}:
				ul
					li(v-for='(game, index) in gameTagList' v-if='game.GroupId == group.GroupId' @click="filteredTags(game.GroupId, game.Sn)" :class="filterActive(game.GroupId, game.Sn)=== true ? 'active' : ''") {{ game.TagName }}
			form
				.gamefilter_btn(@click="reset") 重设
			form
				.gamefilter_btn.gamefilter_active(@click="submitFilter") 确认
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      filteredTagsArray: [],
      showDetails: false,
      filterHandle: false,
      gameFilterResultInit: false,
    };
  },
  computed: {
    ...mapState('game', [
      'currentGroupId',
      'currentGameType',
      'currentGameTypeName',
      'gameTagGroup',
      'gameTagList',
      'gameFilterResult',
      'gameFilterShow',
    ]),
    getGameTagList() {
      return this.$store.state.game.gameTagList;
    },
    getGameFilterResult() {
      return this.$store.state.game.gameFilterResult;
    },
    getGameFilterShow() {
      return this.$store.state.game.gameFilterShow;
    },
  },
  watch: {
    $route(to, from) {
      this.init();
      this.filteredTagsArray.length = 0;
      this.showDetails = false;
      this.gameFilterResultInit = false;
    },
  },
  methods: {
    filteredTagsArrayInit() {
      const vm = this;
      this.gameFilterResultInit = true;
      this.filteredTagsArray = [];
      _.forEach(this.gameTagGroup, (value, index) => {
        const newObject = {};
        newObject.GroupID = value.GroupId;
        newObject.FilterCondition = [];
        vm.filteredTagsArray.push(newObject);
      });
    },
    filteredTags(GroupId, Sn) {
      this.filterHandle = true;
      const index = Number(GroupId) - 1;
      if (this.gameFilterResultInit === false) {
        this.filteredTagsArrayInit();
      }
      if (_.includes(this.filteredTagsArray[index].FilterCondition, Sn)) {
        const temp = this.filteredTagsArray[index].FilterCondition.indexOf(Sn);
        if (temp !== -1) this.filteredTagsArray[index].FilterCondition.splice(temp, 1);
      } else {
        this.filteredTagsArray[index].FilterCondition.push(Sn);
      }
    },
    filterActive(GroupId, Sn) {
      if (this.gameFilterResultInit === false) {
        this.filteredTagsArrayInit();
      }
      const index = Number(GroupId) - 1;
      if (this.filteredTagsArray[index].FilterCondition.indexOf(Sn) >= 0) {
        return true;
      }
      return false;
    },
    submitFilter() {
      this.$store.commit('game/setFilteredTags', this.filteredTagsArray);
      this.$store.state.game.gameFilterShow = false;
    },
    reset() {
      this.filterHandle = false;
      this.filteredTagsArrayInit();
      this.$store.commit('game/setFilteredTags', this.filteredTagsArray);
    },
    init() {
      const tagGroupPayload = {};
      tagGroupPayload.TagType = '0';
      tagGroupPayload.Status = 1;
      const gameTagListPayload = {};
      gameTagListPayload.Status = 1;
      this.$store.dispatch('game/API_GameTagGroup', tagGroupPayload);
      this.$store.dispatch('game/API_GameTagList', gameTagListPayload);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
	
</style>
