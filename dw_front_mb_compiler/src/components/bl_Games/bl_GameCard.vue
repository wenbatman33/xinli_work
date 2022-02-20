<template lang="pug">
  .gamesCard
    .gamesCard__img(@click="playGame(game)" :style="{backgroundImage: 'url(' + game.images + ')'}")
    .gamesCard__title
      span {{ game.gameName }}
      i.fab.fa-gratipay(@click="addLikeList(game.id)" :class="{'active': like}")
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['game', 'gameInfo'],
  data() {
    return {
      like: false,
      loginForm: {
        params: {
          device: 2,
          game_group_id: 0,
          game_id: 0,
          force_login: 0,
        },
      },
    };
  },
  methods: {
    playGame(game) {
      const payload = {
        gameType: this.GameType[0],
        gameName: this.game.gameName,
        gameInfo: {
          gameGroupStatus: this.gameInfo[0].gameGroupStatus,
          gamePlayMode: 1,
          gameOpenMode: this.gameInfo[0].gameOpenMode,
          id: this.gameInfo[0].id,
        }
      };
      this.loginForm.params.game_group_id = this.game.gameGroupId;
      this.loginForm.params.game_id = this.game.id;
      payload.loginForm = this.loginForm;
      this.$store.dispatch('games/GameLogin', payload);
    },
    addLikeList(id) {
      if (!this.like) {
        this.$store.dispatch('games/API_AddGameLikeRecord', { game_id: id }).then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            this.like = true;
            this.$store.dispatch('games/API_IndexLikeGameList', {
              params: {
                device: 1,
                game_group_id: this.$route.query.groupid,
              },
            });
          }
        });
      } else {
        this.$store.dispatch('games/API_DeleteGameLikeRecord', id).then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            this.like = false;
            this.$store.dispatch('games/API_IndexLikeGameList', {
              params: {
                device: 1,
                game_group_id: this.$route.query.groupid,
              },
            });
          }
        });
      }
    },
  },
  computed: {
    ...mapState('games', [
      'GameType',
    ]),
  },
  mounted() {
    if (this.game.gameLikeId === 0) {
      this.like = false;
    } else {
      this.like = true;
    }
  },
  created() {
    this.loginForm.params.game_group_id = this.$route.query.groupid;
  },
};
</script>

<style lang="scss" scoped>
.gamesCard {
  width: 156px;
  display: flex;
  flex-direction: column;
  margin-bottom: $height-16;

  &__img {
    height: 102px;
    border-radius: 4px;
    background-size: cover;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.active {
  color: red;
}
</style>
