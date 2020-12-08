<template>
  <section ref="chart" class="course-income"></section>
</template>

<script lang="ts">
import Vue from 'vue'
import createChart from '@/utils/charts'

export default Vue.extend({
  name: 'HomeCourseIncome',

  mounted () {
    const option: any = {
      title: {
        text: '课程销售收入',
        textStyle: {
          fontWeight: 400,
          color: '#797979'
        }
      },
      grid: {
        left: 40,
        right: 20,
        bottom: 20
      },
      tooltip: {},
      toolbox: {
        show: true,
        right: 30,
        feature: {
          dataView: {
            readOnly: true,
            title: '源数据'
          },
          magicType: {
            type: ['line', 'bar'],
            title: {
              line: '切换为折线图',
              bar: '切换为柱状图'
            }
          },
          restore: {
            title: '还原'
          },
          saveAsImage: {
            title: '保存为图片'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          name: '销售收入',
          barWidth: 35,
          itemStyle: {
            color: '#bfc2cd',
            barBorderRadius: [5, 5, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: '#e8403f'
            }
          },
          data: [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            1000,
            901,
            1023,
            1456,
            987
          ]
        }
      ]
    }

    createChart(this.$refs.chart as HTMLElement, option)
  }
})
</script>

<style scoped>
.course-income {
  width: 100%;
  height: 100%;
}
</style>
