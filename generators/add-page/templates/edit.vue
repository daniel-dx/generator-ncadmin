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
        title: '',
        idField: 'id',
        formData: {
          apiUrl: '',
          params: [
            {
              name: 'id',
              value: 'dx: {{$id}}'
            }
          ],
          resField: ''
        },
        formSchema: {
          type: 'object',
          properties: {
            // TODO 请在这里填写表单配置
          }
        },
        buttons: {
          submit: { // 提交
            apiUrl: '', // 提交的Url
            valueField: '', // 当为空时，即表单的每个一级字段即为参数名
          }
        }
      }
    };
  }
};
</script>

<style lang="scss">
.<%=midLineName %> {}
</style>
