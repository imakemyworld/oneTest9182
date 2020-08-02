<template>
  <el-menu-item v-if="data.children == null || data.children.length == 0" :index="data.id">
    <menuItemForEl :data="data" />
  </el-menu-item>
  <el-submenu v-else :index="data.id">
    <template slot="title">
      <menuItemForEl :data="data" />
    </template>
    <menuListForEl v-for="child in data.children" :key="child.id" :data="child" />
  </el-submenu>
</template>

<script>
import menuItemForEl from "./MenuItemForEl.vue";
export default {
  name: "menuListForEl",
  components: {
    menuItemForEl,
  },
  props: {
    data: Object,
  },
};
</script>
