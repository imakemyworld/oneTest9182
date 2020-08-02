<template>
  <div id="333" class="testDiv">
    <div class="navDiv">
      <custom-menu :menuData="menuData" @rootClick="rootClick" />
    </div>
    <div class="content">测试内容</div>
  </div>
</template>

<script>
import customMenu from "../components/customNav/CustomMenu";
export default {
  components: {
    "custom-menu": customMenu,
  },
  name: "navView",
  methods: {
    rootClick(clickData) {
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
    },
  },
  watch: {},
  data() {
    return {
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
}
.testDiv {
  background: #ececec;
  width: 100%;
  height: 100%;
}
</style>