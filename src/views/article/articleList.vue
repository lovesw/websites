<template>
  <Table stripe :columns="columns" :data="data1" class="table"></Table>
</template>

<script>
  export default {
    name: 'articleList',
    data() {
      return {
        columns: [
          {title: '编号', key: 'id', align: 'center'},
          {title: '标题', key: 'title', align: 'center'},
          {title: '摘要', key: 'summary', align: 'center'},
          {title: '作者', key: 'author', align: 'center'},
          {
            title: '图片', key: 'image', align: 'center', render: (h, params) => {
              return h("img", {
                attrs: {
                  src: params.row.image
                },
                style: {
                  width: '50px',
                  height: '50px'
                }

              })
            }
          },
          {
            title: '文章连接', key: 'url', align: 'center', render: (h, params) => {
              return h("a", {
                attrs: {
                  href: params.row.url,
                  target: '_black'
                }
              }, params.row.url);


            }
          },
          {
            title: '类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              if (params.row.type === 1) {
                return h('span', '自主')
              } else {
                return h('span', '行业')
              }
            }
          },
          {title: '时间', key: 'date', align: 'center'},
          {
            title: '状态', key: 'status', align: 'center', render: (h, params) => {
              if (params.row.type === 1) {
                return h('span', '启用')
              } else {
                return h('span', '未启用')
              }
            }
          },
          {title: '操作', key: 'operate', align: 'center',},
        ],
        // 数据
        data1: []
      }
    },
    mounted: function () {
      this.$kit.ajax('get', 'article/listAll', {page: 1, size: 10, type: 1}, (res) => {
        this.data1 = res.data.data.data
      }, this)

    }
  }
</script>

<style scoped>

</style>
