<template>
  <div id="333" class="testDiv">
    <div class="navDiv">
      <el-menu class="el-menu-demo" mode="horizontal">
        <template v-for="data in tableData">
          <el-menu-item
            v-if="data.children == null || data.children.length == 0"
            :index="data.id"
            :key="data.id"
          >
            <menuItemForEl :data="data" />
          </el-menu-item>
          <el-submenu v-else :index="data.id" :key="data.id">
            <template slot="title">
              <menuItemForEl :data="data" />
            </template>
            <menuListForEl v-for="child in data.children" :key="child.id" :data="child" />
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="content">456</div>
  </div>
</template>

<script>
import menuListForEl from "../components/MenuListForEl.vue";
import menuItemForEl from "../components/MenuItemForEl.vue";
export default {
  components: {
    menuListForEl,
    menuItemForEl,
  },
  name: "navView",
  data() {
    return {
      tableData: [
        {
          id: "1",
          label: "处理中心",
          layer:1
        },
        {
          id: "2",
          label: "我的工作台",
          layer:1,
          children: [
            {
              id: "21",
              label: "选项1",
            },
            {
              id: "22",
              label: "选项2",
            },
            {
              id: "23",
              label: "选项3",
              children: [
                {
                  id: "231",
                  label: "选项3-1",
                },
                {
                  id: "232",
                  label: "选项3-2",
                  children: [
                    {
                      id: "2321",
                      label: "选项3-2-1",
                    },
                    {
                      id: "2322",
                      label: "选项3-2-2",
                    },
                    {
                      id: "2323",
                      label: "选项3-2-3",
                    },
                  ],
                },
                {
                  id: "233",
                  label: "选项3-3",
                },
              ],
            },
            {
              id: "24",
              label: "选项4",
            },
          ],
        },
        {
          id: "3",
          label: "处理中心3",
          layer:1,
          children: [
            {
              id: "31",
              label: "选项31",
            }
          ]
        },
      ],
    };
  },
  methods: {},
};
</script>
<style scoped>
.navDiv {
  height: 45px;
  background: white;
}
.content {
  margin-top: 19px;
  height: calc(100% - 64px);
  background: white;
}
.testDiv {
  background: #ececec;
  width: 100%;
  height: 100%;
}
</style>
<style>
.el-menu--horizontal .el-submenu .el-submenu__icon-arrow {
  display: none;
}
.el-menu--horizontal .el-submenu:hover .el-submenu__icon-arrow {
  display: inline;
}
</style>
