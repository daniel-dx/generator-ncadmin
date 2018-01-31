<template>
  <div class="<%= midLineName %>">
    <%= midLineName %>
  </div>
</template>

<script>
import ncAdminCore from 'ncadmin-core'
const eventHub = ncAdminCore.eventHub;
const { ncformUtils } = ncAdminCore.ncformCommon;

export default {
  components: {},
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    },
    // 与弹窗通信的事件名。由弹窗随机生成。
    modalId: {
      type: String
    }
  },
  created() {
    // 统一监听事件，通过eventName区分事件。
    // `fromModal_${this.modalId}` 为modal触发的事件。
    // `toModal_${this.modalId}` 为modal接收的事件。
    eventHub.$on(`fromModal_${this.modalId}`, config => {
      switch (config.eventName) {
        case "modalConfirm":
          break;
      }
    });
  },
  data() {
    return {};
  },
  computed: {},
  destroyed() {
    eventHub.$off(`fromModal_${this.modalId}`);
  },
  methods: {},
  watch: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.<%= midLineName %> {

}
</style>
