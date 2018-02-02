<template>
  <div class="<%= midLineName %>">
    <detail :config="config"></detail>
  </div>
</template>

<script>
import detail from "common/components/detail-page.vue";
export default {
  components: { detail },
  data() {
    return {
      config: {
        title: '查看详情',
        idField: 'id',
        source: {
          apiUrl: '/api/demo/detail',
          params: [{
            name: 'id',
            value: 'dx: {{$id}}'
          }],
          resField: ''
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.<%=midLineName %> {}
</style>