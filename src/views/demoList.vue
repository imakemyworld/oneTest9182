<template>
  <el-table :data="tableData" style="width: 100%" @row-click="openNav">
    <el-table-column prop="date" label="功能"></el-table-column>
  </el-table>
</template>

<script>
    export default {
      name : "demoList",
      data() {
        return {
          tableData: [{
            date: '测试导航树',
            to : "/nav"
          },
          {
            date : "custom导航树",
            to : "/customnav"
          }
          ]
        }
      },
      methods:{
        openNav(item){
          this.$router.push(item.to);
        }
      }
    }
</script>

