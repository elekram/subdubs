import { Context } from '@oak/oak/context'
import * as uuid from 'jsr:@std/uuid'
import sql from '../../db/db.ts'
import cfg from '../../config/config.ts'

export async function AddPhotos(ctx: Context) {
  if (!ctx.request.hasBody) {
    console.error('no form body')
  }

  const reqBody = await ctx.request.body.formData()

  for (const pair of reqBody.entries()) {
    const slideShowName = 'Slideshow 1'
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
      const res = await storePhotos(
        fileName,
        new Uint8Array(data),
        slideShowName,
        newUUID,
      )

      if (res instanceof Error) {
        return ctx.response.body = getErrorBody(res.message)
      }
    }

    // if (field !== 'passwordInput') continue

    // if (value !== cfg.uploadKey) {
    //   return ctx.response.body = 'error mate'
    // }
  }
  return ctx.response.body = 'File uploaded successfully'
}

async function storePhotos(
  fileName: string,
  data: Uint8Array,
  slideShowName: string,
  uuid: string,
) {
  try {
    return await sql`
    insert into slideshow_files
      (slideshow_id, slideshow_name, file_name, file)
    values
      (${uuid}, ${slideShowName}, ${fileName}, ${data})
    RETURNING slideshow_id, slideshow_name, file_name, file
  `
  } catch (e) {
    console.error('Error storing CSV - ', e)
    return new Error('Error storing CSV - ' + e)
  }
}
