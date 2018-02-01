<template>
  <div class="<%= midLineName %>">
      <nca-detail-modal-inside :modal-id="modalId" :config="configData" :value="value"></nca-detail-modal-inside>
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

      configData: {
        idField: 'id',
        source: {
          isRemote: false
        },
        detail: {
          properties: [
            // TODO: 这里配置你的详情信息
          ]
        }
      }

    };
  },

};
</script>

<style lang="scss">
.<%=midLineName %> {}
</style>
