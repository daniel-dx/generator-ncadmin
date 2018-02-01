<template>
  <div class="<%= midLineName %>">
    <list-page :config="config" :storeValueName="storeValueName"></list-page>
  </div>
</template>

<script>
import listPage from "common/components/list-page.vue";

export default {
  components: {
    listPage
  },
  data() {
    return {
      storeValueName: "<%= moduleCamelName %>.<%= camelName %>Value",

      config: {

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
