<template>
  <div>
    <h1>疫情信息列表</h1>
    <el-table :data="items">
              <!-- suspected:{ type: Number },//疑似
    definite:{ type: Number },//确诊
    death:{ type: Number },//死亡
    discharge:{ type: Number },//出院
    datetime:{ type: String }, -->

      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="suspected" label="疑似"></el-table-column>
      <el-table-column prop="definite" label="确诊"></el-table-column>
      <el-table-column prop="death" label="死亡"></el-table-column>
      <el-table-column prop="discharge" label="出院"></el-table-column>
      <el-table-column prop="datetime" label="日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/charts/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/chart");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/chart/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
