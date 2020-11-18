import request from '@/utils/request'

// 上传图片
export const uploadImage = (
  url: string,
  formData: object,
  onUploadProgress?: ((progressEvent: any) => void) | undefined
) => {
  return request({
    method: 'POST',
    url,
    data: formData,
    onUploadProgress
  })
}
