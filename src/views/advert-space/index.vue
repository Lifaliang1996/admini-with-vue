<template>
  <el-card>
    <template #header>
      <el-button
        type="primary"
        size="mini"
        @click="$router.push({ name: 'advert-space-create' })"
        >添加广告位</el-button
      >
    </template>

    <el-table :data="pageList">
      <el-table-column
        prop="spaceKey"
        label="SpaceKey"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称"
        align="center"
      ></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template v-slot="scope">
          <span>{{ formatDate(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template v-slot="scope">
          <span>{{ formatDate(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            size="mini"
            @click="
              $router.push({
                name: 'advert-space-update',
                params: { id: scope.row.id }
              })
            "
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px"
      background
      :current-page="paging.current"
      :page-sizes="[10, 15, 20]"
      :page-size="paging.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="adSpaceList.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/network/advert'
import mixin from '@/mixin'

export default Vue.extend({
  name: 'AdvertSpaceIndex',

  mixins: [mixin],

  metaInfo: {
    title: '广告位管理'
  },

  data () {
    return {
      adSpaceList: [],
      // 广告位 id: 广告位 name
      paging: {
        current: 1,
        size: 15
      }
    }
  },

  computed: {
    pageList (): any[] {
      const { current, size } = this.paging
      return this.adSpaceList.slice((current - 1) * size, current * size)
    }
  },

  created () {
    this.loadAllAdSpace()
  },

  methods: {
    async loadAllAdSpace () {
      try {
        const { data } = await getAllSpaces()
        if (data.success) {
          this.adSpaceList = data.content
        }
      } catch {}
    },
    handleCurrentChange (value: number) {
      this.paging.current = value
    },
    handleSizeChange (value: number) {
      this.paging.current = 1
      this.paging.size = value
    }
  }
})
</script>

<style lang="scss" scoped></style>
