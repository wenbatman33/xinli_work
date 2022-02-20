<template lang="pug">
  component(
    v-if="openEvent",
    :is="openEvent",
    @back="openEvent = null",
    :buttonPerms="buttonPerms",
    :fieldPerms="fieldPerms",
    :blockPerms="blockPerms",
  )
  .container-fluid(v-else)
    .row
      .col-4(v-for="(event, index) in eventList", :key="index")
        el-card.c-pointer(shadow="hover", @click.native="enterEvent(event.component)")
          h2 {{ event.title }}
          .text-secondary(v-if="event.url") 活动网址： {{ event.url }}

</template>

<script>
import { getEnv } from '@/config/server.js';
const taskDetail =  require.context('./events', true, /\.vue$/i);

export default {
  components: taskDetail.keys().reduce((result, key) => {
    result[key.split('/').pop().split('.')[0]] = taskDetail(key).default
    return result;
  }, {}),
  data() {
    return {
      openEvent: null,
      eventList: [
        {
          title: '召唤大神',
          url: this.getEventUrl('0001'),
          component: 'event0001',
        },
        {
          title: '代理线下活动',
          url: '',
          component: 'event0002',
        },
      ],
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  methods: {
    enterEvent(componentName) {
      this.openEvent = componentName;
    },

    getEventUrl(id) {
      return {
        '0001': {
          develop: 'https://test.tgcity18.com/event/20200201',
          stage: 'https://stage.tgcity18.com/event/20200201',
          production: 'https://www.dw310.com/event/20200201',
        },
      }[id][getEnv()];
    }
  },
}
</script>
