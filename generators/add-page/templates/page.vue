<template>
    <div class="<%= midLineName %>">
        {{msg}}
    </div>
</template>

<script>
export default {
  created() {
      
  },
  data() {
    return {
      msg: "hello world",
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.<%= midLineName %>{

}
</style>
