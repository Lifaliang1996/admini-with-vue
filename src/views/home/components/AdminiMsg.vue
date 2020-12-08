<template>
  <section class="admini-msg">
    <div class="info">
      <el-avatar
        shape="square"
        :size="70"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      />
      <div class="thumb">
        <h2>会飞的键盘</h2>
        <p>超级管理员</p>
      </div>
    </div>
    <el-table :data="MsdData" :show-header="false" size="small" row-class-name="msg-row">
      <el-table-column prop="icon" width="100px">
        <template v-slot="props">
          <i :class="props.row.icon" class="icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type"></el-table-column>
      <el-table-column prop="count" align="right"></el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeAdminiMsg',

  data () {
    return {
      MsdData: [
        {
          icon: 'el-icon-s-order',
          type: '新任务',
          count: 11
        },
        {
          icon: 'el-icon-warning',
          type: '待完成',
          count: 10
        },
        {
          icon: 'el-icon-message-solid',
          type: '消息',
          count: 20
        },
        {
          icon: 'el-icon-s-data',
          type: '统计',
          count: 11
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.admini-msg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
}

.info {
  display: flex;
  padding: 20px;
}

.el-table::before {
  height: 0;
}

.thumb {
  margin-left: 15px;
  h2 {
    margin: 15px 0 5px;
    color: $green;
    font-size: 16px;
    font-weight: 400;
  }
  p {
    margin: 0;
    color: #a4aaba;
    font-size: 13px;
  }
}

::v-deep .el-table td {
  padding: 8px 0;
  border-top: 1px solid #EBEEF5;
  border-bottom: none;
}

.msg-row {
  .icon {
    font-size: 25px;
    color: #c7cbd4;
  }

  &:hover {
    .icon {
      color: $green;
    }
  }
}
</style>
