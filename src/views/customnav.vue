<template>
  <div id="333" class="testDiv">
    <div class="navDiv">
      <custom-menu :menuData="menuData" @liClick="liClick" />
    </div>
    <div class="content">
      <custom-itemMenu :menuData="itemMenuData" />
    </div>
  </div>
</template>

<script>
import customMenu from "../components/customNav/CustomMenu";
import itemMenu from "../components/itemMenu/itemMenu";
export default {
  components: {
    "custom-menu": customMenu,
    "custom-itemMenu": itemMenu,
  },
  name: "navView",
  methods: {
    liClick(clickData, params) {
      if (params.root) {
        if (!clickData.isActive) {
          for (let data of this.menuData) {
            if (data.isActive) {
              this.$nextTick(() => {
                data.isActive = false;
              });
            }
          }
          this.$nextTick(() => {
            clickData.isActive = true;
          });
        }
        this.$forceUpdate();
      }
    },
  },
  watch: {},
  data() {
    let itemMenuChildrenData = [
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
    ];
    return {
      itemMenuData: [
        {
          id: "121",
          label: "姓名",
          icon: "\\e7ab",
          isActive: false,
          disable: false,
          editable: false,
        },
        {
          id: "122",
          label: "年龄",
          icon: "\\e77d",
          isActive: true,
          disable: false,
          editable: false,
        },
        {
          id: "123",
          label: "工作地址",
          icon: "\\e77d",
          chilren: itemMenuChildrenData,
          isActive: false,
          disable: true,
          editable: false,
        },
        {
          id: "124",
          label: "家庭地址",
          icon: "\\e77d",
          isActive: false,
          disable: false,
          editable: false,
        },
        {
          id: "125",
          label: "家庭地址",
          icon: "\\e77d",
          editable: true,
        },
        {
          id: "126",
          label: "家庭地址",
          icon: "\\e77d",
          isActive: false,
          disable: false,
          editable: false,
        },
        {
          id: "127",
          label: "其他特殊的信息要进行更改的等",
          icon: "\\e78b",
          isActive: false,
          disable: false,
          editable: false,
        },
        {
          id: "128",
          label: "备注一，备注二",
          icon: "\\e77d",
          isActive: false,
          disable: false,
          editable: false,
        },
      ],
      menuData: [
        {
          id: "1",
          label: "处理中心",
          isActive: false,
        },
        {
          id: "2",
          label: "我的工作台",
          isActive: true,
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
          isActive: false,
          children: [
            {
              id: "31",
              label: "选项31",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
.navDiv {
  height: 45px;
  background: white;
}
.content {
  margin-top: 8px;
  height: calc(100% - 53px);
  background: white;
  overflow: auto;
}
.testDiv {
  background: #ececec;
  width: 100%;
  height: 100%;
}
</style>