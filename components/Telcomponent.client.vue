<script>
import { VueTelInput } from 'vue-tel-input';

export default {
  components: {
    VueTelInput,
  },
};

</script>

<template>
  <vue-tel-input
    v-model="value"
    default-country="vn"
    :input-options="props?.inputOptions"
  />
</template>
