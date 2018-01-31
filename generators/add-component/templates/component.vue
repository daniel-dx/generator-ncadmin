<template>
  <div class="<%= midLineName %>">
    <%= midLineName %>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    sayHi() {
      alert('hi, this is the demo component');
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.<%= midLineName %>{

}
</style>