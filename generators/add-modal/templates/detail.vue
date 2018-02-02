<template>
  <div class="<%= midLineName %>">
    <nca-detail-modal-inside :modal-id="modalId" :config="configData" :value="value"></nca-detail-modal-inside>
  </div>
</template>

<script>

import ncadminCore from 'ncadmin-core';
const { modalInsideMixin } = ncadminCore;

export default {

  mixins: [modalInsideMixin],

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
            {
              label: "姓名",
              value: "dx: {{$root.name}}",
              columns: 6
            },
            {
              label: "头像",
              value: "dx: {{$root.photo}}",
              widget: "nca-image",
              widgetConfig: {
                maxWidth: '80px'
              }
            },
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
