<template>
    <div class="digital-clock">
      <div>{{ currentDate }}</div>
      <div>{{ currentTime }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: '',
        currentDate: ''
      };
    },
    mounted() {
      this.updateTime();
      setInterval(this.updateTime, 1000);
    },
    methods: {
      updateTime() {
        const currentDate = new Date();
        this.currentTime = currentDate.toLocaleTimeString([], { hour12: false });
        this.currentDate = currentDate.toLocaleDateString();
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  