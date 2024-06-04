<template>
  <div>
    <div id="main" style="width: 1000px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Home",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  mounted() {
  

    var option = {  
      
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        },
        {
          data: [],
          type: 'bar'
        }
      ]
    };
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    const username = this.user.username

    this.request.get("/echarts/example/" + username).then(res => {
      console.log(res)
      option.xAxis.data = res.data.x;
      option.series[0].data = res.data.y;
      option.series[1].data = res.data.y;
      myChart.setOption(option);
    })
  }
}
</script>

<style scoped>
</style>
