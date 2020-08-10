<template>
  <li class="cu-pop-menu-li" @click="liClick" v-bindMenu="bindVue(data)">
    <div :class="titleClass">
      <span class="icon-span">
        <i class="el-icon-plus" style="color: rgb(147 147 147);"></i>
      </span>
      <span class="item-title">{{data.label}}</span>
      <span class="stext">{{data.stext}}</span>
    </div>
    <popListDom v-if="hasChild" :menuList="data.children" :transmit="nextTransmit" @liClick="liClick" />
  </li>
</template>

<script>
export default {
  name: "popMenuItem",
  components: {},
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
              //that.nextTransmit.menuList = value.children;
              that.nextTransmit.showPop = true;
            }
          },
          false
        );
        el.addEventListener(
          "mouseleave",
          (e) => {
            if (value.children != null) {
              that.nextTransmit.showPop = false;
            }
          },
          false
        );
      },
    },
  },
  computed: {
    hasChild() {
      return this.data.children != null && this.data.children.length > 0;
    },
    titleClass() {
      return {
        "cu-pop-item-div": true,
        "cu-subMenuDiv": this.hasChild,
        "cu-item-isActive": this.data.isActive,
        "cu-suMenuDivHover": this.root && this.showPop,
        "cu-suNoH": this.root && !this.showPop,
      };
    },
  },
  methods: {
    bindVue(data) {
      return {
        vue: this,
        data: data,
      };
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
  data() {
    return {
      nextTransmit: {
        root: false,
        showPop: false,
      },
    };
  },
  props: {
    data: Object,
    root: Boolean,
    transmit: {
      type: Object,
      default() {
        return {
          root: false,
        };
      },
    },
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



