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
                  label: '关键字',
                  columns: 3
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
                type: "ajax",
                options: {
                  apiUrl: '/api/demo/delete',
                  method: 'post',
                  params: [{
                    name: 'id',
                    value: 'dx: {{$selected[e].id}}'
                  }],
                },
                refresh: 'current'
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
            apiUrl: '/api/demo/list',
            method: 'get',
            paramFields: {
              pageSize: 'pageSize',
              pageNum: 'pageNum',
              query: '',
            },
            otherParams: {
            },
            resField: {
              pageingTotal: 'page.total',
              list: 'data'
            },
          },

          // 是否全选
          selectAll: true,

          // 是否可配置显示列
          columnsConfigurable: false,

          // 数据列
          columns: [
            {
              header: '姓名',
              dataField: 'name',
            },
            {
              header: '头像',
              component: {
                name: 'nca-image',
                config: {
                  maxWidth: '80px'
                },
                value: 'dx: {{$item.photo}}'
              }
            },
          ],

          // 项操作
          actions: {
            delete: {
              handler: {
                type: "ajax",
                options: {
                  apiUrl: '/api/demo/delete',
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
