<template>
  <div class="<%= midLineName %>">
    {{mergeConfig.demo}}
  </div>
</template>

<script>

import ncadminCore from "ncadmin-core";

const { widgetMixin } = ncadminCore;

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