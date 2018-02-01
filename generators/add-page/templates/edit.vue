<template>
    <div class="<%= midLineName %>">
        <edit-page :config="config"></edit-page>
    </div>
</template>

<script>
import editPage from "common/components/edit-page.vue";

export default {
  data() {
    return {
      config: {
        
      }
    };
  },

  components: {
    editPage
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.<%= midLineName %>{

}
</style>
