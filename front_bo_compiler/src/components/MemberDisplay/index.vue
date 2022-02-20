<template lang="pug">
  el-tooltip(v-if="groups.length")
    div(slot="content")
      el-tag.m-1(v-for="(group, index) in groups", :key="index") {{ group }}
    router-link(:to="{ path: '/memberDetail', query: { title: memberName, id: memberId } }") {{ memberName }}
  router-link(v-else-if="memberId", :to="{ path: '/memberDetail', query: { title: memberName, id: memberId } }") {{ memberName }}
  span(v-else) {{ memberName }}
</template>

<script>
export default {
  props: {
    memberId: {
      required: true
    },
    memberName: {
      type: String,
      default: '查无玩家'
    },
    groups: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
}

</script>
