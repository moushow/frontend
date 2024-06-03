<template>
<div>
    <el-calendar>
        <template
            slot="dateCell"
            slot-scope="{date, data}">
        <div style="height: 100%" :class="data.is-selected ? 'is-selected':''" @click="handleClick(data.day)">
            <div>{{ data.day.split('-').slice(1).join('-') }}</div>
            <div v-if="arr.find(v => v.date === data.day)">{{ arr.find(v => v.date === data.day).content}}</div>
        </div>
    </template>
</el-calendar>

    </div>
  </template>

<script>
export default{
    name:"Calendar",
    data(){
        return{
            value: new Date(),
            arr: []
        }
    },
    create(){
        this.load()
    },
    methods:{
        handleClick(date) {
            alert(date)
        },
        load(){
            fetch("http://localhost:9090/calendar").then(res => res.json()).then(res => {
                this.arr =res
            })
        },
    }
}


</script>