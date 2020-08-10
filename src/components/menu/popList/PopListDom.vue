<template>
  <div :class="popClass" :style="popStyle" v-show="showPop" @mouseenter="openMenu" @mouseleave="closeMenu">
    <ul class="cu-pop-menu" v-show="menuList.length > 0">
      <popMenuItem v-for="child in menuList" :key="child.id" :data="child" :transmit="nextTransmit"
        @liClick="liClick" />
    </ul>
  </div>
</template>

<script>
//import MenuList from "./MenuList"
import popMenuItem from "./PopMenuItem";

const openOrCloseDelay = 200;

export default {
  name: "popListDom",
  components: {
    popMenuItem,
  },
  computed: {
    hasChild() {
      return this.menuList.length > 0;
    },
    popClass() {
      return {
        "cu-pop-menuList": true,
      };
    },
  },
  methods: {
    openMenu() {
      clearTimeout(this.openDelayId);
      this.openDelayId = setTimeout(() => {
        this.showPop = true;
      }, openOrCloseDelay);
    },
    closeMenu() {
      clearTimeout(this.openDelayId);
      this.openDelayId = setTimeout(() => {
        this.showPop = false;
        this.$emit("openState", {
          open: false,
          value: this.transmit.parentValue,
        });
      }, openOrCloseDelay);
    },
    showMenuList(obj) {
      let targetEl = obj.popTarget;
      if (this.transmit.root) {
        //向下弹出菜单
        this.popStyle.top = targetEl.offsetTop + targetEl.offsetHeight + "px";
        this.popStyle.left = targetEl.offsetLeft - 3 + "px";
      } else {
        //向右弹出菜单
        this.popStyle.top = targetEl.offsetTop + "px";
        this.popStyle.left = targetEl.offsetLeft + targetEl.offsetWidth + "px";
      }
      this.openMenu();
    },
    liClick(...args) {
      this.$emit("liClick", ...args);
    },
  },
  watch: {
    "transmit.showPop"(newValue, oldValue) {
      if (newValue) {
        if (this.transmit.menuList != null) {
          //this.$forceUpdate();
        }
        this.showMenuList({ popTarget: this.transmit.popToTarget });
      } else {
        this.closeMenu();
      }
    },
  },
  data() {
    return {
      popStyle: {
        top: 0,
        left: 0,
      },
      openDelayId: 0,
      rootAppendToBody: false,
      isDestroy: false,
      showPop: false,
      nextTransmit: {
        root: false,
      },
    };
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
    transmit: {
      type: Object,
      default() {
        return {
          root: true,
          showPop: false,
        };
      },
    },
  },
  mounted() {
    if (this.transmit.root && !this.rootAppendToBody) {
      let that = this;
      this.$nextTick(function () {
        document.body.appendChild(that.$el);
      });
    }
  },
  destroyed() {
    if (!this.isDestroy) {
      this.isDestroy = true;
      if (
        this.$el.parentNode != null &&
        this.$el.parentNode.tagName == "BODY"
      ) {
        document.body.removeChild(this.$el);
      }
    }
  },
};
</script>

<style >
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
.cu-item.icon {
  padding: 0 12px 0 7px;
  line-height: 38px;
  margin-right: 5px;
  float: left;
}
.cu-item.menuitem-right {
  float: right;
  margin: 0 5px;
  padding: 0 4px;
}
.cu-item.icon i {
  cursor: pointer;
  font-size: 16px;
}

.cu-item.icon.afterLine {
  position: relative;
}

.cu-item.icon.afterLine .line {
  position: absolute;
  width: 1px;
  height: 27px;
  top: 8px;
  right: 0px;
  border-left: 1px solid #ebebeb;
}
.cu-item.cu-btn {
  margin-top: 6px;
}

.cu-pop-item-div {
  display: flex;
  align-items: center;
  min-width: 260px;
  font-size: 14px;
  color: #474747;
}
.cu-pop-item-div .menuitem-small {
  min-width: 100px;
}
.cu-pop-item-div .stext {
  margin-left: auto;
  padding-right: 11px;
  color: #cecece;
}
.cu-pop-item-div .scheck {
  margin-left: auto;
}
.cu-pop-item-div .icon-span {
  width: 26px;
}
.el-submenu__title .menuitem-template {
  padding-left: 33px;
}
.item-checked {
  cursor: pointer;
}
.item-checked .item-title,
.item-checked .scheck i {
  color: #3a8ee6;
}
</style>


