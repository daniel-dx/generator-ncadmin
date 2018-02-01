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
        // 填写配置，
        // 规范: http://gitlab.tools.vipshop.com/daniel.xiao/admin-terminator/blob/master/view-detail-config.md
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.<%= midLineName %>{

}
</style>