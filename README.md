# node-vue
`npm run serve`

- `@submit.native.prevent` 阻止表单回车提交

- `Vue.prototype.$http = http`全局使用 

- `el-table` 的使用

```
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width='220'></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
        </el-table>

```

- `slot-scope` 用于将元素或组件表示为作用域插槽。
```
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

```

- `el-option` 下拉选择
```
          <el-option v-for="item in parent" :key="item._id" :label='item.name' :value='item._id'></el-option>

```

- `inflection` 大小写反转

- `multer` 文件上传 中间件
```
Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 
的 request 对象中。 body 对象包含表单的文本域信息，file 或 files
对象包含对象表单上传的文件信息。
```

- `el-rate` 评分
- `vue2-editor` 富文本编译器