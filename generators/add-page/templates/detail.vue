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
        title: '', 
        idField: 'id',
        source: { 
          apiUrl: '', 
          params: [{ 
            name: 'id',
            value: 'dx: {{$id}}'
          }],
          resField: 'data'
        },
        detail: {
          properties: [ 
            // TODO 填写你的详情页配置信息
          ]
        }
      }
    };
  }
};
</script>

<style lang="scss">
.<%=midLineName %> {

}
</style>