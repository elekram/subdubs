import { Context } from '@oak/oak/context'
import cfg from '../../config/config.ts'

export async function PostSlideshow(ctx: Context) {
  if (!ctx.request.hasBody) {
    console.error('no form body')
  }

  const reqBody = await ctx.request.body.formData()

  for (const pair of reqBody.entries()) {
    const field = pair[0]
    const value = pair[1]

    console.log(field)
    console.log(value)

    if (value instanceof File) {
      const fileName = value.name
      const data = await value.arrayBuffer()
      console.log(fileName)
      console.log(data)
      console.log(new Uint8Array(data))
      // const res = await StoreCsv(fileName, )

      // if (res instanceof Error) {
      //   return ctx.response.body = getErrorBody(res.message)
      // }
    }

    // if (field !== 'passwordInput') continue

    // if (value !== cfg.uploadKey) {
    //   return ctx.response.body = 'error mate'
    // }
  }
  return ctx.response.body = 'File uploaded successfully'
}
