<template>
  <div class="course-upload">
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :disabled="isUploading"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <!-- 进度条 -->
    <el-progress
      v-show="isUploading"
      class="progress"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : undefined"
    />

    <!-- 提示 -->
    <el-tag>
      {{ `格式要求：230*300px，JPG、PNG格式，小于${limit}KB` }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadImage } from '@/network/course'

export default Vue.extend({
  name: 'CourseUploadImage',

  props: {
    // 上传成功后的值
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 500
    }
  },

  data () {
    return {
      isUploading: false,
      percentage: 0 // 上传进度百分比
    }
  },

  methods: {
    beforeAvatarUpload (file: File) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 < 500

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传图片大小不能超过 ${this.limit} KB!`)
      }
      return isJPG && isLt2M
    },

    async handleUpload (options: { file: File }) {
      this.isUploading = true
      try {
        const fd = new FormData()
        fd.append('file', options.file)

        const onUploadProgress = (progressEvent: any) => {
          this.percentage = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          )
        }

        const { data } = await uploadImage(fd, onUploadProgress)
        this.$emit('input', data.data.name)
      } catch {}
      setTimeout(() => {
        this.isUploading = false
        this.percentage = 0
      }, 1500)
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep.progress {
  margin-top: -10px;
  .el-progress-bar {
    width: 195px;
  }
}

::v-deep.avatar-uploader {
  & .el-upload {
    border: 1px dashed #c9c9c9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: $primary-color;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}

.avatar {
  display: block;
  width: 160px;
  height: 160px;
}
</style>
