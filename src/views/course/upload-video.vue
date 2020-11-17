<template>
  <div>
    <el-button
      icon="el-icon-back"
      style="margin-bottom: 20px;"
      @click="
        $router.push({
          name: 'course-section',
          params: {
            courseId
          }
        })
      "
      >返回课程</el-button
    >
    <el-card>
      <template #header>
        <p>课程：{{ courseName }}</p>
        <p>章节：{{ sectionName }}</p>
        <p>课时：{{ lessonName }}</p>
      </template>
      <el-form label-width="60px">
        <el-form-item label="封面">
          <el-upload
            ref="video"
            class="upload"
            action="#"
            accept="image/png, image/jpeg"
            drag
            :auto-upload="false"
            :limit="1"
            :file-list="imageList"
            :on-change="addImage"
            :on-remove="removeImage"
            :on-exceed="replaceImage"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                只能上传jpg/png文件，长宽16:9，且不超过500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            ref="video"
            class="upload"
            action="#"
            accept="video/mp4"
            drag
            :auto-upload="false"
            :limit="1"
            :on-change="addVideo"
            :on-remove="removeVideo"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                只能上传mp4文件，长宽16:9
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="progress" v-if="percent">
            上传进度：
            <el-progress
              :percentage="percent"
              :status="percent === 100 ? 'success' : undefined"
            ></el-progress>
          </div>
          <div v-if="transcodeStatus === 'ing'">
            转码中，请勿刷新页面！
          </div>
          <div v-else-if="transcodeStatus === 'done'">转码完成！</div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="handleUpload"
            >{{ btnText }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAliyunImageUploadAddressAndAuth,
  getAliyunVideoUploadAddressAndAuth,
  aliyunTransCodeVideo,
  getAliyunTransCodePercent
} from '@/network/aliyun-upload'
import { getCourseById, getLessonById, getSectionById } from '@/network/course'

export default Vue.extend({
  name: 'CourseUploadVideo',

  metaInfo: {
    title: '上传视频'
  },

  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      courseName: '',
      sectionName: '',
      lessonName: '',
      imageList: [],
      videoList: [],
      imageUrl: '',
      videoId: '',
      fileName: '',
      uploader: {},
      // 上传百分比
      percent: 0,
      btnLoading: false,
      // 开始上传 上传中 转码中
      btnText: '开始上传',
      // 转码状态：ing, done
      transcodeStatus: ''
    }
  },

  created () {
    this.loadCourse()
    this.loadSection()
    this.loadLesson()
  },

  methods: {
    async loadCourse () {
      try {
        const { data } = await getCourseById(this.courseId)
        this.courseName = data.data.courseName
      } catch {}
    },
    async loadSection () {
      try {
        const { data } = await getSectionById(
          this.$route.query.sectionId as any
        )
        this.sectionName = data.data.sectionName
      } catch {}
    },
    async loadLesson () {
      try {
        const { data } = await getLessonById(this.$route.query.lessonId as any)
        this.lessonName = data.data.theme
      } catch {}
    },
    addImage (file: any) {
      this.imageList[0] = file as never
    },
    replaceImage (files: any) {
      const file = files[0]
      this.imageList = [
        {
          ...(this.imageList[0] as object),
          name: file.name,
          size: file.size,
          type: file.type,
          raw: file
        } as never
      ]
      console.log(this.imageList[0])
    },
    removeImage () {
      this.imageList = []
    },
    addVideo (file: any) {
      this.videoList[0] = file as never
    },
    replaceVideo (files: any) {
      const file = files[0]
      this.videoList = [
        {
          ...(this.videoList[0] as object),
          name: file.name,
          size: file.size,
          type: file.type,
          raw: file
        } as never
      ]
    },
    removeVideo () {
      this.videoList = []
    },
    // 初始化阿里云上传器
    initUploader () {
      return new window.AliyunUpload.Vod({
        // 阿里账号 ID，必须有值 ，值的来源 https://help.aliyun.com/knowledge_detail/37196.html
        userId: '1618139964448548',
        // 上传到点播的地域， 默认值为 'cn-shanghai',//eu-central-1,ap-southeast-1
        region: 'cn-shanghai',
        // 分片大小默认1M，不能小于100K
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          this.btnLoading = true
          this.btnText = '上传中'

          try {
            let aliyunInfo
            if (uploadInfo.isImage) {
              // 上传图片
              const { data } = await getAliyunImageUploadAddressAndAuth()
              this.imageUrl = data.data.imageURL
              aliyunInfo = data.data
            } else {
              // 上传视频
              const { data } = await getAliyunVideoUploadAddressAndAuth({
                fileName: uploadInfo.file.name,
                imageUrl: this.imageUrl
              })
              aliyunInfo = data.data
              this.fileName = uploadInfo.file.name
              this.videoId = uploadInfo.videoId
            }

            // 设置上传凭证
            ;(this.uploader as any).setUploadAuthAndAddress(
              uploadInfo,
              aliyunInfo.uploadAuth,
              aliyunInfo.uploadAddress,
              aliyunInfo.imageId || aliyunInfo.videoId
            )
          } catch {
            this.btnLoading = false
            this.btnText = '开始上传'
          }
        },
        // 文件上传失败
        onUploadFailed: (uploadInfo: any, code: any, message: any) => {
          this.$message.error(`上传失败：${message}`)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (
          uploadInfo: any,
          totalSize: number,
          loadedPercent: number
        ) => {
          if (!uploadInfo.isImage) {
            // 是视频，保存进度
            this.percent = Math.floor(loadedPercent * 100)
          }
        },
        // 全部文件上传结束
        onUploadEnd: async () => {
          this.transcodeStatus = 'ing'
          this.btnText = '转码中'

          try {
            await aliyunTransCodeVideo({
              lessonId: this.$route.query.lessonId,
              fileId: this.videoId,
              coverImageUrl: this.imageUrl,
              fileName: this.fileName
            })

            const timer = setInterval(async () => {
              const { data } = await getAliyunTransCodePercent(
                this.$route.query.lessonId as string
              )
              if (data.data === 1) {
                this.transcodeStatus = 'done'
                this.btnText = '开始上传'
                this.btnLoading = false
                this.btnText = '开始上传'
                window.clearInterval(timer)
              }
            }, 5000)
          } catch (error) {
            this.btnLoading = false
            this.btnText = '开始上传'
          }
        }
      })
    },
    handleUpload () {
      const image = (this.imageList[0] as any)?.raw
      const video = (this.videoList[0] as any)?.raw
      if (!image || !video) {
        this.$message.warning('请选择视频及封面')
        return
      }

      const uploader: any = (this.uploader = this.initUploader())

      uploader.addFile(image, null, null, null, '{"Vod":{}}')
      uploader.addFile(video, null, null, null, '{"Vod":{}}')
      uploader.startUpload()
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .upload {
  .el-upload__text {
    width: 360px;
    em {
      color: #409eff;
    }
  }
  .el-upload__tip {
    width: 360px;
    margin-top: -10px;
  }
  .el-upload-list {
    width: 360px;
  }
}

.progress {
  width: 360px;
}
</style>
