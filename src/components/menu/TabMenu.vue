<template>
  <ul class="cu-menu">
    <li :class="getLiClass(item,'left')" v-for="item in getLeftBtn" :key="item.id" :style="item.listyle">
      <awsui-button v-if="item.uiType == 'button'" :style="item.dstyle"
        :type="item.option.type == null ? 'primary': item.option.type" @click="clickBtn">{{item.option.label}}
      </awsui-button>
      <i class="awsui-iconfont" v-else-if="item.uiType == 'icon'" :style="item.dstyle" @click="clickBtn"
        v-html="item.option.icon"></i>
      <div class="line" v-if="item.showRLine"></div>
    </li>

    <li class="cu-item" v-for="child in getMenuList" :key="child.id" :root="true" v-bindMenu="bindVue(child)"
      @click="menuClick(child)">
      <div :class="titleClass(child)">
        {{child.label}}
      </div>
    </li>

    <li :class="getLiClass(item,'right')" v-for="item in getRightBtn" :key="item.id" :style="item.listyle">
      <awsui-button v-if="item.uiType == 'button'" :style="item.dstyle"
        :type="item.option.type == null ? 'primary': item.option.type" @click="clickBtn">{{item.option.label}}
      </awsui-button>
      <i class="awsui-iconfont" v-else-if="item.uiType == 'icon'" :style="item.dstyle" v-html="item.option.icon"
        @click="clickBtn">{{item.option.icon}}</i>
      <div class="line" v-if="item.showRLine"></div>
    </li>
    <popListDom :menuList="menuList" :transmit="nextTransmit" @liClick="liClick" @openState="openState" />
  </ul>
</template>

<script>
import popListDom from "./PopListDom";
export default {
  name: "tabMenu",
  components: {
    popListDom,
  },
  props: {
    menuData: Object,
  },
  directives: {
    bindMenu: {
      inserted: function (el, obj) {
        let value = obj.value.data;
        if (!value.children || value.children.length == 0) {
          return;
        }
        let that = obj.value.vue;
        el.addEventListener(
          "mouseenter",
          (e) => {
            if (value.children != null) {
              that.nextTransmit.popToTarget = el;
              that.menuList = value.children;
              that.nextTransmit.showPop = true;
              that.nextTransmit.parentValue = value;
              that.isHoverObj[value.id] = true;
            }
          },
          false
        );
        el.addEventListener(
          "mouseleave",
          (e) => {
            if (value.children != null) {
              that.nextTransmit.showPop = false;
              that.isHoverObj[value.id] = false;
            }
          },
          false
        );
      },
    },
  },
  computed: {
    getMenuList() {
      if (this.menuData && this.menuData.menuList) {
        return this.menuData.menuList;
      }
      return [];
    },
    getLeftBtn() {
      if (this.menuData && this.menuData.left) {
        return this.menuData.left;
      }
      return [];
    },
    getRightBtn() {
      if (this.menuData && this.menuData.right) {
        return this.menuData.right.reverse();
      }
      return [];
    },
  },
  methods: {
    openState(params) {
      if (!params.open) {
        //用于退出菜单状态时，更新
        this.$forceUpdate();
        //this.isHoverObj[params.value.id] = false;
      }
    },
    hasChild(child) {
      return child.children != null && child.children.length > 0;
    },
    titleClass(child) {
      return {
        "cu-item-div": true,
        "cu-subMenuDiv": this.hasChild(child),
        "cu-item-isActive": child.isActive,
        "cu-suMenuDivHover": this.isHoverObj[child.id],
        "cu-suNoH": !this.isHoverObj[child.id],
      };
    },
    bindVue(data) {
      return {
        vue: this,
        data: data,
      };
    },
    getLiClass(item, type) {
      return {
        "cu-item": true,
        "cu-btn": item.uiType == "button",
        "menuitem-right": type == "right",
        icon: item.uiType == "icon",
        afterLine: item.showRLine,
      };
    },
    clickBtn(clickData) {},
    menuClick(clickData) {
      if (!clickData.isActive) {
        for (let data of this.getMenuList) {
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
    liClick(clickData, params) {},
  },
  mounted() {},
  data() {
    return {
      isHoverObj: {},
      menuList: [],
      nextTransmit: {
        root: true,
        showPop: false,
      },
    };
  },
};
</script>
<style >
.cu-menu {
  list-style: none;
  height: 40px;
  margin: 0;
  padding: 0;
}
.cu-menu .cu-item {
  float: left;
  list-style: none;
  height: 100%;
  font-size: 14px;
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
  top: 13px;
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