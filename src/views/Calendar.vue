<template>
  <div>
    <el-calendar>
      <template
          slot="dateCell"
          slot-scope="{date, data}">
        <div
            style="height: 100%; position: relative;"
            :class="['custom-date-cell', data.isSelected ? 'is-selected' : '']"
            @click="handleClick(data.day)">
          <div class="date">{{ data.day.split('-').slice(1).join('-') }}</div>
          <div class="content" v-if="getEventForDate(data.day)">
            {{ getEventForDate(data.day).event }}
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      value: new Date(),
      arr: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    handleClick(date) {
      alert(date);
    },
    load() {
      fetch("http://localhost:9090/schedule")
          .then(res => res.json())
          .then(res => {
            if (res && Array.isArray(res)) {
              this.arr = res.map(item => ({
                date: item.date,
                event: item.event
              }));
            }
          })
          .catch(error => {
            console.error("Error fetching schedule data:", error);
          });
    },
    getEventForDate(date) {
      return this.arr.find(v => v.date === date);
    }
  }
};
</script>

<style scoped>
.custom-date-cell {
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 120px;
  padding: 10px;
  position: relative;
}

.custom-date-cell:hover {
  border-color: #409eff;
}

.is-selected {
  border-color: #409eff;
}

.custom-date-cell .date {
  font-weight: bold;
  font-size: 0.8em;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.custom-date-cell .content {
  font-size: 0.9em;
  color: #666;
  margin-top: 20px;
  text-align: center;
}
</style>
