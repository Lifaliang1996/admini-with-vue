<template>
  <div id="home">
    <home-states />

    <el-row :gutter="20" style="margin-top: 40px; height: 440px">
      <el-col :span="16"><home-course-income /></el-col>
      <el-col :span="8">
        <home-user-count style="height: 200px" />
        <home-advert-count style="margin-top: 20px; height: 220px" />
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="7" style="height: 300px">
        <home-admini-msg />
      </el-col>
      <el-col :span="9" style="height: 300px">
        <home-course-popularity />
      </el-col>
      <el-col :span="8" style="height: 300px">
        <home-weather />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HomeStates from './components/States.vue'
import HomeCourseIncome from './components/CourseIncome.vue'
import HomeUserCount from './components/UserCount.vue'
import HomeAdvertCount from './components/AdvertCount.vue'
import HomeAdminiMsg from './components/AdminiMsg.vue'
import HomeCoursePopularity from './components/CoursePopularity.vue'
import HomeWeather from './components/Weather.vue'

export default Vue.extend({
  name: 'HomeIndex',

  components: {
    HomeStates,
    HomeCourseIncome,
    HomeAdvertCount,
    HomeUserCount,
    HomeAdminiMsg,
    HomeCoursePopularity,
    HomeWeather
  }
})
</script>

<style scoped>
#home {
  width: 1280px;
  margin: 0 auto;
}

.el-col {
  height: 100%;
}
</style>
