<template>
  <section class="states">
    <div class="card">
      <div class="icon" style="background-color: #6ccac9">
        <i class="el-icon-user-solid"></i>
      </div>
      <div class="msg">
        <div class="num">456</div>
        <h1>用户数量</h1>
      </div>
    </div>
    <div class="card">
      <div class="icon" style="background-color: #57c8f2">
        <i class="el-icon-video-camera-solid"></i>
      </div>
      <div class="msg">
        <div class="num">86</div>
        <h1>课程数量</h1>
      </div>
    </div>
    <div class="card">
      <div class="icon" style="background-color: #f8d347">
        <i class="el-icon-s-open"></i>
      </div>
      <div class="msg">
        <div class="num">47</div>
        <h1>广告数量</h1>
      </div>
    </div>
    <div class="card">
      <div class="icon" style="background-color: #ff6c60">
        <i class="el-icon-s-data"></i>
      </div>
      <div class="msg">
        <div class="num">456,201</div>
        <h1>销售收入</h1>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'States'
})
</script>

<style lang="scss" scoped>
.states {
  display: flex;
  justify-content: space-between;
}

.card {
  display: flex;
  width: 23%;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  font-size: 60px;
  color: #fff;
}

.msg {
  width: 60%;
  color: #9e9e9e;
  background-color: #fff;
  text-align: center;

  .num {
    margin-top: 20px;
    font-size: 30px;
  }

  h1 {
    margin: 5px 0 0;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
