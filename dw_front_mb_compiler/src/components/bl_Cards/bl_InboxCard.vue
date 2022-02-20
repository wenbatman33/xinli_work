<template lang="pug">
  .inbox(v-if="Inbox !== undefined")
    .inbox__header 消息内容
      i.far.fa-trash-alt(@click="del")
    .inbox__main
      .inbox__main__title
        | {{ Inbox.inboxTitle }}
      .inbox__main__time {{ Inbox.inboxUpdatedAt }}
      .inbox__main__content(v-html='Inbox.inboxContent')
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    del() {
      const payload = {};
      payload.id = this.ActiveInbox;
      payload.status = 2;
      this.$store.dispatch('member/API_MemberModifyInbox', payload).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$store.dispatch('index/setCardOpen', false);
          this.$store.dispatch('index/setCardName', '');
          this.$store.dispatch('member/API_MemberInbox');
        }
      });
    }
  },
  computed: {
    ...mapState('member', [
      'IndexInbox',
      'ActiveInbox',
    ]),
    Inbox() {
      return this.IndexInbox.filter((element) => {
        return element.id === this.ActiveInbox
      })[0];
    },
  }
}

</script>
<style lang="scss" scoped>
.inbox {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;

    i {
      position: absolute;
      right: $width-24;
      color: $origin;
    }
  }

  &__main {
    flex: 1;
    overflow: auto;
    padding: $height-32 $width-24;

    &__title {
      color: $navy_dark;
      font-size: $text-16;
      margin-bottom: $height-16;
    }

    &__time {
      color: $origin;
      font-size: $text-14;
      margin-bottom: $height-12;
    }

    &__content {
      color: $origin_dark;
      font-size: $text-16;
    }
  }
}
</style>

