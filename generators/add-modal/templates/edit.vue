<template>
  <div class="<%= midLineName %>">
    <nca-edit-modal-inside :modal-id="modalId" :config="configData" :value="value"></nca-edit-modal-inside>
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
        formData: {
          isRemote: false,
        },
        formSchema: {
          // TODO 配置你的表单
        },
        buttons: {
          submit: {
            apiUrl: '',
            valueField: ''
          }
        }
      }

    };
  },

};
</script>

<style lang="scss">
.<%=midLineName %> {}
</style>
