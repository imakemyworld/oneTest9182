<template>
  <li
    :class="root ? 'cu-item' : 'cu-pop-menu-li'"
    @mouseenter="showMenuList"
    @mouseleave="closeMenu"
    @mouseover="showMenuList"
    @click="rootClick"
  >
    <div :class="titleClass">{{data.label}}</div>
    <MenuPop
      v-if="hasChild"
      :data="data"
      :root="root"
      :popStyle="popStyle"
      v-show="showPop"
      @childLeave="closeMenu"
      @childEnter="openMenu"
    />
  </li>
</template>

<script>
//import menuItem from "./MenuItem.vue";
import MenuPop from "./MenuPop";
const openOrCloseDelay = 200;
export default {
  name: "menu-item",
  components: {
    // menuItem,
    MenuPop,
  },
  computed: {
    hasChild() {
      return this.data.children != null && this.data.children.length > 0;
    },
    titleClass() {
      return {
        "cu-pop-item-div": !this.root,
        "cu-item-div": this.root,
        "cu-subMenuDiv": this.hasChild,
        "cu-item-isActive": this.data.isActive,
        "cu-suMenuDivHover": this.root && this.showPop,
        "cu-suNoH": this.root && !this.showPop,
      };
    },
  },
  methods: {
    openMenu() {
      var that = this;
      clearTimeout(this.openDelayId);
      this.openDelayId = setTimeout(() => {
        that.showPop = true;
      }, openOrCloseDelay);
    },
    closeMenu() {
      var that = this;
      clearTimeout(this.openDelayId);
      this.openDelayId = setTimeout(() => {
        that.showPop = false;
      }, openOrCloseDelay);
    },
    showMenuList() {
      if (!this.hasChild) {
        return;
      }
      if (this.root) {
        //向下弹出菜单
        this.popStyle.top = this.$el.offsetTop + this.$el.offsetHeight + "px";
        this.popStyle.left = this.$el.offsetLeft - 3 + "px";
      } else {
        //向右弹出菜单
        this.popStyle.top = this.$el.offsetTop + "px";
        this.popStyle.left = this.$el.offsetLeft + this.$el.offsetWidth + "px";
      }
      this.openMenu();
    },
    rootClick() {
      if (!this.root) {
        return;
      }
      this.$emit("rootClick", this.data);
    },
  },
  data() {
    return {
      openDelayId: 0,
      showPop: false,
      popStyle: {
        top: 0,
        left: 0,
      },
    };
  },
  props: {
    data: Object,
    root: Boolean,
  },
  mounted() {
    // if(this.root && this.hasChild && !this.rootAppendToBody){
    //   var that = this;
    //   this.rootAppendToBody = true;
    //   this.$nextTick(function () {
    //    // document.body.appendChild(that.$el.children[1]);
    //    console.log(that)
    //   })
    // }
  },
};
</script>



