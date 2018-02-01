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
      msg: "<%= midLineName %>",
    }
  }
};
</script>

<style lang="scss">
.<%= midLineName %>{

}
</style>
