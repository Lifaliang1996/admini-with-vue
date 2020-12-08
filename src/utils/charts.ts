import { init } from 'echarts'

function createChart (dom: HTMLElement, option: any) {
  const chart = init(dom, 'light')
  chart.setOption(option)
  return chart
}

export default createChart
