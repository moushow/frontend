<template>
  <div>
    <!-- 其他内容 -->

    <div class="time-display">{{ currentTime }}</div>

    <div id="main" style="width: 1000px; height: 400px"></div>
     <!-- 添加今日日程部分 -->
     <div class="daily-schedule">
      <h2>今日日程</h2>
      <!-- 今日日程内容将在这里添加 -->
      <ul>
        <li v-for="transaction in dailySchedule" :key="transaction">
          {{ transaction }}
        </li>
      </ul>

   

   
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "Home",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      currentTime: '',// 添加currentTime数据属性
      currentDate: new Date().toISOString().slice(0, 10),
      dailySchedule: [],
     
    }
  },
  mounted() {
    var option = {
      title: {
        text: '日程信息统计'
      },
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

    // 添加更新时间的定时器
    this.updateTime();
    setInterval(this.updateTime, 1000);

    // 获取今日日程数据
  this.request.get(`/schedule/${this.username}`)
    .then(res => {
      this.dailySchedule = res.data.map(item => item.event); // 假设后端返回包含 event 属性的对象数组
    })
    .catch(err => {
      console.error(err);
    });
  },
  methods: {
    updateTime() {
      const currentDate = new Date();
      this.currentTime = currentDate.toLocaleString(); // 更新currentTime
    }
  }
}
</script>

<style scoped>
.time-display {
  font-family: 'Courier New', Courier, monospace;
  font-size: 36px;
  color: #070403;
  background-color: #edebeb;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.daily-schedule {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.daily-schedule h2 {
  font-size: 24px;
  color: #333;
  margin-top: 0;
}
</style>