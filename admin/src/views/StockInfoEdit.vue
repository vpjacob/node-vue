<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}融资信息</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="融资余额">
        <el-input v-model="model.rongzi"></el-input>
      </el-form-item>
      <el-form-item label="北向资金流入流出">
        <el-input v-model="model.hugangtong"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-model="model.datetime"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/stock_info/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "修改成功"
        });
      } else {
        res = await this.$http.post("rest/stock_info", this.model);
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
      this.$router.push("/stock_info/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/stock_info/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>