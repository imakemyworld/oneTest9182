<template>
  <div :class="popClass" :style="popStyle" @mouseenter="enterOpen" @mouseleave="leaveClose">
    <ul class="cu-pop-menu">
      <menu-item v-for="child in data.children" :key="child.id" :targetMenuOnce="false" :data="child" :root="false"
        @liClick="liClick" />
    </ul>
  </div>
</template>

<script>
//import MenuList from "./MenuList"
//import MenuList from "../MenuItemForEl"
export default {
  name: "MenuPop",
  components: {
    //"menu-item":MenuList
  },
  computed: {
    hasChild() {
      return this.data.children != null && this.data.children.length > 0;
    },
    popClass() {
      return {
        "cu-pop-menuList": true,
      };
    },
  },
  methods: {
    leaveClose() {
      this.$emit("childLeave", false);
    },
    enterOpen() {
      this.$emit("childEnter", true);
    },
    liClick(...args) {
      this.$emit("liClick", ...args);
    },
    appendToBody() {
      var that = this;
      this.$nextTick(function () {
        document.body.appendChild(that.$el);
      });
    },
  },
  data() {
    return {
      rootAppendToBody: false,
      isDestroy: false,
    };
  },
  props: {
    targetMenuOnce: {
      type: Boolean,
      default() {
        return false;
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    root: Boolean,
    popStyle: Object,
    option: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    if (this.targetMenuOnce && !this.rootAppendToBody) {
      this.appendToBody();
    }
    if (this.root && this.hasChild && !this.rootAppendToBody) {
      this.appendToBody();
    }
  },
  watch: {
    targetMenuOnce(newValue, oldValue) {
      if (newValue) {
        this.appendToBody();
      }
    },
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



