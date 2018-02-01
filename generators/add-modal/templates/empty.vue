<template>
  <div class="<%= midLineName %>">
    {{mergeConfig.demo}}
  </div>
</template>

<script>

import ncAdminCore from 'ncadmin-core';
const { modalInsideMixin } = ncAdminCore;

export default {

  mixins: [modalInsideMixins],

  /* ====================== 数据绑定 ====================== */

  data() {
    return {
      defaultConfig: {
        demo: '<%= midLineName %>'
      }
    };
  },

  methods: {

    // 点击确认按钮事件处理（请务必在正确处理完逻辑后调用done()）
    _confirmHandler(done) {
      done();
    },

    // 其它自定义按钮事件处理
    _btnsEventHandler(config) {
      switch (config.eventName) {
        default:
          this._closeModal();
      }
    },
  }

};
</script>

<style lang="scss">
.<%=midLineName %> {}
</style>
