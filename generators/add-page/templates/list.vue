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

        // 查询条件
        query: {
          normal: { // 普通搜索
            type: 'object',
            properties: {
              keyword: {
                type: 'string',
                ui: {
                  label: '关键字'
                }
              }
            },
            ui: {
              widgetConfig: {
                layout: 'h'
              }
            }
          },
        },

        // 工具栏
        toolbar: {

          // 批量操作
          batchActions: {
            delete: {
              handler: {
              }
            },
            others: [
            ]
          },

          // 其它操作
          tools: {
            new: {
              handler: {
              }
            },
            others: [
            ]
          }
        },

        // 显示列表
        list: {
          datasource: {
            apiUrl: '',
            method: 'get',
            paramFields: {
              pageSize: 'pageSize',
              pageNum: 'pageNum',
              query: '',
            },
            otherParams: {
            },
            resField: {
              pageingTotal: '',
              list: ''
            },
          },

          // 是否全选
          selectAll: true,

          // 是否可配置显示列
          columnsConfigurable: false,

          // 数据列
          columns: [
            {
              header: '列1',
              dataField: 'field1',
            },
            {
              header: '列2',
              component: {
                name: 'nca-label',
                config: {},
                value: '列2的值'
              }
            },
          ],

          // 项操作
          actions: {
            delete: {
              handler: {
                type: "ajax",
                options: {
                  apiUrl: '',
                  method: 'post',
                  params: [{
                    name: 'id',
                    value: 'dx: {{$item.id}}'
                  }],
                },
                refresh: 'current'
              }
            },
            view: {
              handler: {
              }
            },
            edit: {
              handler: {
              }
            },
            others: [ // 参考 Action Object config
            ]
          }
        },

        // 分页配置
        paging: {
          enable: true
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
