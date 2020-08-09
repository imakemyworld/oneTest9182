<template>
  <ul class="cu-menu" v-if="option.targetMenu != true">
    <menu-item v-for="child in menuData" :key="child.id" :data="child" :root="true" @liClick="liClick" />
  </ul>
  <menu-item v-else :data="targetData" :option="option" :targetMenuOnce="true" :root="false" :popToTarget="popToTarget"
    :popShow="popShow" @liClick="liClick" />
</template>

<script>
export default {
  components: {
    // MenuList,
    //menuItem,
  },
  name: "customMenu",
  props: {
    menuData: Array,
    targetData: Object,
    popToTarget: HTMLDivElement, //用于target形式菜单的显示
    popShow: Boolean, //用于target形式菜单的显示
    option: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    liClick(...args) {
      this.$emit("liClick", ...args);
    },
  },
  mounted() {},
  watch: {
    // showPop(n,o){
    //  // if (this.appendToBody) document.body.appendChild(this.popperElm);
    // }
  },
  data() {
    return {};
  },
};
</script>
<style >
.cu-menu {
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
}
.cu-item {
  float: left;
  list-style: none;
  height: 100%;
}
.cu-item .cu-item-div {
  padding: 0 14px 0 12px;
  margin: 0 3px;
  display: flex;
  align-items: center;
  justify-items: center;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  position: relative;
}
.cu-item .cu-item-div.cu-item-isActive {
  border-bottom-color: #2196f3;
}
.cu-item-div.cu-subMenuDiv.cu-suMenuDivHover,
.cu-item-div.cu-subMenuDiv.cu-suNoH:hover {
  color: #2196f3;
}
.cu-item .cu-item-div.cu-subMenuDiv.cu-suMenuDivHover:after,
.cu-item .cu-item-div.cu-subMenuDiv.cu-suNoH:hover:after {
  font-family: element-icons;
  position: absolute;
  content: "\e790";
  font-size: 13px;
  right: -1px;
  top: 14px;
}
.cu-pop-menuList {
  position: absolute;
  z-index: 2020;
  padding-top: 3px;
}
.cu-pop-menuList .cu-pop-menu {
  list-style: none;
  margin: 0 5px;
  position: relative;
  border: none;
  padding: 0;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.cu-pop-menuList .cu-pop-menu-li {
  list-style: none;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
  background-color: #fff;
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
  color: #909399;
  min-width: 260px;
}
.cu-pop-menuList .cu-pop-menu-li:hover {
  background: #f2f9ff;
}
.cu-pop-menuList .cu-pop-menu-li .cu-pop-item-div.cu-subMenuDiv {
  position: relative;
}
.cu-pop-menuList .cu-pop-menu-li .cu-pop-item-div.cu-subMenuDiv:after {
  font-family: element-icons;
  position: absolute;
  content: "\e6e0";
  font-size: 13px;
  right: 3px;
  top: 0px;
}
</style>