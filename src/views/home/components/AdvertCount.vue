<template>
  <section ref="chart" class="course-count"></section>
</template>

<script lang="ts">
import Vue from 'vue'
import createChart from '@/utils/charts'

export default Vue.extend({
  name: 'HomeAdvertCount',

  mounted () {
    const option: any = {
      title: {
        text: '广告收入',
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
      tooltip: {},
      backgroundColor: '#a9d96c',
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
          type: 'bar',
          name: '广告收入',
          barWidth: '50%',
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
