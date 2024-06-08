<template>
  <div>
    <el-table border stripe :data="tableData" :header-cell-class-name="'headerBg'">
      <el-table-column label="时间/课程">
        <template v-slot="scope">
          <div v-if="scope.row.section">
            <div style="margin: 10px 0; color: #E6A23C; font-weight: bold">{{ scope.row.section.num}}</div>
            <div style="margin: 10px 0; color: #E6A23C; font-weight: bold">{{ scope.row.section.time}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周一">
        <template v-slot="scope">
          <div v-if="scope.row.mon">
            <div style="margin: 10px 0">{{ scope.row.mon.course}}</div>
            <div style="margin: 10px 0">{{ scope.row.mon.room}}</div>
            <div style="margin: 10px 0">{{ scope.row.mon.teacher}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周二">
        <template v-slot="scope">
          <div v-if="scope.row.tue">
            <div style="margin: 10px 0">{{ scope.row.tue.course}}</div>
            <div style="margin: 10px 0">{{ scope.row.tue.room}}</div>
            <div style="margin: 10px 0">{{ scope.row.tue.teacher}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周三">
        <template v-slot="scope">
          <div v-if="scope.row.wes">
            <div style="margin: 10px 0">{{ scope.row.wes.course}}</div>
            <div style="margin: 10px 0">{{ scope.row.wes.room}}</div>
            <div style="margin: 10px 0">{{ scope.row.wes.teacher}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周四">
        <template v-slot="scope">
          <div v-if="scope.row.thu">
            <div style="margin: 10px 0">{{ scope.row.thu.course}}</div>
            <div style="margin: 10px 0">{{ scope.row.thu.room}}</div>
            <div style="margin: 10px 0">{{ scope.row.thu.teacher}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周五">
        <template v-slot="scope">
          <div v-if="scope.row.fri">
            <div style="margin: 10px 0">{{ scope.row.fri.course}}</div>
            <div style="margin: 10px 0">{{ scope.row.fri.room}}</div>
            <div style="margin: 10px 0">{{ scope.row.fri.teacher}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周六">
        <template v-slot="scope">
          <div v-if="scope.row.sat">
            <div style="margin: 10px 0">{{ scope.row.sat.course}}</div>
            <div style="margin: 10px 0">{{ scope.row.sat.room}}</div>
            <div style="margin: 10px 0">{{ scope.row.sat.teacher}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周日">
        <template v-slot="scope">
          <div v-if="scope.row.sun">
            <div style="margin: 10px 0">{{ scope.row.sun.course}}</div>
            <div style="margin: 10px 0">{{ scope.row.sun.room}}</div>
            <div style="margin: 10px 0">{{ scope.row.sun.teacher}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Curriculum",
  data() {
    return{
      tableData: [
        { section: {num: '第一大节', time: '08:00-09:35'},
          tue: {course: '软件工程', room: '曹光彪西-201', teacher: '邓水光'}, }
      ],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  }
}
</script>

<style scoped>
::v-deep .headerBg {
  background: #eee;
  color: #1E90FF;
  font-size: 16px;
}
</style>