<template>
  <section ref="chart" class="course-count"></section>
</template>

<script lang="ts">
import Vue from 'vue'
import createChart from '@/utils/charts'

export default Vue.extend({
  name: 'HomeUserCount',

  mounted () {
    const option: any = {
      title: {
        text: '新增用户',
        textStyle: {
          fontSize: 14,
          fontWeight: 400,
          color: '#fff'
        },
        top: 10,
        left: 10
      },
      grid: {
        left: 40,
        right: 20,
        bottom: 20
      },
      backgroundColor: '#41cac0',
      tooltip: {},
      xAxis: {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        min: 30,
        axisLabel: {
          show: true,
          color: '#fff'
        }
      },
      series: [
        {
          type: 'line',
          name: '新增用户',
          itemStyle: {
            color: '#fff'
          },
          data: [45, 55, 39, 64, 59, 70, 61, 52, 48, 61, 69, 70]
        }
      ]
    }

    createChart(this.$refs.chart as HTMLElement, option)
  }
})
</script>

<style scoped>
.course-count {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
}
</style>
