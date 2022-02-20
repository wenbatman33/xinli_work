<template lang="pug">
  #register
    PhoneRegisterSuccess(v-if="RegisterSuccess === 'phone'")
    AccountRegisterSuccess(v-else-if="RegisterSuccess === 'account'")
    Register(v-else)
</template>

<script>
import { mapState } from 'vuex';
import Register from '@/components/bl_Register/bl_Register.vue';
import PhoneRegisterSuccess from '@/components/bl_Register/bl_PhoneRegisterSuccess.vue';
import AccountRegisterSuccess from '@/components/bl_Register/bl_AccountRegisterSuccess.vue';

export default {
  components: {
    Register,
    PhoneRegisterSuccess,
    AccountRegisterSuccess,
  },
  computed: {
    ...mapState('member', [
      'RegisterSuccess',
    ]),
  }
};
</script>
