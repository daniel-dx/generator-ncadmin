<template>
  <div class="<%= midLineName %>">
    {{mergeConfig.demo}}
  </div>
</template>

<script>

import ncadminCore from "@danieldx/ncadmin-core";

const { widgetMixin } = ncadminCore;

/**
 * 可通过this.$emit('notify-submit')通知提交数据事件
 */
export default {

  mixins: [widgetMixin],

  /* ====================== 生命周期 ====================== */

  created() {

  },

  /* ====================== 数据绑定 ====================== */

  data() {
    return {
      defaultConfig: {
        demo: 'demo'
      }
    }
  },

  /* ====================== 事件处理 ====================== */

  methods: {

  }
}
</script>

<style lang="scss">
.<%=midLineName %> {}
</style>
