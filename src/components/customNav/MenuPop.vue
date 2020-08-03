<template>
  <div :class="popClass" :style="popStyle" @mouseenter="enterOpen" @mouseleave="leaveClose">
    <ul class="cu-pop-menu">
      <menu-item v-for="child in data.children" :key="child.id" :data="child" :root="false" @liClick="liClick" />
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
  watch: {},
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
  },
  data() {
    return {
      rootAppendToBody: false,
      isDestroy: false,
    };
  },
  props: {
    data: Object,
    root: Boolean,
    popStyle: Object,
  },
  mounted() {
    if (this.root && this.hasChild && !this.rootAppendToBody) {
      var that = this;
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



