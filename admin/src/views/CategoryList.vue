<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="items">
        <el-table-column prop="_id" label="ID" width='220'></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:[{name:'xxx',_id:222}]
        }
    },
    methods: {
        async fetch(){
            const res = await this.$http.get('categories')
            this.items = res.data;
        }
    },
    created(){
        this.fetch()
    }
}
</script>
