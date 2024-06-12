<template>
  <div id="app">
    <!-- Digital Clock 组件 -->
    <DigitalClock />

    <!-- 间隔 -->
    <div class="spacer"></div>

    <!-- ECharts 图表容器 -->
    <div id="main" class="chart-container"></div>
    
    <!-- 今日日程部分 -->
    <div class="daily-schedule">
      <h2>今日日程</h2>
      <ul>
        <li v-for="transaction in dailySchedule" :key="transaction">
          {{ transaction }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import DigitalClock from './DigitalClock.vue';
import * as echarts from 'echarts';

export default {
  name: "Home",
  components: {
    DigitalClock
  },
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      currentTime: '', // 添加currentTime数据属性
      currentDate: new Date().toISOString().slice(0, 10),
      dailySchedule: [],
    }
  },
  mounted() {
    var option = {
      title: {
        text: '日程信息统计',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 18,
        },
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          color: '#333'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          color: '#333'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [
        {
          data: [],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#5470C6'
          },
          itemStyle: {
            color: '#5470C6'
          }
        },
        {
          data: [],
          type: 'bar',
          barWidth: '50%',
          itemStyle: {
            color: '#91CC75'
          }
        }
      ],
      backgroundColor: '#fff',
    };
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    const username = this.user.username;
    this.request.get("/echarts/example/" + username).then(res => {
      option.xAxis.data = res.data.x;
      option.series[0].data = res.data.y;
      option.series[1].data = res.data.y;
      myChart.setOption(option);
    })

    // 添加更新时间的定时器
    this.updateTime();
    setInterval(this.updateTime, 1000);

    
    const url = "/schedule/events/"+ username;
    this.request.get(url)
  .then(res => {
    console.log(res); // 输出完整的响应对象
    if (res && Array.isArray(res)) {
      // 确认每个数据项是否有 'event' 属性
      const isValid = res.every(item => 'event' in item);
      if (isValid) {
        this.dailySchedule = res.map(item => item.event);
      } else {
        console.error("Invalid data structure:", res);
      }
    } else {
      console.error("Invalid response format:", res);
    }
  })
  .catch(err => {
    console.error("Request failed:", err);
  });

  },
  methods: {
    updateTime() {
      const currentDate = new Date();
      this.currentTime = currentDate.toLocaleTimeString([], { hour12: false });
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('background.jpg') no-repeat center center fixed;
  background-size: cover;
  /* 添加淡化效果 */
  background-color: rgba(255, 255, 255, 0.5); /* 调整最后一个值来控制透明度 */
}

#app {
  width: 100%;
  max-width: 1200px;
  margin: 20px;
  background-color: rgba(113, 160, 189, 0.8); /* 背景颜色为白色，并添加透明度 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.spacer {
  height: 20px; /* 调整间隔的高度 */
}

.digital-clock {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
}

.digital-clock:hover {
  color: #333;
  background-color: #fff;
  transform: scale(1.05);
}

.digital-clock div {
  margin-bottom: 5px;
}

.chart-container {
  width: 100%;
  height: 400px;
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
  margin-top: 20px; /* 增加标题顶部间距 */
  margin-bottom: 10px; /* 增加标题底部间距 */
}

.daily-schedule ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 10px; /* 增加列表顶部间距 */
}

.daily-schedule li {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.daily-schedule li:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
