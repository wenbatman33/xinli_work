<template lang="pug">
  .container-fluid
    date-table(v-show="! date", @time="changeTimeTable")
    time-table(v-if="date", v-show="! game", :date="date", @game="changeGameTable", @close="date = ''")
    game-table(v-if="game", :date="date", :game="game", :gameTitle="gameTitle", @close="closeGameTable()", @home="closeGameAndTimeTable()")
</template>

<script>
const table = require.context('./table', true, /\.vue$/i);

export default {
  components: table.keys().reduce((result, key) => {
      result[key.split('/').pop().split('.')[0]] = table(key).default
      return result;
    }, {}),
  data() {
    return {
      date: '',
      game: '',
      gameTitle: ''
    }
  },
  created() {

  },
  methods: {
    changeTimeTable(date) {
      this.date = date;
    },
    changeGameTable(game, gameTitle) {
      this.game = game;
      this.gameTitle = gameTitle;
    },
    closeGameTable() {
      this.game = '';
      this.gameTitle = '';
    },
    closeGameAndTimeTable() {
      this.date = '';
      this.closeGameTable();
    }
  }
}
</script>
