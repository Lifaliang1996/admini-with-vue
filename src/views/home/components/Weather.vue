<template>
  <section class="weather-card">
    <div class="weather">
      <el-row class="weather-bg">
        <el-col :span="12" class="flex">
          <i class="el-icon-heavy-rain icon"></i>
          <div class="addr">成 都</div>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="degree">
            7°
          </div>
        </el-col>
      </el-row>
      <div class="weather-category">
        <ul>
          <li>
            <h5>湿度</h5>
            75%
          </li>
          <li>
            <h5>空气质量</h5>
            良
          </li>
          <li>
            <h5>风力</h5>
            &lt;3级
          </li>
        </ul>
      </div>
    </div>
    <div class="text">
      <span>Everything is possible, just do it!</span>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeWeather'
})
</script>

<style lang="scss" scoped>
.weather-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.weather {
  width: 100%;
  height: 76%;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
}

.weather-bg {
  display: flex;
  height: 70%;
  padding: 20px;
  background: #8175c7;
  border-radius: 4px 4px 0 0;
  color: #fff;
  text-align: center;
  font-weight: 300;

  .flex {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .icon {
    font-size: 60px;
  }

  .addr {
    margin-top: 5px;
    font-size: 20px;
  }
}

.degree {
  font-size: 70px;
}

.weather-category {
  padding: 10px 0;
  color: #74829c;

  ul {
    padding: 0;
    margin: 0;
    display: inline-block;
    width: 100%;

    li {
      display: inline-block;
      width: 32%;
      text-align: center;
      display: inline-block;

      &:not(:last-child) {
        border-right: 1px solid #e6e6e6;
      }

      h5 {
        margin: 0 0 5px 0;
        letter-spacing: 0.5ch;
      }
    }
  }
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 18%;
  border-radius: 5px;
  background-color: #ff6c60;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
</style>
