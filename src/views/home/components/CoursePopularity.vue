<template>
  <section ref="chart" class="course-popularyt"></section>
</template>

<script lang="ts">
import Vue from 'vue'
import createChart from '@/utils/charts'

export default Vue.extend({
  name: 'HomeCoursePopularity',

  mounted () {
    const option: any = {
      title: {
        text: '各类课程销售数量',
        textStyle: {
          fontSize: '13px',
          fontWeight: 400,
          color: '#797979'
        },
        left: '10px',
        top: '10px'
      },
      left: 'middle',
      legend: {
        show: false
      },
      tooltip: {},
      series: [
        {
          name: '销售数量',
          type: 'pie',
          radius: [10, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 20, name: 'HTML' },
            { value: 38, name: 'JavaScript' },
            { value: 32, name: 'Vue' },
            { value: 30, name: 'TypeScript' },
            { value: 28, name: 'Nodejs' },
            { value: 26, name: 'Webpack' },
            { value: 22, name: 'CSS' },
            { value: 18, name: 'React' }
          ]
        }
      ]
    }

    createChart(this.$refs.chart as HTMLElement, option)
  }
})
</script>

<style scoped>
.course-popularyt {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
}
</style>
