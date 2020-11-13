<template>
  <div ref="editor"></div>
</template>

<script lang="ts">
import { uploadImage } from '@/network/course'
import Vue from 'vue'
import E from 'wangeditor'

export default Vue.extend({
  name: 'TextEditor',

  props: {
    value: {
      type: String
    },
    height: {
      type: Number,
      default: 600
    }
  },

  mounted () {
    this.initEditor()
  },

  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)

      editor.config.height = this.height

      // 同步值
      editor.config.onchange = (html: string) => {
        this.$emit('input', html)
      }

      // 上传图片
      editor.config.customUploadImg = async function (
        resultFiles: any,
        insertImgFn: (url: string) => void
      ) {
        const uploadHeap: Promise<any>[] = resultFiles.map((file: File) => {
          const fd = new FormData()
          fd.append('file', file)
          return uploadImage(fd)
        })

        try {
          const result: any[] = await Promise.allSettled(uploadHeap)
          result.forEach(item => {
            item.value.data.data && insertImgFn(item.value.data.data.name)
          })
        } catch {}
      }

      editor.create()
      editor.txt.html(this.value)
    }
  }
})
</script>

<style scoped></style>
