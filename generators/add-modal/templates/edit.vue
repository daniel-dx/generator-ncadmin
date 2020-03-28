<template>
  <div class="<%= midLineName %>">
    <nca-edit-modal-inside :modal-id="modalId" :config="configData" :value="value"></nca-edit-modal-inside>
  </div>
</template>

<script>

import ncadminCore from '@danieldx/ncadmin-core';
const { modalInsideMixin } = ncadminCore;

export default {

  mixins: [modalInsideMixin],

  /* ====================== 数据绑定 ====================== */

  data() {
    return {

      configData: {
        idField: 'id',
        formData: {
          isRemote: false,
        },
        formSchema: {
          type: "object",
          properties: {
            id: {
              type: "number",
              ui: {
                hidden: true
              }
            },
            name: {
              type: "string",
              ui: {
                label: "姓名"
              }
            },
            photo: {
              type: "string",
              ui: {
                label: "头像",
                preview: {
                  type: 'image'
                },
                widgetConfig: {
                  type: 'file',
                  upload: {
                    uploadUrl: "http://houyi-api-admin.vip.vip.com/adminII.php/Pic/upLoadPic",
                    resField: "data.data.url",
                    fileField: "pic",
                    accept: ".jpg"
                  }
                }
              }
            }
          }
        },
        buttons: {
          submit: {
            apiUrl: '/api/demo/save',
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
