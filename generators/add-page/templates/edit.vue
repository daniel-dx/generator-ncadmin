<template>
  <div class="<%= midLineName %>">
    <edit-page :config="config"></edit-page>
  </div>
</template>

<script>
import editPage from "common/components/edit-page.vue";

export default {

  components: {
    editPage
  },

  data() {
    return {
      config: {
        title: '标题',
        idField: 'id',
        formData: {
          apiUrl: '/api/demo/detail',
          params: [
            {
              name: 'id',
              value: 'dx: {{$id}}'
            }
          ],
          resField: ''
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
          submit: { // 提交
            apiUrl: '/api/demo/save', // 提交的Url
            valueField: '', // 当为空时，即表单的每个一级字段即为参数名
          }
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.<%=midLineName %> {}
</style>
