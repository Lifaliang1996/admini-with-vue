<template>
  <div>
    <!-- 筛选条件 -->
    <el-card shadow="never">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
        label-width="80px"
      >
        <el-form-item label="手机号">
          <el-input
            type="text"
            v-model="searchForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="searchDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-button @click="searchUserPages" type="primary" size="small"
          >查询搜索</el-button
        >
      </el-form>
    </el-card>

    <!-- 用户列表 -->
    <el-card shadow="never">
      <el-table v-loading="isLoading" :data="userList" style="width: 100%">
        <el-table-column
          prop="id"
          align="center"
          label="用户ID"
        ></el-table-column>
        <el-table-column align="center" label="头像" width="100">
          <template v-slot="scope">
            <el-avatar
              :src="scope.row.portrait"
              icon="el-icon-user-solid"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="用户名"
        ></el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          label="手机号"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="注册时间"
        ></el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template v-slot="scope">
            <i
              :title="scope.row.status === 'DISABLE' ? '禁用' : '正常'"
              class="status"
              :class="
                scope.row.status === 'DISABLE'
                  ? 'status-danger'
                  : 'status-success'
              "
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              v-if="scope.row.status === 'ENABLE'"
              @click="handleForbidUser(scope.row.id)"
              type="text"
              size="mini"
              >禁用</el-button
            >
            <el-button
              v-else
              @click="handleEnableUserr(scope.row.id)"
              type="text"
              size="mini"
              >启用</el-button
            >
            <el-button @click="openDialog(scope.row.id)" type="text" size="mini"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog @closed="handleClosed" title="分配角色" :visible.sync="dialogVisible" width="30%">
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.name"
            :value="role.id"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAllocateUserRoles"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :disabled="isLoading"
        :current-page="searchForm.current"
        :page-sizes="[10, 15, 20]"
        :page-size="searchForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getUserPages, forbidUser, enableUser } from '@/network/user'
import { getRoleAll, getRollByUser, allocateUserRoles } from '@/network/role'

export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 筛选条件
      searchForm: {
        currentPage: 1,
        pageSize: 10,
        phone: '',
        startCreateTime: new Date(''),
        endCreateTime: new Date('')
      },
      userList: [], // 用户列表
      totalCount: 0,
      roles: [], // 所有角色
      roleIdList: [], // 当前编辑的用户选定的角色
      currentUserId: NaN, // 当前编辑的用户
      dialogVisible: false,
      isLoading: true
    }
  },

  computed: {
    searchDate: {
      get () {
        return [this.searchForm.startCreateTime, this.searchForm.endCreateTime]
      },
      set (date: Date[]) {
        this.searchForm.startCreateTime = date ? date[0] : new Date('')
        this.searchForm.endCreateTime = date ? date[1] : new Date('')
      }
    }
  },

  created () {
    this.loadUserPages()
    this.loadRoleAll()
  },

  methods: {
    // 加载用户列表
    async loadUserPages () {
      this.isLoading = true
      try {
        const { data } = await getUserPages(this.searchForm)
        if (data.code === '000000') {
          this.userList = data.data.records
          this.totalCount = data.data.total
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 加载所有角色
    async loadRoleAll () {
      try {
        const { data } = await getRoleAll()
        if (data.code === '000000') {
          this.roles = data.data
        }
      } catch (error) {}
    },
    handleSizeChange (val: number) {
      this.searchForm.pageSize = val
      this.searchForm.currentPage = 1
      this.loadUserPages()
    },
    handleCurrentChange (val: number) {
      this.searchForm.currentPage = val
      this.loadUserPages()
    },
    // 查询搜索资源
    searchUserPages () {
      this.searchForm.currentPage = 1
      this.loadUserPages()
    },
    // 打开对话框并加载当前用户拥有的角色
    async openDialog (userId: number) {
      this.dialogVisible = true
      this.currentUserId = userId
      try {
        const { data } = await getRollByUser(userId)
        if (data.code === '000000') {
          this.roleIdList = data.data.map((role: { id: number }) => role.id)
        }
      } catch (error) {}
    },
    handleClosed () {
      this.currentUserId = NaN
      this.roleIdList = []
    },
    // 给用户分配角色
    async handleAllocateUserRoles () {
      try {
        const { data } = await allocateUserRoles(this.currentUserId, this.roleIdList)
        if (data.data) {
          this.$message.success('分配角色成功')
        }
      } catch (error) {}
    },
    // 禁用用户
    async handleForbidUser (userId: number) {
      try {
        await this.$confirm('确定要禁用该用户吗？', '禁用提示')
        const { data } = await forbidUser(userId)
        if (data.data) {
          this.loadUserPages()
          this.$message.success('禁用成功')
        }
      } catch (error) {
      }
    },
    // 启用用用户
    async handleEnableUserr (userId: number) {
      try {
        await this.$confirm('确定要启用该用户吗？', '启用提示')
        const { data } = await enableUser(userId)
        if (data.data) {
          this.loadUserPages()
          this.$message.success('启用成功')
        }
      } catch (error) {
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
