<template>
  <div>
    <!-- 操作选项 -->
    <el-card shadow="never">
      <div style="margin-bottom: 5px;">
        <el-button @click="handleEdit" type="primary" size="small"
          >添加角色</el-button
        >
      </div>
    </el-card>

    <!-- 资源列表 -->
    <el-card shadow="never">
      <el-table v-loading="isLoading" :data="roles" style="width: 100%">
        <el-table-column
          prop="id"
          align="center"
          label="ID"
          width="40px"
        ></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="角色名称"
        ></el-table-column>
        <el-table-column
          prop="description"
          align="center"
          label="角色描述"
        ></el-table-column>
        <el-table-column
          prop="createdTime"
          align="center"
          label="添加时间"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button
                @click="
                  $router.push({
                    name: 'role-allocate-menu',
                    params: { roleId: scope.row.id }
                  })
                "
                size="mini"
                type="text"
                >分配菜单</el-button
              >
              <el-button
                @click="
                  $router.push({
                    name: 'role-allocate-resource',
                    params: { roleId: scope.row.id }
                  })
                "
                size="mini"
                type="text"
                >分配资源</el-button
              >
            </el-row>
            <el-row>
              <el-button @click="handleEdit(scope.row)" size="mini" type="text"
                >编辑</el-button
              >
              <el-button
                @click="handleDelete(scope.row)"
                size="mini"
                type="text"
                >删除</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      @open="handleEdit"
      @closed="handleClosed"
      :title="isUpdate ? '修改角色' : '添加角色'"
      :visible.sync="dialogFormVisible"
      style="min-width: 980px;"
    >
      <el-form
        ref="roleForm"
        :model="roleFormDate"
        :rules="rules"
        label-width="100px"
        style="width: 60%; margin: auto"
      >
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="roleFormDate.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码：" prop="code">
          <el-input v-model="roleFormDate.code"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input
            v-model="roleFormDate.description"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getRoleAll, createOrUpdateRole, deleteRole } from '@/network/role'

export default Vue.extend({
  name: 'RoleIndex',
  data () {
    return {
      // 角色表单
      roleFormDate: {
        id: NaN,
        name: '',
        code: '',
        description: ''
      },
      // 角色表单验证
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
      },
      roles: [], // 角色列表
      isLoading: true,
      dialogFormVisible: false, // 弹出框
      isUpdate: false // 是否是修改
    }
  },

  created () {
    this.loadRoleAll()
  },

  methods: {
    // 加载资源分类
    async loadRoleAll () {
      this.isLoading = true
      try {
        const { data } = await getRoleAll()
        if (data.code === '000000') {
          this.roles = data.data
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 打开对话框
    handleEdit (item: {
      name: string
      id: number
      code: string
      description: string
    }) {
      if (item?.id) {
        this.isUpdate = true
        this.roleFormDate.name = item.name
        this.roleFormDate.id = item.id
        this.roleFormDate.code = item.code
        this.roleFormDate.description = item.description
      }
      this.dialogFormVisible = true
    },
    // 关闭对话框
    handleClosed () {
      this.roleFormDate = {
        id: NaN,
        code: '',
        name: '',
        description: ''
      }
      this.dialogFormVisible = false
      this.isUpdate = false
    },
    // 删除分类
    async handleDelete (item: { id: number }) {
      try {
        await this.$confirm('确定要删除此分类吗？', '删除提示', {
          type: 'warning'
        })
        const { data } = await deleteRole(item.id)
        if (data.code === '000000' && data.data) {
          this.$message.success('删除成功')
          this.loadRoleAll()
        }
      } catch (error) {
        this.$message.error(`删除失败：${error.message}`)
      }
    },
    // 提交添加或修改
    async onSubmit () {
      try {
        await (this.$refs.roleForm as Form).validate()
        const { data } = await createOrUpdateRole(this.roleFormDate)
        if (data.code === '000000') {
          if (this.isUpdate) {
            this.$message.success('修改角色成功')
          } else {
            this.$message.success('添加角色成功')
          }
          this.dialogFormVisible = false
          this.loadRoleAll()
        }
      } catch (error) {
        this.$message.error('操作失败，请重试！')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-button--text {
  &:hover {
    text-decoration: underline;
  }
}
</style>
