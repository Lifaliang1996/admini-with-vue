<template>
  <el-card>
    <template #header>
      <el-button
        type="primary"
        size="mini"
        @click="$router.push({ name: 'advert-create' })"
        >添加广告</el-button
      >
    </template>

    <el-table :data="pageList">
      <el-table-column
        prop="id"
        label="ID"
        width="70px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="广告名称"
        align="center"
      ></el-table-column>
      <el-table-column label="广告位置" align="center">
        <template v-slot="scope">
          <span>{{ adSpaces[scope.row.spaceId] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告图片" align="center">
        <template v-slot="scope">
          <el-image
            style="width: 80px;"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"
            alt
          >
            <template #error>
              <span>暂无图片</span>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" min-width="200px">
        <template v-slot="scope">
          <div>开始：{{ scope.row.startTimeFormatString }}</div>
          <div>结束：{{ scope.row.endTimeFormatString }}</div>
        </template>
      </el-table-column>
      <el-table-column label="上线/下线" width="100px" align="center">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :title="scope.row.status === 1 ? '已上线' : '已下线'"
            :active-value="1"
            :inactive-value="0"
            :disabled="scope.row.disabed"
            @change="handleUpdateAdStatus(scope.row, $event)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            size="mini"
            @click="
              $router.push({
                name: 'advert-update',
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
      :total="advertList.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList, getAllSpaces, updateAdStatus } from '@/network/advert'

export default Vue.extend({
  name: 'AdvertIndex',

  metaInfo: {
    title: '广告管理'
  },

  data () {
    return {
      advertList: [],
      // 广告位 id: 广告位 name
      adSpaces: {},
      paging: {
        current: 1,
        size: 10
      }
    }
  },

  computed: {
    pageList (): any[] {
      const { current, size } = this.paging
      return this.advertList.slice((current - 1) * size, current * size)
    }
  },

  created () {
    this.loadAdList()
    this.loadAllAdSpace()
  },

  methods: {
    async loadAdList () {
      try {
        const { data } = await getAdList()
        if (data.success) {
          this.advertList = data.content.map((advert: any) => {
            advert.disabed = false
            return advert
          })
        }
      } catch {}
    },
    async loadAllAdSpace () {
      try {
        const { data } = await getAllSpaces()
        if (data.success) {
          const spaces = {}
          data.content.forEach((space: { id: number; name: string }) => {
            ;(spaces as any)[space.id] = space.name
          })
          this.adSpaces = spaces
        }
      } catch {}
    },
    // 上线/下线
    async handleUpdateAdStatus (advert: any, status: number) {
      advert.disabed = true
      try {
        const { data } = await updateAdStatus(advert.id, status)
        if (data.success) {
          this.$message.success(status === 1 ? '上线成功' : '下线成功')
        } else {
          advert.status = status === 1 ? 0 : 1
          this.$message.error('操作失败，请重试')
        }
      } catch {}
      advert.disabed = false
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
