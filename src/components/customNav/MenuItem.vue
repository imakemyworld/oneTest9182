<template>
  <li v-if="option.targetMenu != true || !targetMenuOnce" :class="root ? 'cu-item' : 'cu-pop-menu-li'"
    @mouseenter="showMenuList" @mouseleave="closeMenu" @mouseover="showMenuList" @click="liClick">
    <div :class="titleClass">{{data.label}}</div>
    <MenuPop v-if="hasChild" :data="data" :root="root" :popStyle="popStyle" v-show="showPop" @childLeave="closeMenu"
      @childEnter="openMenu" @liClick="liClick" />
  </li>
  <MenuPop v-else :data="data" :root="root" :popStyle="popStyle" v-show="showPop" @childLeave="closeMenu"
    @childEnter="openMenu" @liClick="liClick" :targetMenuOnce="targetMenuOnce" />
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
    showMenuList(obj) {
      if (!this.hasChild) {
        return;
      }
      let target = obj.popTarget == null ? this.$el : obj.popTarget;
      if (this.root || obj.popTarget) {
        //向下弹出菜单
        this.popStyle.top = target.offsetTop + target.offsetHeight + "px";
        this.popStyle.left = target.offsetLeft - 3 + "px";
      } else {
        //向右弹出菜单
        this.popStyle.top = target.offsetTop + "px";
        this.popStyle.left = target.offsetLeft + target.offsetWidth + "px";
      }
      this.openMenu();
    },
    liClick(...args) {
      if (args[0].stopPropagation) {
        this.$emit("liClick", this.data, {
          root: this.root,
          event: args[0],
        });
      } else {
        this.$emit("liClick", ...args);
      }
    },
  },
  watch: {
    popShow(newValue, oldValue) {
      if (newValue) {
        this.showMenuList({ popTarget: this.popToTarget });
      } else {
        this.closeMenu();
      }
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
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    popToTarget: HTMLDivElement, //用于target形式菜单的显示
    popShow: Boolean, //用于target形式菜单的显示
    option: {
      type: Object,
      default() {
        return {};
      },
    },
    targetMenuOnce: Boolean,
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



