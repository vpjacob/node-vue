<template>
  <div class="about">

    <h1>{{id?'编辑':'新建'}}疫情信息</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="疑似">
        <el-input v-model="model.suspected"></el-input>
      </el-form-item>
      <el-form-item label="确诊">
        <el-input v-model="model.definite"></el-input>
      </el-form-item>
      <el-form-item label="死亡">
        <el-input v-model="model.death"></el-input>
      </el-form-item>
      <el-form-item label="出院">
        <el-input v-model="model.discharge"></el-input>
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
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/chart/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "修改成功"
        });
      } else {
        res = await this.$http.post("rest/chart", this.model);
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
      this.$router.push("/charts/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/chart/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  }
};
</script>