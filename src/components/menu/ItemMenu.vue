<template>
  <div class="custom-itemMenuDiv">
    <div v-for="child in menuData.menuList" :key="child.id" :class="getCustomItemClass(child)"
      :icon="changeToJSIcon(child.icon)" :style="getCustomItemStyle(child)" v-bindMenu="bindVue(child)">
      <div :class="getCustomItemContentClass(child)" @click="editThis($event,child)" :title="child.label">
        <span v-show="showInput(child,false)">{{child.label}}</span>
        <input type="text" class="editInput" v-if="child.editable" v-show="showInput(child,true)" v-model="child.label"
          @blur="quitEdit(child)" />
      </div>
      <div class="custom-item-cancel" v-if="child.disable !== true"><i class="el-icon-close"></i></div>
    </div>
    <popListDom :menuList="menuList" :transmit="nextTransmit" @liClick="liClick" @openState="openState" />
  </div>
</template>

<script>
import popListDom from "./PopListDom";
export default {
  name: "tabMenu",
  components: {
    popListDom,
  },
  props: {
    menuData: {
      type: Object,
      default() {
        return {
          menuList: [],
        };
      },
    },
    option: Object,
  },
  directives: {
    bindMenu: {
      //用于pop
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
  methods: {
    openState(params) {
      //用于pop
      if (!params.open) {
        //用于退出菜单状态时，更新
        this.$forceUpdate();
        //this.isHoverObj[params.value.id] = false;
      }
    },
    hasChild(child) {
      return child.children != null && child.children.length > 0;
    },
    bindVue(data) {
      //用于pop
      return {
        vue: this,
        data: data,
      };
    },

    menuClick(clickData, params) {},
    quitEdit(item) {
      this.$set(this.isInput, item.id, false);
    },
    editThis(event, item) {
      if (item.editable && this.isInput[item.id] != true) {
        this.$set(this.isInput, item.id, true);
        let target = event.currentTarget;
        setTimeout(function () {
          target.children[1].focus();
        }, 50);
      }
    },
    showInput(item, isInput) {
      return isInput
        ? this.isInput[item.id] == true
        : this.isInput[item.id] != true;
    },
    getCustomItemContentClass(item) {
      return {
        "custom-item-content": true,
        editable: item.editable === true && this.isInput[item.id] != true,
        editing: this.isInput[item.id] == true,
      };
    },
    getCustomItemClass(item) {
      return {
        "custom-item": true,
        isActive: item.isActive === true,
        disable: item.disable === true,
      };
    },
    getCustomItemStyle(item) {
      let style = {};
      if (this.option != null) {
        if (this.option.columnNum > 0) {
          style.width = "calc(" + 100.0 / this.option.columnNum + "% - 6px)"; //6px是margin的像素
        }
      }
      return style;
    },
    changeToJSIcon(iconStr) {
      if (iconStr == null || iconStr.length == 0) {
        return "";
      }
      if (iconStr.length > 2) {
        iconStr = iconStr.toLowerCase();
        if (iconStr.indexOf("&#x") > -1) {
          //html
          iconStr = iconStr.replace(/&#x([\d\w]*);*/i, "%u$1");
        }
        if (iconStr.indexOf("\\e") > -1) {
          //css
          iconStr = iconStr.replace("\\", "%u");
        }
        return unescape(iconStr);
      } else {
        // js
        return iconStr;
      }
    },
    liClick(clickData, params) {},
  },
  mounted() {},
  data() {
    return {
      isHoverObj: {},
      menuList: [],
      isInput: {},
      nextTransmit: {
        root: true,
        showPop: false,
      },
    };
  },
};
</script>
<style scoped>
.custom-itemMenuDiv {
  width: 500px;
  margin: 6px 0 0 6px;
  display: flex;
  border: 1px solid #ffc1ad;
  border-radius: 3px;
  padding: 2px 6px 6px 1px;
  font-size: 13px;
  flex-wrap: wrap;
}
.custom-itemMenuDiv .custom-item {
  width: calc(33.33% - 6px);
  height: 31px;
  margin-left: 6px;
  display: flex;
  margin-top: 4px;
  box-sizing: border-box;
  align-items: center;
  justify-content: left;
  padding: 3px 2px 3px 17px;
  border: 1px solid #2196f3;
  border-radius: 2px;
  background: #e0f1ff;
  position: relative;
}
.custom-itemMenuDiv .custom-item:before {
  content: attr(icon);
  font-family: element-icons;
  position: absolute;
  top: 8px;
  left: 3px;
  color: black;
}
.custom-itemMenuDiv .custom-item.isActive {
  border: 1px solid #0086f1;
  color: white;
  background: #3e96e0;
}
.custom-itemMenuDiv .custom-item.disable {
  border: 1px solid #dedede !important;
  color: #888888 !important;
  background: #e4e4e4 !important;
}

.custom-itemMenuDiv .custom-item:hover {
  border: 1px solid #b2d5f1;
  background: #55b4ff;
}

.custom-itemMenuDiv .custom-item-content {
  width: calc(100% - 16px);
  padding: 1px 3px;
  overflow: hidden;
  border: 1px solid #ff000000;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.custom-itemMenuDiv .custom-item-content.editable:hover {
  border-style: dashed;
  border-color: white;
  border-radius: 2px;
}
.custom-itemMenuDiv .custom-item-content.editing {
  padding: 0px 1px;
}

.custom-itemMenuDiv .custom-item-content .editInput {
  width: calc(100% - 7px);
  border: none;
  font-size: 13px;
  font-family: "Microsoft YaHei";
  outline: none;
}
.custom-itemMenuDiv .custom-item-content .editInput:focus {
  border: none;
}
.custom-itemMenuDiv .custom-item-cancel {
}
.custom-itemMenuDiv .custom-item-cancel i {
  cursor: pointer;
}
.custom-itemMenuDiv .custom-item-cancel i:hover {
  color: red;
}
</style>