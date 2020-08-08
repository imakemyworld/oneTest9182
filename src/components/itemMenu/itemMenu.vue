<template>
  <div class="custom-itemMenuDiv">
    <div v-for="child in menuData" :key="child.id" :class="getCustomItemClass(child)" :icon="changeToJSIcon(child.icon)"
      :style="getCustomItemStyle(child)">
      <div :class="getCustomItemContentClass(child)" @click="editThis($event,child)" :title="child.label">
        <span v-show="showInput(child,false)">{{child.label}}</span>
        <input type="text" class="editInput" v-if="child.editable" v-show="showInput(child,true)" v-model="child.label"
          @blur="quitEdit(child)" />
      </div>
      <div class="custom-item-cancel" v-if="child.disable !== true"><i class="el-icon-close"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // MenuList,
    //menuItem,
  },
  name: "itemMenu",
  props: {
    menuData: Array,
    option: Object,
  },
  computed: {},
  directives: {
    bindMenu: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
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
    liClick(...args) {
      this.$emit("liClick", ...args);
    },
  },
  watch: {
    // showPop(n,o){
    //  // if (this.appendToBody) document.body.appendChild(this.popperElm);
    // }
  },
  data() {
    return {
      isInput: {},
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